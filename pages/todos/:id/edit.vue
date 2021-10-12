<template>
  <section class="container">
    <h1>{{ title }}の編集ページ</h1>
    <v-card>
      <v-card-title class="subheading font-weight-bold">
        {{ title }}
      </v-card-title>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-content>ITEM ID</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ this.$route.params.id }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>タイトル</v-list-item-content>
          <v-list-item-content class="align-end">
            <v-text-field label="title" v-model="title"></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>詳細</v-list-item-content>
          <v-list-item-content class="align-end">
            <v-text-field label="title" v-model="detail"></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>ステータス</v-list-item-content>
          <v-list-item-content class="align-end">
            <v-checkbox v-model="isDone"></v-checkbox>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>作成日</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ createdAt }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>作成者</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ createdBy }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>コメント</v-list-item-content>
          <v-list-item-content class="align-end">
            <v-text-field label="title" v-model="comment"></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <v-row justify="end">
      <v-btn color="primary" class="btn" @click="sendData">決定</v-btn>
    </v-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      allData: null,
      key: '',
      title: '',
      detail: '',
      isDone: false,
      comment: '',
      createdAt: '',
      createdBy: '',
    }
  },
  mounted: function () {
    this.readData()
    const allData = this.$store.getters['data/getData']

    this.key = this.$route.params.id
    const data = allData[this.key]
    this.title = data.title
    this.detail = data.detail
    this.isDone = data.isDone
    this.comment = data.comment
    this.createdAt = data.createdAt
    this.createdBy = data.createdBy
  },
  methods: {
    sendData: function () {
      this.updateData(this.$route.params.id, 'title', this.title)
      this.updateData(this.$route.params.id, 'detail', this.detail)
      this.updateData(this.$route.params.id, 'isDone', this.isDone)
      this.updateData(this.$route.params.id, 'comment', this.comment)
      this.$router.push('/todos/' + this.$route.params.id)
    },
    readData: function () {
      this.$store.dispatch('data/readData')
    },
    updateData: function (iid, key, value) {
      this.$store.dispatch('data/updateData', {
        iid: iid,
        key: key,
        value: value,
      })
      this.allData = this.$store.getters['data/getData']
    },
  },
}
</script>

<style scoped>
.btn {
  margin-top: 30px;
}
</style>
