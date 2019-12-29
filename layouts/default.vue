<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <!-- <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" /> -->
      <v-spacer />
      <v-menu transition="slide-y-transition" left>
        <v-avatar slot="activator" color="indigo">
          <v-icon dark>account_circle</v-icon>
        </v-avatar>
        <v-list>
          <v-list-tile :key="'logout'" @click="logout()">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <snackbarnotification/>
    <deletetododialog/>
  </v-app>
</template>

<script>
import deletetododialog from '../components/deletetododialog.vue';
import snackbarnotification from '../components/snackbarnotification.vue';
import { mapActions } from 'vuex';

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
  computed:{
    user () {
      return this.$store.state.authentication.user;
    }
  },
  watch: {
    //replace with jwt when api works
    user (value) {
      if (value === null) {
        this.$router.push('/login')
      }
    }
  },
  methods: {
    ...mapActions({
      logout: "authentication/logout"
    })
  }
}
</script>
