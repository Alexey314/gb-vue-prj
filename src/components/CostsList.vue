<template>
  <table>
    <tr>
      # Date Category Value
    </tr>
    <tr v-for="(rec,i) in costsList" :key="i">
        {{rec.index}} {{rec.paymentDate}} {{rec.paymentDescription}} {{rec.paymentAmount}}
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    costsList: Array,
  },
};
</script>

<style>
</style>