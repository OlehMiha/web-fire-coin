<template>
  <div class="page-full-h q-pa-md ">
    <div class="row no-wrap h-70">
      <Graphs :curClick="curClick"/>
      <CurSidebar :curClick="curClick" :setCurClick="setCurClick"/>
    </div>
    <div class="row no-wrap h-30">
      <TableOrders/>
    </div>
  </div>
</template>

<style>
</style>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('users');

import TableOrders from '../components/TableOrders';
import CurSidebar from 'src/components/CurSidebar';
import Graphs from 'src/components/Graphs';

export default {
  name: 'page-index',
  data () {
    return {
      loading: false,
      curClick: 'BTCUSD'
    };
  },
  components: {
    TableOrders,
    CurSidebar,
    Graphs
  },
  computed: mapState(['keys', 'users']),
  methods: {
    setCurClick (newCurClick) {
      this.curClick = newCurClick;
    }
  }
};
</script>

<style lang="stylus">
  .h-70
    height 70vh
    max-height 70vh
    margin-bottom -66px;
  .h-30
    height 30vh
    max-height 30vh
    max-width calc(100% - 390px)
</style>
