<template>
  <q-page class="flex justify-center q-pa-md">
    <template v-if="dataTableUsers">
      <div class="scroll-data-background">
        <q-table
          :data="dataTableUsers"
          :columns="columns"
          :pagination= "pagination"
          row-key="index"
          class="my-sticky-header-table"
          hide-bottom
          flat
        >

          <q-tr slot="header" slot-scope="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{col.label}}
            </q-th>
          </q-tr>
          <tr v-if="!props.row.pattern" slot="body" slot-scope="props" :props="props" class="row-table">

            <td key="avatar" :props="props" width="40px">
              <div class="row items-center justify-between no-wrap">
                <template v-if="props.row.avatar">
                  <img v-img:group-1 :src="props.row.avatar" :alt="props.row.name" width="40px">

                  <input
                    :ref="'inputFile'+props.row.id"
                    type="file"
                    class="file"
                    hidden
                    accept=".png, .jpg, .jpeg, .gif"
                    @change="updateFile($refs['inputFile'+props.row.id].files[0], props.row)"
                  >
                </template>
                <template v-else>
                  <q-avatar color="primary" text-color="white" style="font-size: 40px;">
                    {{props.row.firstname[0].toUpperCase() + props.row.lastname[0].toUpperCase()}}
                  </q-avatar>
                </template>
                <q-btn
                  round
                  color="secondary"
                  size="xs"
                  icon="cloud_download"
                  class="q-ml-sm"
                  @click="$refs['inputFile'+props.row.id].click()"
                />
              </div>
            </td>

            <td key="firstname" :props="props" >{{`${props.row.firstname} ${props.row.lastname}`}}</td>
            <td key="email" :props="props" >{{props.row.email}}</td>
            <td key="phone" :props="props" >{{props.row.phone}}</td>

            <td key="active" :props="props" class="text-center" width="60px">
              <q-btn color="negative" @click="deleteRow(props.row)" ><q-icon name="delete_forever"/></q-btn>
            </td>

          </tr>
        </q-table>
      </div>
    </template>
    <template v-else>
      <p>
        Loading...
      </p>
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
const {mapActions, mapGetters} = createNamespacedHelpers('users');

export default {
  name: 'page-index',
  data () {
    return {
      columns: [
        {name: 'avatar', label: 'Avatar', field: 'avatar', align: 'left'},
        {
          name: 'firstname',
          label: 'User Name',
          field: 'firstname',
          align: 'left',
          required: true
        },
        {
          name: 'email',
          label: 'Email',
          field: 'email',
          align: 'left',
          required: true
        },
        {
          name: 'phone',
          label: 'Phone',
          field: 'phone',
          align: 'left',
          required: true
        },
        {
          name: 'active',
          required: true,
          label: 'Active',
          align: 'center',
          field: 'active'
        }
      ],
      pagination: {
        rowsPerPage: 0,
        sortBy: 'firstname'
      }
    };
  },
  computed: mapGetters(['dataTableUsers']),
  async created () {
    await this.setDataTableUsers();
  },
  methods: {
    ...mapActions(['setDataTableUsers', 'deleteUser']),
    updateFile (file, obj) {
      const formData = new FormData();
      formData.append('image', file);
      // this.updateBackground({
      //   data: formData,
      //   id: obj.id
      // });
    },
    deleteRow (props) {
      this.$q.dialog({
        title: 'Delete user',
        message: `Delete user - ${props.firstname} ${props.lastname} ?`,
        cancel: true,
        persistent: true,
        color: 'negative',
        ok: {
          push: true,
          label: 'Delete!'
        }
      }).onOk(() => {
        this.deleteUser({id: props.id});
      });
    }
  }
};
</script>
