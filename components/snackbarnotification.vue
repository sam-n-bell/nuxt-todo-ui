<template>
    <v-snackbar
      v-model="snackbar_object.visible"
      :multi-line="snackbar_object.multiline"
      :timeout="0"
      :top="snackbar_object.top"
      :color="snackbar_object.color"
    >
     {{ snackbar_object.text }}
      <v-btn
        color="primary"
        flat
        @click="snackbar_object.close_button_function"
      >
        {{ snackbar_object.close_button_text }}
      </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    data: () => ({

    }),
    computed: {
        snackbar_object () {
            return this.$store.state.notifications.snackbar;
        }
    },
    watch: {

    }, 
    methods: {
    },
    mounted () {

    }
}
</script>