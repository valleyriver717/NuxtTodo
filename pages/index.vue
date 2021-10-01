<template>
  <section class="contai">
    <h1>MY PAGE</h1>
    <router-link to="/login">GO TO LOGIN PAGE</router-link>
    <router-link to="/signin">GO TO SIGNIN PAGE</router-link>
    <p>{{isLogin}}</p>
    <div v-if="isLogin">
      <v-btn @click="logout">LOGOUT</v-btn>
    </div>
  </section>
</template>

<script>
import { getAuth } from 'firebase/auth'

export default {
  data() {
    return {
      isLogin: false,
    }
  },
  methods: {
    logout: function () {
      getAuth().signOut()
      this.$router.push('/login')
    },
  },
  async mounted() {
    await getAuth().onAuthStateChanged((user) => {
      this.isLogin = user ? true : false
    })
  },
  beforeRouteLeave(to, from, next) {
    if (this.isLogin && (to.path == '/login' || to.path == '/signin')) {
      this.$router.push('/')
    } else {
      next()
    }
  },
}
</script>
