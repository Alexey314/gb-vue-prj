<template>
  <div :class="[$style.root]">
    <div :class="[$style.btnPrev]" @click="onPrev">&lt;</div>
    <div
      @click="onPageNumClick(pageBtnNum)"
      v-for="pageBtnNum in pageNumbers"
      :key="pageBtnNum"
      :class="[$style.btnPage, pageNum == pageBtnNum ? $style.btnActive : '']"
    >
      {{ pageBtnNum }}
    </div>
    <div :class="[$style.btnNext]" @click="onNext">&gt;</div>
  </div>
</template>

<script>
export default {
  props: {
    pageCount: Number,
    pageNum: Number,
  },
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
@import "./scss/_variables.scss";
@import "./scss/_mixins.scss";
.root {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0.5em 1em ;
  border: 2px solid $paginator-border-color;
  border-radius: $input-border-radius;
  * {
    user-select:none;
  }
}

.btnPrev,
.btnNext,
.btnPage {
  border: none;
  color: $text-color-main;
  background-color: $bg-color-main;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
}

.btnActive {
  color: $paginator-active-color;
}

</style>