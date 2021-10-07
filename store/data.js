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
  allData: {},
})

export const mutations = {
  setData(state, data) {
    state.data = data
  },
  setAllData(state, data) {
    state.data = data
  },
}

export const getters = {
  getData(state) {
    return state.data
  },
  getAllData(state) {
    return state.data
  }
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
      isDone: false,
    }

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {}
    // updates['/posts/' + newPostKey] = postData
    updates['todos/' + iid] = postData

    update(ref(db), updates)
  },
  readData(context, iid) {
    const dbRef = ref(getDatabase())
    get(child(dbRef, `todos/${iid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val())
          return snapshot.val()
        } else {
          // console.log('No data available')
          return null
        }
      })
      .catch((error) => {
        console.error(error)
      })
  },
  readDataAll(context) {
    const dbRef = ref(getDatabase())
    get(child(dbRef, 'todos/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // return snapshot.val()
          context.commit('setData', snapshot.val())
        } else {
          return null
        }
      })
      .catch((error) => {
        console.error(error)
      })
  },
  updateData(context) {
    // const uid = context.rootGetters['getAuth'].uid
    const db = getDatabase()
    set(ref(db, 'users/' + uid + '/todos/-MlEhkHZIVtgx43v7KAU'), {
      title: 'abc',
      detail: 'def',
    })
  },
  updateDataOnlyIsDone(context, { iid, isDone }) {
    // const uid = context.rootGetters['getAuth'].uid
    const db = getDatabase()
    set(ref(db, 'todos/' + iid + '/isDone'), isDone).then((resp) => {
      console.log('done.')
    })
  },
  deleteData(context, iid) {
    // const uid = context.rootGetters['getAuth'].uid
    const db = getDatabase()
    remove(ref(db, 'todos/' + iid))
  },
}
