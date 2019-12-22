<template>
  <div>
    <v-layout row wrap v-for="td in todos" :key=td.id>
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
    priorities () {
          return this.$store.state.todos.priorities
      }
  },
  methods: {
  },
  mounted () {
      for (let i = 1; i < 11; i++) {
          this.todos.push({
              id: this.todos.length,
              description: `test todo ${i}`,
              date: new Date().toISOString().substr(0, 10),
              priority: i % 2 === 0 ? 'medium' : 'low'
          })
      }
      console.log(this.todos)
  }
};
</script>