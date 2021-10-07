<template>
  <section class="container">
    <h1>TODOS PAGE</h1>
    <v-btn color="success" @click="createData">CREATE</v-btn>
    <p>{{ this.$store.getters['getAuth'].uid }}</p>
    <v-simple-table dence>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">USER ID</th>
            <th class="text-left">ITEM ID</th>
            <th class="text-left">TITLE</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, key) in $store.getters['data/getData']"
            v-bind:key="key"
          >
            <td>uid</td>
            <td @click="deleteData(key)">{{ key }}</td>
            <td>{{ value.title }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: 'title',
      detail: 'detail',
    }
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
    readData: function () {
      this.$store.dispatch('data/readData')
    },
    updateData: function () {
      this.$store.dispatch('data/updataData')
    },
    deleteData: function (iid) {
      this.$store.dispatch('data/deleteData', iid)
    },
  },
}
</script>
