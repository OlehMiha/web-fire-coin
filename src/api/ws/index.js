import store from '../../store';

class WS {
  constructor () {
    this.ws = null;
    this.authToken = null;
  }
  start () {
    this.authToken = store.getters['auth/accessToken'];
    if (this.ws === null && this.authToken) {
      this.ws = new WebSocket('ws://localhost:8081?token=' + this.authToken);
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
          store.dispatch('cur/updateAllCur', d.data);
          break;
        case 'web.allCur':
          store.dispatch('cur/updateAllCurSymbol', d.data);
          break;
        case 'web.error':
          break;
        default:
          break;
        }
      };
    }
    return this.ws;
  }
  send (text) {
    if (this.ws) {
      this.ws.send(text);
    }
  }
  close () {
    this.ws.close();
    this.ws = null;
  }
}

const ws = new WS();
export default ws;
