export default {
  install(Vue) {
    if (this.installed) {
      return;
    }
    this.installed = true;
    Vue.prototype.$contextMenu = {
      EventBus: new Vue(),
      show(settings) {
        this.EventBus.$emit("show", settings);
      },
      hide() {
        this.EventBus.$emit("hide");
      },
      command(settings, cmdId) {
        this.EventBus.$emit("command", cmdId);
        // settings.owner[cmdId]();
        this.hide();
      },
    };
  },
};
