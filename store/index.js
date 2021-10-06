import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
// import database from '@/plugins/firebase.js'
import {
  getDatabase,
  ref,
  onValue,
  child,
  push,
  update,
  get,
  set,
  remove,
} from 'firebase/database'

export const state = () => ({
  auth: {
    uid: null,
    name: null,
  },
  error: {
    error_message: '',
  },
  data: {},
})

export const mutations = {
  setError(state, error) {
    state.error.error_message = error.code + error.message
  },
  setAuth(state, auth) {
    state.auth.uid = auth.uid
    state.auth.name = auth.displayName
  },
  setData(state, data) {
    state.data = data
  },
}

export const getters = {
  getError(state) {
    return state.error
  },
  getAuth(state) {
    return state.auth
  },
  getData(state) {
    return state.data
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
    this.$router.push('/login')
  },
  registerOnValue: (context) => {
    const uid = context.getters.getAuth.uid
    const db = getDatabase()
    const todosRef = ref(db, 'users/' + uid + '/todos')
    onValue(todosRef, (snapshot) => {
      const data = snapshot.val()
      context.commit('setData', data)
    })
  },
  createData(context, payload) {
    const uid = context.getters.getAuth.uid
    const db = getDatabase()

    // Get a key for a new Post.
    const iid = push(child(ref(db), 'users/' + uid + '/todos')).key

    // A post entry.
    const postData = {
      title: payload.title,
      detail: payload.detail,
    }

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {}
    // updates['/posts/' + newPostKey] = postData
    updates['users/' + uid + '/todos/' + iid] = postData

    update(ref(db), updates)
  },
  readData(context) {
    const uid = context.getters.getAuth.uid
    const dbRef = ref(getDatabase())
    get(child(dbRef, `users/${uid}/todos`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  },
  updateData(context) {
    const uid = context.getters.getAuth.uid
    const db = getDatabase()
    set(ref(db, 'users/' + uid + '/todos/-MlEhkHZIVtgx43v7KAU'), {
      title: 'abc',
      detail: 'def',
    })
  },
  deleteData(context, iid) {
    const uid = context.getters.getAuth.uid
    const db = getDatabase()
    remove(ref(db, 'users/' + uid + '/todos/' + iid))
  },
}
