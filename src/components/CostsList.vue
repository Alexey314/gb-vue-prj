<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="costsList"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.id }}</td>
          <td>{{ row.item.date }}</td>
          <td>{{ row.item.category }}</td>
          <td>{{ row.item.value }}</td>
          <td>
            <v-btn
              plain
              :ripple="false"
              @click="(e) => onClickEllipsis(e, row.index)"
            >
              <v-icon dark>mdi-dots-vertical</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
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
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "id",
        },
        {
          text: "Date",
          align: "start",
          sortable: false,
          value: "date",
        },
        {
          text: "Category",
          align: "start",
          sortable: false,
          value: "category",
        },
        {
          text: "Value",
          align: "start",
          sortable: false,
          value: "value",
        },
        {
          text: "",
          align: "center",
          sortable: false,
          value: "",
          width: "32px",
        },
      ],
      page: 1,
      pageCount: 3,
      activeRecordData: null,
    };
  },
  methods: {
    ...mapActions(["postData"]),
    onClickEllipsis(event, itemIndex) {
      console.log("event:", event, "itemIndex:", itemIndex);
      this.activeRecordData = Object.assign({}, this.costsList[itemIndex]);
      contextMenu.owner = this;
      contextMenu.position.top = event.pageY;
      contextMenu.position.left = event.pageX;
      this.$contextMenu.show(contextMenu);
      this.$contextMenu.EventBus.$on("command", this.onContextMenuCommand);
    },
    onContextMenuCommand(cmdId) {
      this[cmdId]();
      this.$contextMenu.EventBus.$off("command", this.onContextMenuCommand);
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
      }).then((newPage)=>{
        this.$router.push(`/dashboard/${newPage}`);
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
