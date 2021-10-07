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
  data: {},
})

export const mutations = {
  setData(state, data) {
    state.data = data
  },
}

export const getters = {
  getData(state) {
    return state.data
  },
}

export const actions = {
  registerOnValue: (context) => {
    const uid = context.rootGetters['getAuth'].uid
    const db = getDatabase()
    const todosRef = ref(db, 'todos/')
    onValue(todosRef, (snapshot) => {
      const data = snapshot.val()
      context.commit('setData', data)
    })
  },
  createData(context, payload) {
    const uid = context.rootGetters['getAuth'].uid
    const db = getDatabase()

    // Get a key for a new Post.
    const iid = push(child(ref(db), 'todos/')).key

    // A post entry.
    const postData = {
      title: payload.title,
      detail: payload.detail,
      createdBy: uid,
    }

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {}
    // updates['/posts/' + newPostKey] = postData
    updates['todos/' + iid] = postData

    update(ref(db), updates)
  },
  readData(context) {
    const uid = context.rootGetters['getAuth'].uid
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
    const uid = context.rootGetters['getAuth'].uid
    const db = getDatabase()
    set(ref(db, 'users/' + uid + '/todos/-MlEhkHZIVtgx43v7KAU'), {
      title: 'abc',
      detail: 'def',
    })
  },
  deleteData(context, iid) {
    const uid = context.rootGetters['getAuth'].uid
    const db = getDatabase()
    remove(ref(db, 'todos/' + iid))
  },
}
