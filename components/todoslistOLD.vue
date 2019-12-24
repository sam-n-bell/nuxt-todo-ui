<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 offset-xs1>
              <p class="display-2" style="text-align: center">Existing Tasks</p>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-for="td in my_todos.payload" :key=td.id>
      <v-flex xs12 offset-xs1>
        <v-card>
          <v-card-title primmary-title>
            <div>
              <h3>Description</h3>
            </div>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-layout row>
                <v-flex>
                    <v-text-field solo v-model=td.description></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6 sm6 md6>
                <v-select
                  v-model="td.priority"
                  label="Set Priority Level"
                  :items="priorities"
                ></v-select>
              </v-flex> 

              <v-flex xs6 sm6 md6>
                <v-menu
                  v-model="date_menu[todos.indexOf(td)]"
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
                      v-model="td.date"
                      label="When Should This Be Done?"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="td.date" @input="date_menu[todos.indexOf(td)] = false"></v-date-picker>
                </v-menu>
              </v-flex> 
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <div>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <pre>{{ todos }}</pre> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {},
  props: [],
  data: () => ({
    to_do: {

    },
    date_menu: [],
    todos: []
  }),
  computed: {
    my_todos () {
      return this.$store.state.todos.my_todos;
    },
    priorities () {
      return this.$store.state.todos.priorities;
    }
  },
  methods: {
    ...mapActions({
      getToDos: "todos/getToDos"
    })
  },
  mounted () {
      this.getToDos();
  }
};
</script>