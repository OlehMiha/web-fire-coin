<template>
  <div class="page-full-h row no-wrap q-pa-md ">
    <Graphs :curClick="curClick"/>
    <CurSidebar :curClick="curClick" :setCurClick="setCurClick"/>
  </div>
</template>

<style>
</style>

<script>
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
    CurSidebar,
    Graphs
  },
  methods: {
    setCurClick (newCurClick) {
      this.curClick = newCurClick;
    }
  }
};
</script>
