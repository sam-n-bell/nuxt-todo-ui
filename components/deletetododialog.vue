<template>
  <div>
      <v-dialog v-model="remove_todo_dialog.visisble" persistent width="500">
          <v-card>
              <v-card-title primary-title>
                  {{ remove_todo_dialog.title }}
              </v-card-title>
              <v-card-text>
                  {{ remove_todo_dialog.body }}
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                  <v-btn color="primary" @click="confirmDelete">{{ remove_todo_dialog.confirm_btn_text }}</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="cancelDelete">{{ remove_todo_dialog.cancel_btn_text }}</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    
  },
  props: [],
  data: () => ({
    
  }),
  computed: {
    remove_todo_dialog () {
        return this.$store.notifications.remove_todo_dialog;
    }
  },
  methods: {
    confirmDelete () {
        try {
            this.remove_todo_dialog.confirm_btn_function();
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
    ...mapActions({
        "hideRemoveDialog": "notifications/hideRemoveDialog"
    })
  },
  mounted () {
  }
};
</script>