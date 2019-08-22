<template>
  <q-page class="row items-center justify-center">
    <q-card class="q-pa-md" style="width: 350px">
      <div class="text-center text-h6 row items-center justify-center">
        SING IN<q-icon slot="right" name="lock" />
      </div>
      <q-card-section>
        <div class="q-gutter-y-md column">
          <q-input v-model="form.email" round outlined borderless type="email" label="Email" />
          <q-input v-model="form.password" round outlined borderless :type="isPwd ? 'password' : 'text'" label="Password">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-actions class="row justify-end q-px-md q-pb-none">
        <q-btn :loading="loading" color="primary" lable="Login" @click="signIn">Login</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';

const {mapActions} = createNamespacedHelpers('auth');

export default {
  name: 'login',
  data () {
    return {
      loading: false,
      isPwd: true,
      form: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions(['login']),
    async signIn () {
      this.loading = true;
      try {
        await this.login(this.form);
        this.$router.push('/home');
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>

</style>
