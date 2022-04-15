<template>
  <v-row>
    <v-col xs="12" sm="12" md="4" cols="12">
      <v-expansion-panels accordion v-model="panel" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header class="text-h5">Code</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-alert
              v-for="(error, index) in errors"
              :key="index"
              dense
              outlined
              type="error"
            >
              Node id: {{ error.node }}, {{ error.error }}
            </v-alert>

            <highlight-code v-show="script" lang="python" class="mb-2">{{
              script
            }}</highlight-code>

            <highlight-code
              v-show="validation.output"
              lang="python"
              class="mb-2"
              >{{ validation.output }}</highlight-code
            >

            <v-btn color="cyan" @click="validateRoot" class="mr-2 mb-2">
              evaluate code
            </v-btn>
            <v-btn color="success" @click="evaluarCodigo" class="mb-2">
              run code
            </v-btn>
            <v-btn @click="exportData">exportdata</v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="text-h5"
            >Program list</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-data-table
              :headers="headers"
              :items="programs"
              :hide-default-footer="true"
              class="elevation-1"
            >
              <template v-slot:[`item.uid`]="{ item }">
                <v-btn color="success" fab x-small @click="editItem(item.uid)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  color="error"
                  fab
                  x-small
                  class="ml-1"
                  @click="deleteItem(item.uid)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <template v-slot:no-data>
                No programs found.
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="text-h5"
            >Nodes</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-simple-table id="programs" height="350px">
              <template v-slot:default>
                <tbody>
                  <tr draggable="true" v-on:dragstart="drag" data-node="root">
                    <td>Root</td>
                  </tr>
                  <tr draggable="true" v-on:dragstart="drag" data-node="print">
                    <td>Print</td>
                  </tr>
                  <tr draggable="true" v-on:dragstart="drag" data-node="for">
                    <td>Block for</td>
                  </tr>
                  <tr draggable="true" v-on:dragstart="drag" data-node="if">
                    <td>Block if</td>
                  </tr>
                  <tr draggable="true" v-on:dragstart="drag" data-node="assign">
                    <td>Assign</td>
                  </tr>
                  <tr draggable="true" v-on:dragstart="drag" data-node="add">
                    <td>Add</td>
                  </tr>
                  <tr draggable="true" v-on:dragstart="drag" data-node="sub">
                    <td>Sub</td>
                  </tr>
                  <tr draggable="true" v-on:dragstart="drag" data-node="mul">
                    <td>Mul</td>
                  </tr>
                  <tr draggable="true" v-on:dragstart="drag" data-node="div">
                    <td>Div</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>

    <v-col xs="12" sm="12" md="8" cols="12">
      <div id="drawflow" v-on:drop="drop" v-on:dragover="allowDrop">
        <v-btn
          class="mb-10"
          fab
          color="primary accent-2"
          bottom
          right
          small
          absolute
          @click.stop="dialog = true"
        >
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </div>
    </v-col>
     <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    v-model="programName"
                    label="Program name"
                    :rules="[v => !!v || 'Program name is required',
                             v => v && !!v.trim() || 'Program name is required']"
                    required
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveProgramConfirm">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="550px">
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you want to delete this
          program?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete"
            >Cancel</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Vue from "vue";
import Drawflow from "drawflow";
import styleDrawflow from "drawflow/dist/drawflow.min.css";
import styleDrawflow2 from "../assets/customcss.css";

import executeCodeResponse from "../helpers/executeCodeResponse";
import create from "../helpers/nodes";
const api = require("../helpers/programsResponse");
import validations from "../helpers/validations";

