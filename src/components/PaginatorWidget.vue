<template>
  <div>
    <button @click="onPrev">&lt;</button>
    <button
      @click="onPageNumClick(pageNum)"
      v-for="pageNum in pageNumbers"
      :key="pageNum"
      :class="[activePageNum == pageNum ? $style.btnActive : '']"
    >
      {{ pageNum }}
    </button>
    <button @click="onNext">&gt;</button>
  </div>
</template>

<script>
export default {
  props: {
    count: Number,
  },
  data: () => ({
    activePageNum: 1,
  }),
  methods: {
    onPrev() {
      this.activePageNum = Math.max(1, this.activePageNum - 1);
      this.emitEvent();
    },
    onNext() {
      this.activePageNum = Math.min(this.count, this.activePageNum + 1);
      this.emitEvent();
    },
    onPageNumClick(pageNum) {
      this.activePageNum = pageNum;
      this.emitEvent();
    },
    emitEvent() {
      this.$emit("change-page", this.activePageNum);
    },
  },
  computed: {
    pageNumbers() {
      return Array(this.count)
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