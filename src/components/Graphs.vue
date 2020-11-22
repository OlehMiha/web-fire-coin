<template>
  <div class="all-graphs">
    <div class="row wrap items-stretch" :class="`graph-${numberCharts}`" style="height: calc(100vh - 64px)">
      <div class="graph col q-pr-md q-pb-md">
        <div class="header_graph q-py-xs q-px-md">
          <div class="row justify-between items-center">
            <span class="col">{{curClick}}</span>
            <span>Number of charts:</span>
            <div class="q-pl-md">
              <q-btn-toggle
                v-model="numberCharts"
                spread
                glossy
                unelevated
                no-caps
                toggle-color="accent"
                color="primary"
                text-color="white"
                :options="[
              {label: 'One', value: '1'},
              {label: 'Two', value: '2'},
              {label: 'Four', value: '4'}
            ]"
              />
            </div>
          </div>
        </div>
        <div :key="curClick + 'main_graph'" class="shadow-1" style="height: calc(100% - 49px); width: 100%;">
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
            "toolbar_bg": "#349c8f",
            "enable_publishing": false,
            "hide_legend": true,
            "hide_side_toolbar": false,
            "details": true,
            "container_id": "main_graph"
            });
          </script2>
        </div>
      </div>

      <div v-show="numberCharts === '2'|| numberCharts === '4'" class="graph col q-pr-md q-pb-md">
        <div class="header_graph q-py-xs q-px-md">
          <div class="row justify-end items-center">
            <div v-if="this.allCurSymbol" style="max-width: 320px">
              <q-select dense dark outlined color="primary" v-model="curClick_2" :options="this.allCurSymbol" />
            </div>
          </div>
        </div>
        <div :key="curClick_2 + 'graph_2'" class="shadow-1" style="height: calc(100% - 53px); width: 100%;">
          <div id="graph_2" style="height: 100%; width: 100%;"/>
          <script2>
            new TradingView.widget(
            {
            "autosize": true,
            "symbol": "BITFINEX:{{curClick_2}}",
            "interval": "180",
            "timezone": "Europe/Moscow",
            "theme": "Dark",
            "style": "9",
            "locale": "ru",
            "toolbar_bg": "#349c8f",
            "enable_publishing": false,
            "hide_legend": true,
            "hide_side_toolbar": false,
            "details": true,
            "container_id": "graph_2"
            });
          </script2>
        </div>
      </div>

      <div v-show="numberCharts === '4'" class="graph col q-pr-md q-pb-md">
        <div class="header_graph q-py-xs q-px-md">
          <div class="row justify-end items-center">
            <div v-if="this.allCurSymbol" style="max-width: 320px">
              <q-select dense dark outlined color="primary" v-model="curClick_3" :options="this.allCurSymbol" />
            </div>
          </div>
        </div>
        <div :key="curClick_3 + 'graph_3'" class="shadow-1" style="height: calc(100% - 53px); width: 100%;">
          <div id="graph_3" style="height: 100%; width: 100%;"/>
          <script2>
            new TradingView.widget(
            {
            "autosize": true,
            "symbol": "BITFINEX:{{curClick_3}}",
            "interval": "180",
            "timezone": "Europe/Moscow",
            "theme": "Dark",
            "style": "9",
            "locale": "ru",
            "toolbar_bg": "#349c8f",
            "enable_publishing": false,
            "hide_legend": true,
            "hide_side_toolbar": false,
            "details": true,
            "container_id": "graph_3"
            });
          </script2>
        </div>
      </div>

      <div v-show="numberCharts === '4'" class="graph col q-pr-md q-pb-md">
        <div class="header_graph q-py-xs q-px-md">
          <div class="row justify-end items-center">
            <div v-if="this.allCurSymbol" style="max-width: 320px">
              <q-select dense dark outlined color="primary" v-model="curClick_4" :options="this.allCurSymbol" />
            </div>
          </div>
        </div>
        <div :key="curClick_4 + 'graph_3'" class="shadow-1" style="height: calc(100% - 53px); width: 100%;">
          <div id="graph_4" style="height: 100%; width: 100%;"/>
          <script2>
            new TradingView.widget(
            {
            "autosize": true,
            "symbol": "BITFINEX:{{curClick_4}}",
            "interval": "180",
            "timezone": "Europe/Moscow",
            "theme": "Dark",
            "style": "9",
            "locale": "ru",
            "toolbar_bg": "#349c8f",
            "enable_publishing": false,
            "hide_legend": true,
            "hide_side_toolbar": false,
            "details": true,
            "container_id": "graph_4"
            });
          </script2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapGetters} = createNamespacedHelpers('cur');

export default {
  name: 'graphs',
  props: {
    curClick: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['allCurSymbol'])
  },
  data () {
    return {
      numberCharts: '1',
      curClick_2: 'BTCUSD',
      curClick_3: 'BTCUSD',
      curClick_4: 'BTCUSD',
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
  width 100%
  .header_graph
    width 100%
    background $primary
    border-radius 3px 3px 0 0
    color $blackText
  .graph-1 .graph
    max-width 100%
    max-height 100%
    min-width 100%
    min-height 100%
  .graph-2 .graph
    max-width 100%
    max-height 50%
    min-width 100%
    min-height 50%
  .graph-4 .graph
    max-width 50%
    max-height 50%
    min-width 50%
    min-height 50%
</style>
