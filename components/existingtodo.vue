<template>
  <div v-if="todo_instance != null">
    <pre>{{ remove_todo_dialog }}</pre>
    <v-layout row wrap>
      <v-flex xs12 offset-xs1>
        <v-card>
          <v-card-title primmary-title>
            <div>
              <h3>Description</h3>
              <br/>
              <pre>{{ todo_instance }}</pre>
            </div>
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
                      v-model="todo_instance.date"
                      label="When Should This Be Done?"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="todo_instance.date" @input="date_menu = false"></v-date-picker>
                </v-menu>
              </v-flex> 
            </v-layout>
          </v-card-text>
          <v-card-actions>
                <v-btn @click="submit()" color="primary">Submit</v-btn>
                <v-btn @click="reset()">Reset</v-btn>
                <v-spacer></v-spacer>
                <!-- <v-btn color="error" @click="remove()" justify-end>Remove</v-btn> -->
                <v-btn
                      color="error"
                      @click="showRemoveDialog(
                      {
                        title:'Delete To Do',
                        body:'You are about to delete a reminder to: \n' + todo_instance.description  + '\n\nAre you sure?',
                        confirm_btn_text:'Yes. Continue.',
                        cancel_btn_text:'Nevermind.',
                        confirm_btn_function: () => deleteToDo(todo_instance.id),
                        cacncel_btn_function: () => closeDeleteDialog()
                      }
                      )"
                    >
                      <v-icon>delete</v-icon>
                    </v-btn>
          </v-card-actions>
        </v-card>
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
    todo_instance: null
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
    }
  },
  watch: {
      delete_todo_object: {
        handler(object) {
            if (object.payload) {
                console.log('deleted')
            }
      },
      deep: true
    }
  },
  methods: {
    closeDeleteDialog () {
        this.$store.commit("notifications/hideRemoveDialog");
    },
    reset () {
        const id = this.todo_instance.id;
        console.log(this.my_todos)
        this.todo_instance = _.cloneDeep(_.find(this.my_todos.payload, function(o) { return o.id === id; }));
        this.$validator.reset();
    },
    submit () {
      this.$validator.validateAll().then(res => {
        if (res) {
        //   this.createToDo({
        //     description: this.description,
        //     priority: this.priority,
        //     date: this.date
        //   })
        }
      })
    },
    remove () {

    },
    ...mapActions({
        "deleteToDo": "todos/deleteToDo",
        "showRemoveDialog": "notifications/showRemoveDialog"
    })
  },
  mounted () {
      this.todo_instance = _.cloneDeep(this.todo)
  }
};
</script>