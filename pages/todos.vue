<template>
  <v-container fluid grid-list-md grid-list-xl grid-list-lg>
    <newtodo></newtodo>
  </v-container>
</template>

<script>
import newtodo from '../components/newtodo.vue'

export default {
  components: {
      newtodo
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
  }
};
</script>