import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
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
    if (auth) {
      state.auth.uid = auth.uid
      state.auth.name = auth.displayName
    } else {
      state.auth.uid = ''
      state.auth.name = ''
    }
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
  signin(context, { mail, pass, name }) {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, mail, pass)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: name,
        })
          .then(() => {
            this.commit('setAuth', userCredential.user)
            console.log('Profile updated!!')
          })
          .catch((error) => {
            this.commit('setError', error)
            console.log(error)
          })
        this.$router.push('/')
      })
      .catch((error) => {
        this.commit('setError', error)
      })
  },
  logout(context) {
    const auth = getAuth()
    auth.signOut()
    this.commit('setAuth', null)
    this.$router.push('/todos')
  },
}
