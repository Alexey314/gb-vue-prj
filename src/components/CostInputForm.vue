<template>
  <div>
      <input type="text" placeholder="Payment description" v-model.trim="paymentDescription">
      <br>
      <input type="text" placeholder="Payment amount" v-model.number="paymentAmount">
      <br>
      <input type="text" placeholder="Payment date" v-model.trim="paymentDate">
      <br>
      <button @click="onClickAdd">ADD +</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    paymentDescription: 'Buy food',
    paymentAmount: 123.4,
    paymentDate: '23.04.2021'
  }),
  methods: {
      onClickAdd(){
          this.$emit('add', {
              paymentDescription: this.paymentDescription,
              paymentAmount: this.paymentAmount,
              paymentDate: this.paymentDate
          });
      }
  }
}
</script>

<style>

</style>