<template>
  <div class="all-graphs">
    <script2 src="https://s3.tradingview.com/tv.js"/>
    <div class="row items-md-stretch" style="height: calc(100% - 200px)">
      <div class="graph col q-pr-md q-pb-md">
        {{curClick}}
        <div :key="curClick + 'main_graph'" style="height: calc(100% - 60px); width: 100%;">
          <div id="main_graph" style="height: 100%; width: 100%;"/>
          <script2>
            new TradingView.widget(
            {
            "autosize": true,
            "symbol": "BITFINEX:{{curClick}}",
            "interval": "180",
            "timezone": "Europe/Moscow",
            "theme": "Dark",
            "style": "9",
            "locale": "ru",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "hide_legend": true,
            "hide_side_toolbar": false,
            "container_id": "main_graph"
            });
          </script2>
        </div>
      </div>

      <div class="graph col q-pr-md q-pb-md">
        {{curClick}}
        <div style="height: calc(100% - 60px); width: 100%;">
          <div id="tradingview_494b2" style="height: 100%; width: 100%;"/>
          <script2>
            new TradingView.widget(
            {
            "autosize": true,
            "symbol": "BITFINEX:BTCUSD",
            "interval": "180",
            "timezone": "Europe/Moscow",
            "theme": "Dark",
            "style": "9",
            "locale": "ru",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "hide_legend": true,
            "hide_side_toolbar": false,
            "container_id": "tradingview_494b2"
            });
          </script2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'graphs',
  props: {
    curClick: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      options: {
        autosize: true,
        interval: '180',
        timezone: 'Europe/Moscow',
        theme: 'Dark',
        style: '9',
        locale: 'ru',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        hide_legend: true,
        hide_side_toolbar: false
      }
    };
  }
};
</script>

<style lang="stylus">
.all-graphs
  width 100%;
</style>
