<template>
  <section class="container">
    <h1>TODOS PAGE</h1>
    <v-btn color="success" @click="createData">CREATE</v-btn>
    <v-btn color="success" @click="readData">READ</v-btn>
    <v-btn color="success" @click="updateData">UPDATE</v-btn>
    <v-btn color="success" @click="deleteData">DELETE</v-btn>
    <p>{{ $store.getters['getAuth'] }}</p>
    <v-text-field label="タイトル" v-model="title"></v-text-field>
    <v-text-field label="詳細" v-model="detail"></v-text-field>
    <ul>
      <li
        v-for="(value, key) in $store.getters['getData']"
        v-bind:key="key"
        @click="deleteData(key)"
      >
        {{ value.title }} {{ value.detail }} {{ key }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      detail: '',
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
