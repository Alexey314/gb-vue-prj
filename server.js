const path = require("path");
const mime = require("mime/lite");
const express = require("express");
const app = express();
const fs = require("fs");
const { Readable } = require("stream");
const hash = require("object-hash");

// получаем полный путь к папке dist
const dir = path.join(__dirname, "dist");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

let paymentsData = [
  { date: "20.03.2020", category: "Food", value: 169 },
  { date: "21.03.2020", category: "Navigation", value: 50 },
  { date: "22.03.2020", category: "Sport", value: 450 },
  { date: "23.03.2020", category: "Entertaiment", value: 969 },
  { date: "24.03.2020", category: "Education", value: 1500 },
  { date: "25.03.2020", category: "Food", value: 200 },
  { date: "27.03.2020", category: "Health", value: 844 },
  { date: "28.03.2020", category: "Sport", value: 265 },
  { date: "29.03.2020", category: "Food", value: 88 },
  { date: "30.04.2020", category: "Education", value: 333 },
  { date: "12.05.2020", category: "Sport", value: 777 },
];

let categories = [
  "Food",
  "Navigation",
  "Sport",
  "Entertaiment",
  "Education",
  "Health",
];

const getPaymentsCount = () => paymentsData.length;

const getPageCount = (recordsCount, pageCapacity) =>
  Math.ceil(recordsCount / pageCapacity);

const getPageNum = (recIndex, pageCapacity) =>
  Math.min(Math.floor(recIndex / Number(pageCapacity)) + 1, getPageCount(getPaymentsCount(),pageCapacity));

const recIdToIndex = (recId) => recId - 1;

const getPaymentsForPage = (pageIndex, pageCapacity) => {
  return paymentsData.slice(
    (pageIndex - 1) * pageCapacity,
    pageIndex * pageCapacity
  );
};

const getPaymentData = (pageNum, pageCapacity) => {
  pageCapacity = Number(pageCapacity) | 1;
  const pageCount = getPageCount(getPaymentsCount(), pageCapacity);
  pageNum = Number(pageNum) | 0;
  if (pageNum <= 0) {
    pageNum = 1;
  }
  if (pageNum > pageCount) {
    pageNum = pageCount;
  }

  const pageData = getPaymentsForPage(pageNum, pageCapacity);

  return {
    pageNum: pageNum,
    pageHash: hash(pageData),
    pageData: pageData.map((val, index) => {
      val.id = 1 + index + (pageNum - 1) * pageCapacity;
      return val;
    }),
  };
};

const getPaymentsHashForPage = (pageIndex, pageCapacity) => {
  const payments = getPaymentsForPage(pageIndex, pageCapacity);
  return hash(payments);
};

const getPaymentDataHashes = (pageCapacity) => {
  const _pageCapacity = Number(pageCapacity);
  const pageCount = getPageCount(getPaymentsCount(), _pageCapacity);
  const pageHashes = [];

  for (let p = 1; p <= pageCount; p++) {
    pageHashes.push(getPaymentsHashForPage(p, _pageCapacity));
  }

  return {
    pageCapacity: _pageCapacity,
    pageHashes,
  };
};

app.get("/PaymentsData", function (req, res) {
  console.log("get PaymentsData query=", req.query);

  res
    .status(200)
    .send(
      JSON.stringify(getPaymentData(req.query.page, req.query.pageCapacity))
    );
});

app.get("/PaymentsDataHashes", function (req, res) {
  console.log("get PaymentsDataHashes");

  res
    .status(200)
    .send(JSON.stringify(getPaymentDataHashes(req.query.pageCapacity)));
});

app.get("/Categories", function (req, res) {
  res.status(200).send(JSON.stringify(categories));
});

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

app.post("/PaymentsData", function (req, res) {
  const dataRec = req.body;
  const pageCapacity = Number(req.query.pageCapacity);
  let pageNumToReturn;
  if (dataRec.action === "remove" && dataRec.id) {
    const dataRecIndex = recIdToIndex(dataRec.id);
    const newDataRecPage = getPageNum(dataRecIndex + 1, pageCapacity);
    paymentsData.splice(dataRecIndex, 1);
    pageNumToReturn = newDataRecPage;
  } else if (dataRec.id === undefined || dataRec.id === null) {
    paymentsData.push(dataRec);
    pageNumToReturn = getPageCount(getPaymentsCount(), pageCapacity);
  } else {
    const dataRecIndex = recIdToIndex(dataRec.id);
    paymentsData[dataRecIndex] = dataRec;
    pageNumToReturn = getPageNum(dataRecIndex, pageCapacity);
  }
  res.set("Content-Type", "application/json");
  res.status(200).send(JSON.stringify(getPaymentData(pageNumToReturn)));
});

// определяем на каком порту серверу ждать входящие соединения
const port = process.env.PORT || 3000;

// запускаем ожидание входящих соединений и выводим номер используемого порта
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
