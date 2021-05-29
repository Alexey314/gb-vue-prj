<template>
  <table :class="[$style.table]">
    <colgroup>
      <col :class="[$style.colNum]" />
      <col :class="[$style.colDate]" />
      <col :class="[$style.colCat]" />
      <col :class="[$style.colVal]" />
    </colgroup>
    <thead>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Category</th>
      <th scope="col">Value</th>
    </thead>
    <tbody>
      <tr v-for="(rec, i) in costsList" :key="i">
        <td>{{ rec.index }}</td>
        <td>{{ rec.paymentDate }}</td>
        <td>{{ rec.paymentDescription }}</td>
        <td>{{ rec.paymentAmount }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    costsList: Array,
  },
};
</script>

<style module lang="scss">
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";

.table {
  width: 100%;
  line-height: 3em;
  border-collapse: collapse;
  tr {
    border-top: 1px solid $table-border-color;
  }
  td,
  th {
    padding-left: $el-space;
  }
}

.colNum {
  width: 10%;
}
.colDate {
  width: 35%;
}
.colCat {
  width: 35%;
}
.colVal {
  width: 20%;
}
</style>