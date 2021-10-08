import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

export const state = () => ({
  auth: {
    uid: null,
    name: null,
  },
  error: {
    error_message: '',
  },
})

export const mutations = {
  setError(state, error) {
    state.error.error_message = error.code + error.message
  },
  setAuth(state, auth) {
    state.auth.uid = auth.uid
    state.auth.name = auth.displayName
  },
}

export const getters = {
  getError(state) {
    console.log(state.error)
    return state.error
  },
  getAuth(state) {
    return state.auth
  },
}

export const actions = {
  login(context, { mail, pass }) {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, mail, pass)
      .then((userCredential) => {
        this.commit('setAuth', userCredential.user)
        this.$router.push('/')
      })
      .catch((error) => {
        this.commit('setError', error)
      })
  },
  signin(context, { mail, pass }) {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, mail, pass)
      .then((userCredential) => {
        this.commit('setAuth', userCredential.user)
        this.$router.push('/')
      })
      .catch((error) => {
        this.commit('setError', error)
      })
  },
  logout(context) {
    const auth = getAuth()
    auth.signOut()
    this.commit('setAuth', {
      uid: '',
      displayName: '',
    })
    this.$router.push('/todos')
  },
}
