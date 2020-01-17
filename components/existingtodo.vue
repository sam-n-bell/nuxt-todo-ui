<template>
  <div v-if="todo_instance != null">
    <v-layout row wrap>
      <v-flex xs12 offset-xs1>
        <form>
        <v-card>
          <v-card-title primmary-title>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-layout row>
                <v-flex>
                    <v-text-field 
                    solo 
                    v-model=todo_instance.description
                    v-validate="'required|max:30'"
                    data-vv-name="description"
                    :counter="30"
                    :error-messages="errors.collect('description')"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6 sm6 md6>
                <v-select
                  v-model="todo_instance.priority"
                  label="Set Priority Level"
                  :items="priorities"
                ></v-select>
              </v-flex> 
              <v-flex xs6 sm6 md6>
                <v-menu
                  v-model="date_menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="todo_instance.due_date"
                      label="When Should This Be Done?"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="todo_instance.due_date" @input="date_menu = false"></v-date-picker>
                </v-menu>
              </v-flex> 
            </v-layout>
          </v-card-text>
          <v-card-actions>
                <v-btn v-show="different" @click="submit()" color="primary">Submit</v-btn>
                <v-btn v-show="different" @click="reset()">Reset</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                      color="error"
                      @click="showRemoveDialog(
                      {
                        title:'Delete Confirmation',
                        body:'Delete this reminder? ' + todo_instance.description,
                        confirm_button_text:'Yes',
                        cancel_button_text:'Nevermind',
                        confirm_button_function: () => deleteToDo(todo_instance.id),
                        cacncel_button_function: () => closeDeleteDialog()
                      }
                      )"
                    >
                      <v-icon>delete</v-icon> Delete
                    </v-btn>
          </v-card-actions>
        </v-card>
        </form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Validator } from 'vee-validate';
import _ from 'lodash';
import deletetododialog from './deletetododialog.vue';

export default {
  components: {deletetododialog},
  props: ['todo'],
  data: () => ({
    date_menu: false,
    todo_instance: null,
    different: false
  }),
  computed: {
    priorities () {
      return this.$store.state.todos.priorities;
    },
    my_todos () {
        return this.$store.state.todos.my_todos;
    },
    delete_todo_object () {
        return this.$store.state.todos.delete_todo;
    },
    remove_todo_dialog () {
        return this.$store.state.notifications.remove_todo_dialog;
    },
    snackbar_object () {
        return this.$store.state.notifications.snackbar;
    },
    update_todo_object () {
      return this.$store.state.todos.update_todo;
    }
  },
  watch: {
    delete_todo_object: {
        handler(object) {
            if (object.error) {
                this.showSnackBar({
                    text: `Could\'nt delete task. Reason: ${object.error}`,
                    color: "error",
                    close_button_text: "Close",
                    close_button_function: () => this.hideSnackBar()
                });
            } else if (object.payload !== null) {
                this.getToDos();
            }
      },
      deep: true
    },
    update_todo_object: {
      handler(object) {
        if (object.payload) {
          this.different = false;
        }
      },
      deep: true
    },
    todo_instance: {
        handler(object) {
            if (_.isEqual(object, this.todo)) {
                this.different = false;
            } else {
                this.different = true;
            }
        },
      deep: true
    },
    todo: {
        handler(object) {
            if (_.isEqual(object, this.todo_instance)) {
                this.different = false;
            } else {
                this.different = true;
            }
        },
        deep: true,
        immediate: true
    },

  },
  methods: {
    hideSnackBar() {
        this.$store.commit("notifications/hideSnackBar");
    },
    closeDeleteDialog () {
        this.$store.commit("notifications/hideRemoveDialog");
    },
    reset () {
        const id = this.todo_instance.id;
        this.todo_instance = _.cloneDeep(_.find(this.my_todos.payload, function(o) { return o.id === id; }));
        this.$validator.reset();
    },
    submit () {
      this.$validator.validateAll().then(res => {
        if (res) {
          this.updateToDo({
            id: this.todo_instance.id,
            description: this.todo_instance.description,
            priority: this.todo_instance.priority,
            due_date: this.todo_instance.due_date
          })
        }
      })
    },
    remove () {

    },
    ...mapActions({
        "deleteToDo": "todos/deleteToDo",
        "showRemoveDialog": "notifications/showRemoveDialog",
        "updateToDo": "todos/updateToDo",
        "showSnackBar": "notifications/showSnackBar",
        "getToDos": "todos/getToDos"
    })
  },
  mounted () {
      this.todo_instance = _.cloneDeep(this.todo);
      this.$store.commit("todos/updateToDo");
  }
};
</script>