<template>
  <v-container fluid grid-list-md grid-list-xl grid-list-lg>
    <newtodo></newtodo>
    <todoslist></todoslist>
  </v-container>
</template>

<script>
import newtodo from '../components/newtodo.vue'
import todoslist from '../components/todoslist.vue'
import constants from '../assets/constants.js';

export default {
  middleware: 'authentication',
  components: {
      newtodo, todoslist
    },
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
  },
  mounted () {
    
  }
};
</script>