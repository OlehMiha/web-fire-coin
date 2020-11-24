<template>
  <div id="q-app">
    <router-view />
    <script2 src="https://s3.tradingview.com/tv.js"/>
  </div>
</template>

<script>
import ws from 'src/api/ws';
import {getAccessToken} from 'src/api/jwt/storage';
export default {
  name: 'app',
  created () {
    this.$q.dark.set(true);
    if (getAccessToken()) {
      ws.start();
      // verifyTokens();
    }
  },
  mounted () {
    if (getAccessToken()) {
      ws.start();
      // verifyTokens();
    }
  }
};
</script>

<style>
</style>
