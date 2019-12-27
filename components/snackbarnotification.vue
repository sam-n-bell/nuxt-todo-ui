<template>
    <v-snackbar
      v-model="snackbar_object.visible"
      :multi-line="snackbar_object.multiline"
      :timeout="0"
      :top="snackbar_object.top"
      :color="snackbar_object.color"
    >
     {{ snackbar_object.text }}
      <!-- <v-btn
        color="primary"
        flat
        @click="closeFunction()"
      > -->
      <v-btn
        color="primary"
        flat
        @click="hide()"
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
        hide () {
          this.$store.commit("notifications/hideSnackBar")
        },
        closeFunction () {
          try {
            this.snackbar_object.close_button_function();
          } catch (err) {
            console.error(err)
          }
        }
    },
    mounted () {

    }
}
</script>