<template>
  <div>
    <button @click="onPrev">&lt;</button>
    <button
      @click="onPageNumClick(pageNum)"
      v-for="pageBtnNum in pageNumbers"
      :key="pageBtnNum"
      :class="[pageNum == pageBtnNum ? $style.btnActive : '']"
    >
      {{ pageBtnNum }}
    </button>
    <button @click="onNext">&gt;</button>
  </div>
</template>

<script>
export default {
  props: {
    pageCount: Number,
    pageNum: Number,
  },
  // data: () => ({
  //   activePageNum: 1,
  // }),
  methods: {
    onPrev() {
      this.emitEvent(Math.max(1, this.pageNum - 1));
    },
    onNext() {
      this.emitEvent(Math.min(this.pageCount, this.pageNum + 1));
    },
    onPageNumClick(pageNum) {
      this.emitEvent(pageNum);
    },
    emitEvent(pageNum) {
      this.$emit("change-page", pageNum);
    },
  },
  computed: {
    pageNumbers() {
      return Array(this.pageCount)
        .fill(0)
        .map((val, index) => index + 1);
    },
  },
};
</script>

<style module lang="scss">
.btnActive {
  background-color: gray;
}
</style>