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
      createdAt: new Date().toLocaleString(),
      isDone: false,
      comment: '',
    }

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {}
    updates['todos/' + iid] = postData

    update(ref(db), updates)
  },
  readData(context) {
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'todos/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          context.commit('setData', snapshot.val())
        } else {
          return null
        }
      })
      .catch((error) => {
        console.error(error)
      })
  },
  updateData(context, payload) {
    const db = getDatabase()
    set(
      ref(db, 'todos/' + payload.iid + '/' + payload.key),
      payload.value
    ).then((resp) => {
      // console.log('done!')
    })
  },
  deleteData(context, iid) {
    const db = getDatabase()
    remove(ref(db, 'todos/' + iid)).then((resp) => {
      // console.log('done')
    })
  },
}
