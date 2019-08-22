<template>
  <q-layout view="hHh LpR lFf">
    <q-header reveal elevated>
      <q-toolbar color="primary" >

        <q-toolbar-title>
          WebFireCoin
          <div slot="subtitle">v0.0.1</div>
        </q-toolbar-title>

        <div>
          User
          <q-btn
            style="margin-left: 15px"
            flat
            round
            dense
            icon="exit_to_app"
            @click="logoutApp"/>
        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <LeftSidebar />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
import LeftSidebar from 'src/components/LeftSidebar';

const {
  mapActions: mapAuthActions
} = createNamespacedHelpers('auth');

export default {
  name: 'layout',
  components: {
    LeftSidebar
  },
  methods: {
    ...mapAuthActions(['logout']),
    logoutApp () {
      this.logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style>
</style>
