<template>
  <v-container fluid grid-list-md grid-list-xl grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 offset-xs1>
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
                    <v-text-field label="Pick up a present for Theresa" solo></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6 sm6 md6>
                <v-select
                  v-model="new_reminder.priority"
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
                      v-model="new_reminder.date"
                      label="When Should This Be Done?"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="new_reminder.date" @input="date_menu = false"></v-date-picker>
                </v-menu>
              </v-flex> 
            </v-layout>
            
          </v-card-text>
          <v-card-actions>
            <div>
              <!-- <v-menu transition="slide-y-transition" bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn class="green" color="primary" v-on="on">
                                        Set Priority
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-tile v-for="priority in priorities" :key=priority.value @click="testFunction(priority)">
                                        <v-list-tile-title>
                                            {{ priority.label }}
                                        </v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
              </v-menu>-->
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {},
  data: () => ({
    date_menu: false,
    priorities: [
      { text: "High", value: "high" },
      { text: "Medium", value: "medium" },
      { text: "Low", value: "low" }
    ],
    new_reminder: {
      priority: "low",
      description: "",
      date: new Date().toISOString().substr(0, 10)
    }
  }),
  computed: {},
  methods: {
    testFunction(priority) {
      console.log(`picked ${priority} priority`);
    }
  }
};
</script>