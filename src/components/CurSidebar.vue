<template>
  <div>
    <template v-if="allCur.length > 0">
      <div class="cur-table">
        <q-table
          :data="allCur"
          :columns="columns"
          :pagination= "pagination"
          :selected-rows-label="getSelectedString"
          selection="multiple"
          :selected.sync="selected"
          :filter="filter"
          row-key="symbol"
          class="my-sticky-header-table"
          hide-bottom
          dense
          dark
        >
          <template v-slot:top-left v-if="selected.length > 0">
            <q-btn-toggle
              v-model="favorites"
              spread
              glossy
              unelevated
              no-caps
              toggle-color="accent"
              color="primary"
              text-color="white"
              :options="[
                {label: 'All', value: 'all', slot: 'all'},
                {label: 'Favorites',value: 'fav', slot: 'fav'},
              ]"
            >
              <template v-slot:all>
                <q-tooltip>All currency</q-tooltip>
              </template>
              <template v-slot:fav>
                <q-tooltip>Favorites currency</q-tooltip>
              </template>
            </q-btn-toggle>
          </template>
          <template v-slot:top-right>
            <q-input dark borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props" v-show="favorites === 'all' || selected.length === 0 || (favorites === 'fav' && props.selected)">
              <q-td auto-width>
                <q-toggle
                  dense
                  checked-icon="star"
                  color="green"
                  unchecked-icon="star_border"
                  v-model="props.selected"
                />
              </q-td>
              <q-td auto-width key="symbol" :props="props">
                <q-btn size="sm" dense :outline="curClick !== props.row.symbol" color="accent" @click="setCurClick(props.row.symbol)">
                  {{props.row.symbol}}
                </q-btn>
              </q-td>
              <q-td auto-width key="lastPrice" :props="props">{{props.row.lastPrice.toFixed(6)}}</q-td>
              <q-td auto-width key="dailyChangePerc" :props="props">
                <q-badge square :color="props.row.dailyChangePerc < 0 ? 'red' : 'green'">
                  {{(Math.abs(props.row.dailyChangePerc) * 100).toFixed(2) + '%'}}
                </q-badge>
              </q-td>
              <q-td key="det" :props="props">
                <q-btn size="sm" dense round flat color="grey" :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'" @click="props.expand = !props.expand" />
              </q-td>
            </q-tr>
            <q-tr v-if="favorites === 'all' || selected.length === 0 || (favorites === 'fav' && props.selected)" v-show="props.expand" :props="props" class="bg-secondary">
              <q-td colspan="100%">
                <div class="text-left row items-center justify-between">
                  <div class="col flex column items-center justify-center">
                    <q-badge square color="green">high:</q-badge>
                    <span class="q-ml-xs text-green">{{props.row.high.toFixed(5)}}</span>
                  </div>
                  <div class="col flex column items-center justify-center">
                    <q-badge square color="red">low:</q-badge>
                    <span class="q-ml-xs text-red">{{props.row.low.toFixed(5)}}</span>
                  </div>
                  <div class="col flex column items-center justify-center">
                    <q-badge square :color="props.row.dailyChangePerc < 0 ? 'red' : 'green'">
                      24h:
                    </q-badge>
                    <span :class="props.row.dailyChangePerc < 0 ? 'text-red q-ml-xs' : 'text-green q-ml-xs'">
                      {{props.row.dailyChange.toFixed(5)}}
                    </span>
                  </div>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </template>
    <template v-else>
      <p style="width: 382px;">
        Loading...
      </p>
    </template>
  </div>
</template>

<style lang="stylus">

  .cur-table
    width 100%

    .q-table tbody tr.selected
      background none

  .my-sticky-header-table
    border 1px solid $liteSecondary
    border-radius 3px

    .q-table__middle
        max-height calc(100vh - 140px) !important

    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th /* bg color is important for th; just specify one */
      background-color $backgroundGrey
      color $blackText

    thead tr:first-child th
      position sticky
      top 0
      opacity 1
      z-index 1

</style>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapGetters} = createNamespacedHelpers('cur');

export default {
  name: 'cur-sidebar',
  props: {
    curClick: {
      type: String,
      required: true
    },
    setCurClick: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      favorites: 'all',
      filter: '',
      selected: [],
      columns: [
        {
          name: 'symbol',
          label: 'Currency',
          sortable: true,
          field: 'symbol',
          align: 'left',
          required: true
        },
        {
          name: 'lastPrice',
          label: 'Rates',
          field: 'lastPrice',
          align: 'left',
          sortable: true,
          required: true
        },
        {
          name: 'dailyChangePerc',
          label: 'Day, %',
          field: 'dailyChangePerc',
          align: 'left',
          sortable: true,
          required: true
        },
        {
          name: 'det',
          label: 'Details',
          field: 'det',
          align: 'center'
        }
      ],
      pagination: {
        rowsPerPage: 0
      }
    };
  },
  computed: {
    ...mapGetters(['allCur'])
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`;
    }
  }
};
</script>
