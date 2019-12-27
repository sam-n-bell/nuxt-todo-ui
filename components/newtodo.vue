<template>
    <v-layout row wrap>
      <v-flex xs12 offset-xs1>
        <form>
        <v-card>
          <v-card-title primmary-title>
            <div>
              <h3>Create a New Reminder</h3>
            </div>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-layout row>
                <v-flex>
                    <v-text-field 
                    v-validate="'required|max:30'"
                    v-model="description" 
                    data-vv-name="description"
                    :counter="30"
                    :error-messages="errors.collect('description')"
                    label="Pick up a present for Theresa" 
                    solo>
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6 sm6 md6>
                <v-select
                  v-model="priority"
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
                      v-model="date"
                      label="When Should This Be Done?"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="date_menu = false"></v-date-picker>
                </v-menu>
              </v-flex> 
            </v-layout>
            
          </v-card-text>
          <v-card-actions>
            <v-btn 
            @click="submit()" 
            :loading="create_todo.loading" 
            color="primary">
            Submit
            </v-btn>
            <v-btn 
            @click="reset()" 
            >
            Reset
            </v-btn>
          </v-card-actions>
        </v-card>
              </form>
      </v-flex>

    </v-layout>
</template>

<script>

import { mapActions } from 'vuex';
import { Validator } from 'vee-validate';

export default {
  components: {},
  data: () => ({
    date_menu: false,
    priority: "low",
    description: "",
    date: new Date().toISOString().substr(0, 10)
  }),
  computed: {
      priorities () {
          return this.$store.state.todos.priorities
      },
      create_todo () {
        return this.$store.state.todos.create_todo;
      }
  },
  watch: {
      create_todo: {
          handler(newObject, oldObject) {
            if (newObject.payload) {
              console.log('create_todo watcher')
              console.log(newObject)
              console.log(oldObject)
            }
          }, deep: true
      }
  },
  methods: {
    reset () {
      this.priority = "low";
      this.description = "";
      this.date = new Date().toISOString().substr(0, 10)
      this.$validator.reset();
    },
    submit () {
      this.$validator.validateAll().then(res => {
        if (res) {
          this.createToDo({
            description: this.description,
            priority: this.priority,
            date: this.date
          })
        }
      })
    },
    ...mapActions({
      createToDo: "todos/createToDo"
    })
  },
  mounted () {
    this.$store.commit("todos/createToDo")
  }
};
</script>