<template>
  <div bordered class="left-bar bg-white">
    <!--<q-separator dark inset />-->

    <q-list>

      <q-item
        clickable
        :active="link === 'home'"
        @click="goUrlMenu('home')"
        class="my-menu-link"
        active-class="my-menu-link-active"
      >
        <q-item-section avatar>
          <q-icon name="wc" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Users</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        :active="link === 'vendors'"
        @click="goUrlMenu('vendors')"
        class="my-menu-link"
        active-class="my-menu-link-active"
      >
        <q-item-section avatar>
          <q-icon name="business_center" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Vendors</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        :active="link === 'translate'"
        @click="goUrlMenu('translate')"
        class="my-menu-link"
        active-class="my-menu-link-active"
      >
        <q-item-section avatar>
          <q-icon name="format_align_left" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Translate</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        :active="link === 'settings'"
        @click="goUrlMenu('settings')"
        class="my-menu-link"
        active-class="my-menu-link-active"
      >
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Settings</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script>
export default {
  name: 'left-sidebar',
  data () {
    return {
      link: 'users'
    };
  },
  methods: {
    goUrlMenu (url) {
      this.link = url;
      this.$router.push('/' + url);
      console.log(url);
    }
  }
};
</script>

<style lang="stylus">
.left-bar
  height calc(100vh - 50px)
  min-width 180px;
  float left
  text-align left
  border none
  border-radius 0
  border-right 1px solid $secondary

  .my-menu-link-active
    background $liteSecondary
    border-right 2px solid $accent
    margin-right -1px
</style>
