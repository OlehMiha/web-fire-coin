<template>
  <div bordered class="left-bar" :class="!openMenu && 'close'">
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
          <q-icon name="dashboard"/>
        </q-item-section>
        <q-item-section v-if="openMenu">
          <q-item-label>Dashboard</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        :active="link === 'users'"
        @click="goUrlMenu('users')"
        class="my-menu-link"
        active-class="my-menu-link-active"
      >
        <q-item-section avatar>
          <q-icon name="supervisor_account"/>
        </q-item-section>
        <q-item-section v-if="openMenu">
          <q-item-label>Users</q-item-label>
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
        <q-item-section v-if="openMenu">
          <q-item-label>Settings</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script>
export default {
  name: 'left-sidebar',
  props: {
    openMenu: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      link: 'home'
    };
  },
  created () {
    this.link = this.$route.path.slice(1);
  },
  watch: {
    '$route.path': function (path) {
      if (path.slice(1) !== this.link) {
        this.link = path.slice(1);
      }
    }
  },
  methods: {
    goUrlMenu (url) {
      this.link = url;
      this.$router.push('/' + url);
    }
  }
};
</script>

<style lang="stylus">
  .left-bar
    height calc(100vh - 50px)
    min-width 200px;
    float left
    text-align left
    border none
    border-radius 0
    border-right 1px solid $liteSecondary
    background $backgroundGrey
    color $blackText
    &.close
      max-width 60px
      min-width 60px

    .my-menu-link-active
      background $liteSecondary
      border-right 2px solid $accent
      margin-right -1px
</style>
