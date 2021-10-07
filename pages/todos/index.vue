<template>
  <section class="container">
    <h1>TODOS PAGE</h1>
    <v-btn color="success" @click="createData">CREATE</v-btn>
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
            v-for="(value, key) in $store.getters['getData']"
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
    this.$store.dispatch('registerOnValue')
  },
  methods: {
    createData: function () {
      this.$store.dispatch('createData', {
        title: this.title,
        detail: this.detail,
      })
    },
    readData: function () {
      this.$store.dispatch('readData')
    },
    updateData: function () {
      this.$store.dispatch('updataData')
    },
    deleteData: function (iid) {
      this.$store.dispatch('deleteData', iid)
    },
  },
}
</script>
