<template>
  <section class="container">
    <h1>TODOS PAGE</h1>
    <v-btn color="success" @click="createData">CREATE</v-btn>
    <v-btn color="success" @click="readData">READ</v-btn>
    <v-btn color="success" @click="updateData">UPDATE</v-btn>
    <v-btn color="success" @click="deleteData">DELETE</v-btn>
  </section>
</template>

<script>
import axios from 'axios'
// import { getDatabase, ref, onValue } from 'firebase/database'
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

export default {
  data() {
    return {
      url: 'https://todo-list-edad0-default-rtdb.asia-southeast1.firebasedatabase.app/users',
      uid: '/2LM45EpyIWe8lcm3Uh3PnZw30xq1',
    }
  },
  mounted: function () {
    const db = getDatabase()
    const todosRef = ref(db, 'users/' + this.uid + '/todos')
    onValue(todosRef, (snapshot) => {
      const data = snapshot.val()
      console.log(data)
    })
  },
  methods: {
    createData: function () {
      const db = getDatabase()

      // A post entry.
      const postData = {
        title: 'title',
        detail: 'detail',
      }

      // Get a key for a new Post.
      const newPostKey = push(
        child(ref(db), 'users/' + this.uid + '/todos')
      ).key

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {}
      // updates['/posts/' + newPostKey] = postData
      updates['users/' + this.uid + '/todos/' + newPostKey] = postData

      return update(ref(db), updates)
    },
    readData: function () {
      const dbRef = ref(getDatabase())
      get(child(dbRef, `users/${this.uid}/todos`))
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
    updateData: function () {
      const db = getDatabase()
      set(ref(db, 'users/' + this.uid + '/todos/-MlEhkHZIVtgx43v7KAU'), {
        title: 'abc',
        detail: 'def',
      })
    },
    deleteData: function () {
      const db = getDatabase()
      remove(ref(db, 'users/' + this.uid + '/todos/-MlEhkHZIVtgx43v7KAU'))
    },
  },
}
</script>
