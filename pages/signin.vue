<template>
  <section class="container">
    <v-app>
      <v-form>
        <v-container>
          <div class="form">
            <p class="error">
              {{ this.$store.getters['getError'].error_message }}
            </p>
            <h1>SIGNIN PAGE</h1>
            <p>ユーザ情報をご入力ください。</p>
            <v-text-field
              outlined
              label="おなまえ"
              v-model="name"
            ></v-text-field>
            <v-text-field
              outlined
              label="メールアドレス"
              v-model="mail"
            ></v-text-field>
            <v-text-field
              outlined
              label="パスワード"
              v-model="pass"
            ></v-text-field>
            <v-btn color="primary" @click="signin">SIGN IN</v-btn>
            <v-row justify="end">
              <v-btn color="info" to="/login">既に会員の方はこちら</v-btn>
            </v-row>
          </div>
        </v-container>
      </v-form>
      <router-link to="/todos">TOPページへ</router-link>
    </v-app>
  </section>
</template>

<script>
export default {
  data() {
    return {
      mail: '',
      pass: '',
      name: '',
    }
  },
  methods: {
    signin() {
      this.$store.dispatch('signin', {
        mail: this.mail,
        pass: this.pass,
        name: this.name,
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
