<template>
  <section class="container">
    <h1>TODOS PAGE</h1>
    <v-row justify="end">
      <p>{{ this.$store.getters['getAuth'].uid }}</p>
      <v-btn v-show="this.$store.getters['getAuth'].uid" @click="logout"
        >LOGOUT</v-btn
      >
      <v-btn v-show="!this.$store.getters['getAuth'].uid" to="/login"
        >LOGIN</v-btn
      >
    </v-row>
    <v-text-field label="title" id="id" v-model="title"></v-text-field>
    <v-text-field label="detail" id="id" v-model="detail"></v-text-field>
    <v-btn color="success" @click="createData">CREATE</v-btn>
    <v-simple-table dence>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">DONE</th>
            <th class="text-left">ITEM ID</th>
            <th class="text-left">TITLE</th>
            <th class="text-left">DETAIL</th>
            <!-- <th class="text-left">CREATED AT</th> -->
            <th class="text-left">CREATED BY</th>
            <!-- <th class="text-left">COMMENT</th> -->
            <th class="text-left">DELETE</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(attr, iid) in allData"
            v-bind:key="iid"
            v-bind:class="{ done: attr.isDone }"
            @click="selectItem(iid)"
          >
            <td>
              <v-checkbox
                v-bind:checked="attr.isDone"
                @click.stop="updateData(iid, 'isDone', !attr.isDone)"
              ></v-checkbox>
              <p>{{ attr.isDone }}</p>
            </td>
            <td>{{ iid }}</td>
            <td>{{ attr.title }}</td>
            <td>{{ attr.detail }}</td>
            <!-- <td>{{ prop.createdAt }}</td> -->
            <td>{{ attr.createdBy }}</td>
            <!-- <td>{{ prop.comment }}</td> -->
            <td>
              <v-icon left @click.stop="deleteData(iid)">
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
      title: '',
      detail: '',
      allData: null,
      icons: {
        mdiDelete,
      },
    }
  },
  mounted: function () {
    console.log(this.$store.getters['getAuth'].uid)

    this.$store.dispatch('data/registerOnValue')

    this.readData()
    const tmpData = this.$store.getters['data/getData']
    this.allData = { ...tmpData }
  },
  methods: {
    sleep: (waitTime) =>
      -new Promise((resolve) => setTimeout(resolve, waitTime)),
    logout: function () {
      this.$store.dispatch('logout')
      alert('ログアウトしました')
    },
    selectItem: function (iid) {
      this.$router.push('/todos/' + iid)
    },
    createData: function () {
      this.$store.dispatch('data/createData', {
        title: this.title,
        detail: this.detail,
      })
      this.title = ''
      this.detail = ''
      const tmpData = this.$store.getters['data/getData']
      this.allData = { ...tmpData }
    },
    readData: function () {
      this.$store.dispatch('data/readData')
    },
    updateData: function (iid, key, value) {
      console.log(value)
      this.allData.isDone = !value
      this.$store.dispatch('data/updateData', {
        iid,
        key,
        value,
      })
      this.allData = this.$store.getters['data/getData']
      // const tmpData = this.$store.getters['data/getData']
      // this.allData = { ...tmpData }
    },
    deleteData: function (iid) {
      this.$store.dispatch('data/deleteData', iid)
      console.log('test')
      const tmpData = this.$store.getters['data/getData']
      this.allData = { ...tmpData }
    },
  },
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
