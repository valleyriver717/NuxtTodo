<template>
  <section class="container">
    <p class="error">{{ error_message }}</p>
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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  data() {
    return {
      mail: '',
      pass: '',
      error_message: '',
    }
  },
  methods: {
    login() {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, this.mail, this.pass)
        .then((userCredential) => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.error_message = error.code + ':' + error.message
        })
    },
  },
}
</script>
