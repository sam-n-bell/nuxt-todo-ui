<template>
<div>
      <v-dialog v-model="remove_todo_dialog.visible" persistent width="500">
          <v-card>
              <v-card-title primary-title>
                  {{ remove_todo_dialog.title }}
              </v-card-title>
              <v-card-text>
                  <pre>{{ remove_todo_dialog }}</pre>
                  {{ remove_todo_dialog.body }}
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                  <v-btn color="error" @click="confirmDelete">{{ remove_todo_dialog.confirm_button_text }}</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="cancelDelete">{{ remove_todo_dialog.cancel_button_text }}</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  components: {
    
  },
  props: [],
  data: () => ({
  }),
  computed: {
    remove_todo_dialog () {
        return this.$store.state.notifications.remove_todo_dialog;
    }
  },
  watch: {
      
  },
  methods: {
    confirmDelete () {
        try {
            this.remove_todo_dialog.confirm_button_function();
        } catch (err) {
            console.error(err.message)
        } finally {
            this.hideRemoveDialog()
        }
    },
    cancelDelete () {
        try {
            this.remove_todo_dialog.cancel_btn_function();
        } catch (err) {
            console.error(err.message)
        } finally {
            this.hideRemoveDialog()
        }
    },
    hideRemoveDialog () {
        this.$store.commit("notifications/hideRemoveDialog")
    }
    // ...mapActions({
    //     // "hideRemoveDialog": "notifications/hideRemoveDialog"
    // })
  },
  mounted () {
  }
};
</script>