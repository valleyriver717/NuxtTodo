<template>
  <section class="container">
    <h1>TODOS PAGE</h1>
    <v-btn color="success" @click="createData">CREATE</v-btn>
    <p>{{ isDone }}</p>
    <p>{{ this.$store.getters['getAuth'].uid }}</p>
    <v-simple-table dence>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">DONE</th>
            <th class="text-left">ITEM ID</th>
            <th class="text-left">TITLE</th>
            <th class="text-left">DETAIL</th>
            <th class="text-left">CREATED BY</th>
            <th class="text-left">DELETE</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, key) in $store.getters['data/getData']"
            v-bind:key="key"
          >
            <td><v-checkbox v-model="isDone" :value="key"></v-checkbox></td>
            <td>{{ key }}</td>
            <td>{{ value.title }}</td>
            <td>{{ value.detail }}</td>
            <td>{{ value.createdBy }}</td>
            <td>
              <v-icon left @click="deleteData(key)">
                {{ icons.mdiDelete }}
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </section>
</template>

<script>
import { mdiDelete } from '@mdi/js'

export default {
  data() {
    return {
      title: 'title',
      detail: 'detail',
      isDone: [],
      icons: {
        mdiDelete,
      },
    }
  },
  watch: {
    isDone: function (newValue, oldValue) {
      const newOne = newValue.filter((item) => oldValue.indexOf(item) == -1)
      if (newOne.length !== 0) {
        // console.log(newOne + 'が追加された')
        this.updateDataOnlyIsDone(newOne, true)
      }
      const oldOne = oldValue.filter((item) => newValue.indexOf(item) == -1)
      if (oldOne.length !== 0) {
        // console.log(oldOne + 'が削除された')
        this.updateDataOnlyIsDone(oldOne, false)
      }
    },
  },
  mounted: function () {
    this.$store.dispatch('data/registerOnValue')
  },
  methods: {
    createData: function () {
      this.$store.dispatch('data/createData', {
        title: this.title,
        detail: this.detail,
      })
    },
    readData: function (iid) {
      this.$store.dispatch('data/readData', iid)
    },
    updateData: function () {
      this.$store.dispatch('data/updataData')
    },
    updateDataOnlyIsDone: function (iid, isDone) {
      // 先にiidごと削除されてしまった場合の回避ようif文
      if (this.$store.dispatch('data/readData', iid).title !== undefined) {
        this.$store.dispatch('data/updateDataOnlyIsDone', {
          iid: iid,
          isDone: isDone,
        })
      }
    },
    deleteData: function (iid) {
      this.isDone = this.isDone.filter((item) => !item.match(iid))
      this.$store.dispatch('data/deleteData', iid)
    },
  },
}
</script>

<style scoped>
tbody tr td {
  /* text-decoration: line-through; */
}
</style>
