<template>
  <q-layout view="hHh LpR lFf">
    <q-header reveal elevated>
      <q-toolbar color="primary" >
        <q-btn
          flat
          round
          dense
          :icon="openMenu ? 'arrow_back' : 'menu'"
          @click="openMenu = !openMenu"/>
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
      <LeftSidebar :openMenu="openMenu"/>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
import LeftSidebar from 'src/components/LeftSidebar';
import ws from 'src/api/ws';

const {mapActions: mapAuthActions} = createNamespacedHelpers('auth');
const {mapActions: mapKeysActions} = createNamespacedHelpers('keys');

export default {
  name: 'layout',
  components: {
    LeftSidebar
  },
  data () {
    return {
      openMenu: false
    };
  },
  async created () {
    await this.setKeys();
    await ws.start();
  },
  methods: {
    ...mapAuthActions(['logout']),
    ...mapKeysActions(['setKeys']),
    logoutApp () {
      this.logout();
      ws.close();
      this.$router.push('/login');
    }
  }
};
</script>

<style>
</style>
