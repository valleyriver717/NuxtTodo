<template>
  <section class="container">
    <h1>MY PAGE</h1>
    <router-link to="/login">GO TO LOGIN PAGE</router-link>
    <br />
    <router-link to="/signin">GO TO SIGNIN PAGE</router-link>
    <br />
    <router-link to="/todos">GO TO TODOS PAGE</router-link>
    <hr />
    <v-btn @click="logout">LOGOUT</v-btn>
  </section>
</template>

<script>
export default {
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
    },
  },
}
</script>
