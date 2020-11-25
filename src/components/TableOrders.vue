<template>
    <q-table
      v-if="users && users.orders"
      :data="users.orders"
      :columns="columns"
      row-key="name"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
      class="orders-table"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <template v-if="col.name === 'amount' || col.name === 'price'">
              {{(+col.value).toFixed(6) * 1}}
            </template>
            <template v-else>
              {{col.value}}
            </template>
          </q-td>
        </q-tr>
      </template>
    </q-table>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapState} = createNamespacedHelpers('users');

export default {
  name: 'table-orders',
  data () {
    return {
      orders: [],
      pagination: {
        page: 1,
        rowsPerPage: 0
      },
      // amount: 21964.374031
      // price: 0.0327
      // status: "ACTIVE"
      // symbol: "TRXUSD"
      // type: "EXCHANGE LIMIT"
      columns: [
        {name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true},
        {name: 'symbol', label: 'Symbol', field: 'symbol', align: 'left', sortable: true},
        {name: 'amount', label: 'Amount', field: 'amount', align: 'left', sortable: true},
        {name: 'price', label: 'Price', field: 'price', align: 'left', sortable: true},
        {name: 'type', label: 'Type', field: 'type', align: 'left', sortable: true},
        {name: 'status', label: 'Status', field: 'status', style: 'width: 100%'}
      ]
    };
  },
  computed: {
    ...mapState(['users'])
  }
};
</script>

<style lang="stylus">
  .orders-table
    width 100%
    height 100%
</style>
