<template>
    <q-table
      v-if="users && users[name] && users[name].wallets"
      :data="users[name].wallets"
      :columns="columns"
      row-key="name"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
      dense
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <template v-if="col.name === 'text' || col.name === 'symbol'">
              {{col.value}}
            </template>
            <template v-else>
              {{(+col.value).toFixed(6) * 1}}
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
  name: 'table-balance',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 0
      },
      columns: [
        {name: 'symbol', label: 'Symbol', field: 'symbol', align: 'left', sortable: true},
        {name: 'amount', label: 'Amount', field: 'amount', align: 'left', sortable: true},
        {name: 'block', label: 'Block', field: 'block', align: 'left', sortable: true},
        {name: 'text', label: 'Info', field: 'text', style: 'width: 100%'}
      ]
    };
  },
  computed: {
    ...mapState(['users'])
  }
};
</script>

<style lang="stylus">
</style>
