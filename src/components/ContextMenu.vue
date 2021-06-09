<template>
  <v-menu
    v-model="showMenu"
    :position-x="this.menuSettings.position.left"
    :position-y="menuSettings.position.top"
    absolute
    offset-y
  >
    <v-list>
      <v-list-item
        v-for="(item, index) in menuSettings.items"
        :key="index"
        @click.prevent="onClick(index)"
      >
        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    menuSettings: Object,
  },
  data: function () {
    return {
      showMenu: true,
      clickFilterListener: null,
    };
  },
  methods: {
    onClick(index) {
      this.$contextMenu.command(
        this.menuSettings,
        this.menuSettings.items[index].cmd
      );
    },
  },
  watch: {
    showMenu(val) {
      if (!val) {
        this.$contextMenu.hide();
      }
    },
  },
};
</script>

<style module lang="scss">
@import "../components/scss/_variables.scss";
@import "../components/scss/_mixins.scss";
</style>
