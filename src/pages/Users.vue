<template>
  <q-page class="flex justify-center q-pa-md">
    <template>
      <div class="scroll-data-background">
        <q-table
          :loading="loading"
          :data="keys"
          :columns="columns"
          :pagination= "pagination"
          :filter="filter"
          :expanded.sync="expanded"
          row-key="name"
          class="my-sticky-header-table"
          hide-bottom
          flat
        >
          <template v-slot:top>
            <q-input v-model="name" class="q-mr-lg" label="Name">
              <template v-slot:prepend>
                <q-icon name="person_add" />
              </template>
            </q-input>
            <q-input v-model="key" class="q-mr-lg" label="Key">
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
            </q-input>
            <q-input v-model="secretKey" class="q-mr-lg" label="Secret Key">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <q-btn color="primary" :disable="loading" label="Add key" @click="addKeyInTable" />
            <q-space />
            <q-input borderless dense debounce="300" color="primary" v-model="filter">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <q-tr slot="header" slot-scope="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{col.label}}
            </q-th>
          </q-tr>
          <template v-slot:body="props">
            <tr :props="props" class="row-table" :key="`m_${props.row.name}`">
              <q-td v-if="users[props.row.name].wallets" auto-width>
                <q-toggle v-model="props.expand" />
              </q-td>
              <td key="name" :props="props" >{{props.row.name}}</td>
              <td key="key" :props="props" >{{props.row.key}}</td>
              <td key="secretKey" :props="props" >{{props.row.secretKey.slice(0,7) + "..."}}</td>

              <td key="active" :props="props" class="text-center" width="60px">
                <q-btn color="negative" @click="deleteRow(props.row)" ><q-icon name="delete_forever"/></q-btn>
              </td>
            </tr>
            <q-tr v-if="users[props.row.name].wallets" v-show="props.expand" :props="props" :key="`e_${props.row.name}`">
              <q-td colspan="100%">
                <table-balance :name="props.row.name"/>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </template>
  </q-page>
</template>

<style lang="stylus">
  .scroll-data-background
    width 100%

  .my-sticky-header-table
    border 1px solid $liteSecondary
    border-radius 5px

    .q-table__middle
        max-height calc(100vh - 82px) !important

    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th /* bg color is important for th; just specify one */
      background-color $secondary
      color $blackText

    thead tr:first-child th
      position sticky
      top 0
      opacity 1
      z-index 1

</style>

<script>
import {createNamespacedHelpers} from 'vuex';
const {mapActions, mapState} = createNamespacedHelpers('users');

import TableBalance from '../components/TableBalance';

export default {
  name: 'page-user',
  components: {
    TableBalance
  },
  data () {
    return {
      loading: false,
      filter: '',
      name: '',
      key: '',
      secretKey: '',
      expanded: [],
      columns: [
        {
          name: 'name',
          label: 'Name',
          field: 'name',
          align: 'left',
          required: true
        },
        {
          name: 'key',
          label: 'Key',
          field: 'key',
          align: 'left',
          required: true
        },
        {
          name: 'secretKey',
          label: 'Secret Key',
          field: 'secretKey',
          align: 'left',
          required: true
        },
        {
          name: 'active',
          label: 'Active',
          field: 'active',
          align: 'right'
        }
      ],
      pagination: {
        rowsPerPage: 0,
        sortBy: 'name'
      }
    };
  },
  computed: mapState(['keys', 'users']),
  async created () {
    this.loading = true;
    await this.setKeys();
    await this.setWallets();
    await this.setOrders();
    this.expanded = this.keys.map(r => r.name);
    this.loading = false;
  },
  methods: {
    ...mapActions(['setKeys', 'setWallets', 'setOrders', 'deleteKeys', 'addKey']),
    async addKeyInTable () {
      if (this.name && this.key && this.secretKey) {
        this.loading = true;
        try {
          await this.addKey({name: this.name, keyUser: this.key, secretKey: this.secretKey});
          this.name = '';
          this.key = '';
          this.secretKey = '';
        } catch (e) {} finally {
          this.loading = false;
        }
      }
    },
    deleteRow (props) {
      this.$q.dialog({
        title: 'Delete key',
        message: `Delete key - ${props.name} ${props.key} ?`,
        cancel: true,
        persistent: true,
        color: 'negative',
        ok: {
          push: true,
          label: 'Delete!'
        }
      }).onOk(async () => {
        this.loading = true;
        await this.deleteKeys({id: props._id});
        this.loading = false;
      });
    }
  }
};
</script>