export default {
  data() {
    return {
      panel: [0, 1, 2],
      valid: true,
      programName: "",
      editing: false,
      dialog: false,
      dialogDelete: false,
      editor: null,
      exportdata: null,
      script: "",
      rootNodeId: 0,
      errors: [],
      validation: {},
      programs: [],
      headers: [
        {
          text: "Program name",
          align: "start",
          value: "programName",
          class: "text-h6"
        },
        {
          text: "Actions",
          align: "start",
          sortable: false,
          value: "uid",
          class: "text-h6"
        },
      ]
    };
  },
  computed: {
    formTitle() {
      return this.editing ? "Edit program":"New program";
    },
  },
  watch: {
    // dialog (val) {
    //     val || this.close()
    // },
    // dialogDelete(val) {
    //   val || this.closeDelete();
    // },
  },
  mounted() {
    const id = document.getElementById("drawflow");
    this.editor = new Drawflow(id, Vue, this);
    this.editor.start();
    //this.createRootNode();
    //this.createIfNode(400, 400);
    //this.getProgramData()
    this.getPrograms();
  },
  methods: {
    async saveProgramConfirm() {
      this.valid = this.$refs.form.validate();
      if(this.valid){
        console.log("saveConfirm");
        var exportdata = this.editor.export();
        let data = JSON.parse(JSON.stringify(exportdata.drawflow.Home.data));

        let values = [];
        for (let i in data) {
          values.push(data[i]);
        }

        let program = { programName: this.programName, nodes: values, uid: "_:program" };
        let res = await api.saveProgram(program)
        if(res.status == 201){
          this.editor.clear()
          this.$refs.form.reset();
          this.close();
        }else{
          console.log(res);
        }
        
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {});
    },
    editedItem(item) {
      this.dialog = true;
    },
    deleteItemConfirm() {
      this.closeDelete();
    },
    deleteItem(item) {
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {});
    },
    editItem(item) {
      console.log(item);
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    drag(ev) {
      ev.dataTransfer.setData("node", ev.target.getAttribute("data-node"));
    },
    drop(ev) {
      ev.preventDefault();
      let data = ev.dataTransfer.getData("node");
      let pos_x =
        ((ev.clientX - this.editor.precanvas.getBoundingClientRect().left) /
          (this.editor.precanvas.getBoundingClientRect().right -
            this.editor.precanvas.getBoundingClientRect().left)) *
        this.editor.precanvas.clientWidth;
      let pos_y =
        ((ev.clientY - this.editor.precanvas.getBoundingClientRect().top) /
          (this.editor.precanvas.getBoundingClientRect().bottom -
            this.editor.precanvas.getBoundingClientRect().top)) *
        this.editor.precanvas.clientHeight;
      this.addNodeToDrawFlow(data, pos_x, pos_y);
    },
    async getProgramData() {
      let program = await api.getProgramsByUid('0x5f');
      console.log(program);
      let nodes = program.nodes;
      let json = {};
      for (let i in nodes) {
        let node = nodes[i];
        if (node.name == "root") {
          this.rootNodeId = node.id;
        }
        
        json[node.id.toString()] = node;
      }

      console.log(json);
      let data = {
        drawflow: {
          Home: {
            data: json,
          },
        },
      };
      //console.log(program);
      this.editor.import(data);
      console.log(data);
    },
    exportData() {
      this.validateRoot();
      // if (this.errors.length == 0) {
        var exportdata = this.editor.export();
        let data = JSON.parse(JSON.stringify(exportdata.drawflow.Home.data));

        let values = [];
        for (let i in data) {
          // if (data[i].name == "root"){
          //   let connections = data[i].inputs.input_1.connections
          //   for (let i in connections) {
          //     connections[i] = {...connections[i],"order":Number(i)+1}
          //     console.log(connections[i]);
          //   }
          //   console.log(data[i].inputs.input_1.connections);
          // }
          values.push(data[i]);
        }

        let cc = { programName: "fff", nodes: values, uid: "_:program" };
        console.log(cc);
      // }
    },
    async evaluarCodigo() {
      let pokemonArr = await executeCodeResponse(this.script);
      this.validation = pokemonArr;
    },
    async getPrograms() {
      let {data} = await api.getPrograms()
      this.programs = data;
    },
  },
  mixins: [create, validations],
};
</script>

<style scoped>
#drawflow {
  text-align: initial;
  position: relative;
  width: 100%;
  height: calc(100vh - 24px);
}

#programs tbody tr {
  cursor: move;
}

#drawflow {
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%) !important;
}

.v-expansion-panel-header {
  min-height: 70px !important;
}

</style>