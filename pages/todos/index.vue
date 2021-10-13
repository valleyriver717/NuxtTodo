<template>
  <section class="container">
    <h1>みんなのTODOリスト</h1>
    <p v-show="this.$store.getters['getAuth'].uid">
      こんにちは、{{ this.$store.getters['getAuth'].name }}さん！
    </p>
    <v-row justify="end" class="btn">
      <v-btn v-show="this.$store.getters['getAuth'].uid" @click="logout"
        >LOGOUT</v-btn
      >
      <v-btn v-show="!this.$store.getters['getAuth'].uid" to="/login"
        >LOGIN</v-btn
      >
    </v-row>
    <div v-show="this.$store.getters['getAuth'].uid">
      <v-text-field label="title" id="id" v-model="title"></v-text-field>
      <v-text-field label="detail" id="id" v-model="detail"></v-text-field>
      <v-btn color="success" @click="createData" class="btn">CREATE</v-btn>
    </div>
    <v-simple-table dence>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" v-show="$store.getters['getAuth'].uid">
              DONE
            </th>
            <!-- <th class="text-left">ITEM ID</th> -->
            <th class="text-left">TITLE</th>
            <th class="text-left">DETAIL</th>
            <!-- <th class="text-left">CREATED AT</th> -->
            <th class="text-left">CREATED BY</th>
            <!-- <th class="text-left">COMMENT</th> -->
            <th class="text-left" v-show="$store.getters['getAuth'].uid">
              DELETE
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(attr, iid) in allData"
            v-bind:key="iid"
            v-bind:class="{ done: attr.isDone }"
            @click="selectItem(iid)"
          >
            <td v-show="$store.getters['getAuth'].uid">
              <v-checkbox
                v-bind:disabled="
                  $store.getters['getAuth'].name !== attr.createdBy
                "
                v-bind:input-value="attr.isDone"
                @click.stop="updateData(iid, 'isDone', !attr.isDone)"
              ></v-checkbox>
            </td>
            <!-- <td>{{ iid }}</td> -->
            <td>{{ attr.title }}</td>
            <td>{{ attr.detail }}</td>
            <!-- <td>{{ attr.createdAt }}</td> -->
            <td>{{ attr.createdBy }}</td>
            <!-- <td>{{ attr.comment }}</td> -->
            <td v-show="$store.getters['getAuth'].uid">
              <v-icon
                left
                @click.stop="deleteData(iid)"
                v-bind:disabled="
                  $store.getters['getAuth'].name !== attr.createdBy
                "
              >
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
    this.$store.dispatch('data/registerOnValue')

    this.readData()
    this.allData = this.$store.getters['data/getData']
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      alert('ログアウトしました')
    },
    selectItem: function (iid) {
      this.$router.push('/todos/' + iid + '/')
    },
    createData: function () {
      this.$store.dispatch('data/createData', {
        title: this.title,
        detail: this.detail,
      })
      this.title = ''
      this.detail = ''
      this.allData = this.$store.getters['data/getData']
    },
    readData: function () {
      this.$store.dispatch('data/readData')
    },
    updateData: function (iid, key, value) {
      this.allData.isDone = !value
      this.$store.dispatch('data/updateData', {
        iid: iid,
        key: key,
        value: value,
      })
      this.allData = this.$store.getters['data/getData']
    },
    deleteData: function (iid) {
      this.$store.dispatch('data/deleteData', iid)
      this.allData = this.$store.getters['data/getData']
    },
  },
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
}

.btn {
  margin-bottom: 30px;
}
</style>
