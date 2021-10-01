<template>
  <section class="container">
    <v-app>
      <v-form>
        <v-container>
          <div class="form">
            <p class="error">{{ error_message }}</p>
            <h1>SIGNIN PAGE</h1>
            <v-text-field
              outlined
              label="mailaddress"
              v-model="mail"
            ></v-text-field>
            <v-text-field
              outlined
              label="password"
              v-model="pass"
            ></v-text-field>
            <v-btn color="primary" @click="signin">SIGN IN</v-btn>
            <v-row justify="end">
              <v-btn color="info" to="/login">既に会員の方はこちら</v-btn>
            </v-row>
          </div>
        </v-container>
      </v-form>
    </v-app>
  </section>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default {
  data() {
    return {
      mail: '',
      pass: '',
      error_message: '',
    }
  },
  methods: {
    signin() {
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.mail, this.pass)
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

<style scoped>
.form {
  width: 400px;
  margin: auto;
}
</style>
