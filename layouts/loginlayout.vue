<template>
  <v-app dark>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import deletetododialog from '../components/deletetododialog.vue';
import snackbarnotification from '../components/snackbarnotification.vue';
export default {
  components: {
    deletetododialog, snackbarnotification
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        },
        {
          icon: 'list',
          title: 'To Dos',
          to: '/todos'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  mounted () {
      //this.$router.push("/")
  }
}
</script>
