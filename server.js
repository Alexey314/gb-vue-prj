const path = require("path");
const mime = require("mime/lite");
const express = require("express");
const app = express();
const fs = require("fs");
const { Readable } = require("stream");

// получаем полный путь к папке dist
const dir = path.join(__dirname, "dist");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// добавляем общий обработчик
app.get("*", function (req, res) {
  // на все запросы без указания конкретного файла возвращаем /index.html
  const file = path.join(
    dir,
    /[^\/]*\.[^\/]*$/.test(req.path) ? req.path : "/index.html"
  );

  console.log(
    "req.path=",
    req.path,
    "file=",
    file,
    /[^\/]*\.[^\/]*$/.test(req.path)
  );

  // убеждаемся, что путь ведет в публичную папку
  if (file.indexOf(dir + path.sep) !== 0) {
    // возвращаем ошибку
    return res.status(403).end("Forbidden");
  }

  // декодируем MIME-тип из расширения файла
  const ext = path.extname(file).slice(1);
  const type = mime.getType(ext) || "text/plain";
  //console.log(ext, type);

  // создаем стрим для чтения запрошенного файла
  const s = fs.createReadStream(file);

  // создаем обработчик чтения запрошенного файла из стрима
  s.on("open", function () {
    // указываем MIME-тип запрошенного файла
    res.set("Content-Type", type);

    // связываем стримы чтения запрошенного файла и записи ответа
    s.pipe(res);
  });

  // создаем обработчик ошибки чтения запрошенного файла из стрима
  s.on("error", function () {
    // указываем MIME-тип простого текста
    res.set("Content-Type", "text/plain");
    // возвращаем ошибку
    res.status(404).end("Not found");
  });
});

// // Обработка данных отправляемых клиентом
// app.post("/cart", function (req, res) {
//   // Добавляем товар в корзину пользователя
//   modifyCart(getClientId(req), req.body);
//   res.set("Content-Type", "application/json");
//   getCartDataStream(
//     getClientId(req),
//     clientCartsMap,
//     dir + "/data/products.json"
//   ).pipe(res);
// });

// определяем на каком порту серверу ждать входящие соединения
const port = process.env.PORT || 3000;

// запускаем ожидание входящих соединений и выводим номер используемого порта
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
