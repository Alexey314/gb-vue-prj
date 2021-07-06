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
        <td>{{ rec.id }}</td>
        <td>{{ rec.date }}</td>
        <td>{{ rec.category }}</td>
        <td>{{ rec.value }}</td>
        <td>
          <span
            :class="[$style.contextMenuEllipsis]"
            name="ellipsisBtn"
            @click="onClickEllipsis"
            :rec-id="rec.id"
            :rec-num="i"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              focusable="false"
              width="1em"
              height="1em"
              style="
                -ms-transform: rotate(360deg);
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
              "
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
            >
              <g
                fill="none"
                stroke="#626262"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <circle cx="16" cy="7" r="2" />
                <circle cx="16" cy="16" r="2" />
                <circle cx="16" cy="25" r="2" />
              </g>
            </svg>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions } from "vuex";
const CMD_EDIT = "cmdEdit";
const CMD_DELETE = "cmdDelete";

const contextMenu = {
  position: {
    top: 100,
    left: 100,
  },
  items: [
    {
      text: "Edit",
      cmd: CMD_EDIT,
    },
    {
      text: "Delete",
      cmd: CMD_DELETE,
    },
  ],
  owner: null,
};

export default {
  props: {
    costsList: Array,
  },
  data: function () {
    return {
      activeRecordData: null,
    };
  },
  methods: {
    ...mapActions(["postData"]),
    onClickEllipsis(event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const recordNum = event.currentTarget.getAttribute("rec-num");
      this.activeRecordData = Object.assign({}, this.costsList[recordNum]);
      contextMenu.owner = this;
      contextMenu.position.top = rect.top + rect.height;
      contextMenu.position.left = rect.left;
      this.$contextMenu.show(contextMenu);
      this.$contextMenu.EventBus.$on('command', this.onContextMenuCommand);
    },
    onContextMenuCommand(cmdId) {
      this[cmdId]();
      this.$contextMenu.EventBus.$off('command', this.onContextMenuCommand);
    },
    [CMD_EDIT]() {
      this.$modal.show("CostInputForm", {
        header: "Edit payment details",
        formButtons: ["save", "close"],
        formData: this.activeRecordData,
      });
    },
    [CMD_DELETE]() {
      this.postData({
        id: this.activeRecordData.id,
        action: "remove",
      });
    },
  },
  mounted() {},
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

.contextMenuEllipsis {
  cursor: pointer;
}
</style>