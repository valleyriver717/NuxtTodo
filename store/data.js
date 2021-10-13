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
      let data = snapshot.val()
      if (snapshot.exists()) {
        var pairs = Object.entries(data)
        console.log(pairs.length)
        if (pairs.length > 1) {
          pairs.sort(function (p1, p2) {
            var p1Val = p1[1].timestamp,
              p2Val = p2[1].timestamp
            if (p1Val > p2Val) return -1
            else return 1
          })
          data = Object.fromEntries(pairs)
          context.commit('setData', data)
        } else {
          context.commit('setData', data)
        }
      }
      context.commit('setData', data)
    })
  },
  createData(context, payload) {
    const name = context.rootGetters['getAuth'].name
    // const uid = context.rootGetters['getAuth'].uid
    const db = getDatabase()

    // Get a key for a new Post.
    const iid = push(child(ref(db), 'todos/')).key

    // A post entry.
    const postData = {
      title: payload.title,
      detail: payload.detail,
      createdBy: name,
      createdAt: new Date().toLocaleString(),
      timestamp: new Date().getTime(),
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
