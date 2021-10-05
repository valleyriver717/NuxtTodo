<template>
  <section class="contai">
    <h1>MY PAGE</h1>
    <router-link to="/login">GO TO LOGIN PAGE</router-link>
    <router-link to="/signin">GO TO SIGNIN PAGE</router-link>
    <hr>
    <v-btn @click="logout">LOGOUT</v-btn>
  </section>
</template>

<script>
import { getAuth } from 'firebase/auth'

export default {
  methods: {
    logout: function () {
      getAuth().signOut()
      this.$router.push('/login')
    },
  },
}
</script>
