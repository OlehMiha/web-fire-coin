<template>
  <div/>
</template>
<script>
import {createNamespacedHelpers} from 'vuex';
const {mapGetters: mapAuthGetters} = createNamespacedHelpers('auth');
const {mapActions: mapCurActions} = createNamespacedHelpers('cur');

export default {
  name: 'ws',
  data () {
    return {
      ws: null
    };
  },
  created () {
    const self = this;
    this.ws = new WebSocket('ws://localhost:8081?token=' + this.accessToken);
    this.ws.onopen = function () {
      console.log('WS подключенно');
    };
    this.ws.onclose = function (close) {
      console.log('соеденение закрыто причина: ' + close);
    };
    this.ws.onmessage = function (msg) {
      const d = JSON.parse(msg.data);
      switch (d.type) {
      case 'web.currency':
        self.updateAllCur(d.data);
        break;
      case 'web.error':
        break;
      default:
        break;
      }
    };
  },
  computed: {
    ...mapAuthGetters(['accessToken'])
  },
  methods: {
    ...mapCurActions(['updateAllCur']),
    sendmsg () {
      this.ws.send('тест сообщение');
    }
  }
};
</script>
