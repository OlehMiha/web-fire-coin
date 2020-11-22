<template>
  <q-page class="row items-center justify-center">
    <q-card dark class="bg-grey-9 q-pa-md" style="width: 350px">
      <div class="text-center text-h6 row items-center justify-center">
        REGISTER<q-icon slot="right" name="lock" />
      </div>
      <q-card-section>
        <div class="q-gutter-y-xs column">
          <q-input
            v-model.trim="form.username"
            type="text"
            :error="$v.form.username.$error"
            @blur="$v.form.username.$touch"
            label="Name"
            dark
            round
            outlined
            borderless
          >
            <template v-slot:error>
              <div class="text-right">Required name.</div>
            </template>
          </q-input>

          <q-input
            v-model.trim="form.email"
            type="email"
            :error="$v.form.email.$error"
            @blur="$v.form.email.$touch"
            label="Email"
            dark
            round
            outlined
            borderless
          >
            <template v-slot:error>
              <div class="text-right">Invalid email.</div>
            </template>
          </q-input>

          <q-input
            v-model.trim="form.password"
            :type="isPwd ? 'password' : 'text'"
            :error="$v.form.password.$error"
            @blur="$v.form.password.$touch"
            label="Password"
            dark
            round
            outlined
            borderless
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
            <template v-slot:error>
              <div class="text-right" v-if="!$v.form.password.required">
                Required password.
              </div>
              <div class="text-right" v-if="!$v.form.password.minLength">
                Min length 6 symbol.
              </div>
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-separator dark inset />
      <q-card-actions class="row justify-between q-px-md q-pb-none">
        <q-btn :loading="loading" color="primary" lable="Login" to="/login" flat>Login</q-btn>
        <q-btn :loading="loading" color="primary" lable="Sing Up" @click="signUp">Register</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import {createNamespacedHelpers} from 'vuex';
import {required, email, minLength} from 'vuelidate/lib/validators';

const {mapActions} = createNamespacedHelpers('auth');

export default {
  name: 'login',
  data () {
    return {
      loading: false,
      isPwd: true,
      form: {
        email: '',
        password: '',
        username: ''
      }
    };
  },
  validations: {
    form: {
      email: {email, required},
      password: {required, minLength: minLength(6)},
      username: {required}
    }
  },
  methods: {
    ...mapActions(['register']),
    async signUp () {
      this.loading = true;
      try {
        await this.register(this.form);
        this.$router.push('/home');
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="stylus">

</style>
