<template>
  <section class="container">
    <p class="error">
      {{ this.$store.getters['auth/getError'].error_message }}
    </p>
    <h1>LOGIN PAGE</h1>
    <v-app>
      <v-form>
        <v-container>
          <v-text-field label="mailaddress" v-model="mail"></v-text-field>
          <v-text-field label="password" v-model="pass"></v-text-field>
          <v-btn color="primary" @click="login">LOGIN</v-btn>
          <v-row justify="end">
            <v-btn color="info" to="/signin">登録はこちら</v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-app>
  </section>
</template>

<script>
export default {
  data() {
    return {
      mail: '',
      pass: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', { mail: this.mail, pass: this.pass })
    },
  },
}
</script>
