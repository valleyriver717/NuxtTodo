<template>
  <section class="container">
    <h1>{{ title }}のページ</h1>
    <v-card>
      <v-card-title class="subheading font-weight-bold">
        {{ title }}
      </v-card-title>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-content>タイトル</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ title }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>詳細</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ detail }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>ステータス</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ isDone ? '完了' : '未完了' }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>コメント</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ comment }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <v-text-field label="comment" v-model="newComment"></v-text-field>
    <v-btn color="normal" @click="addComment">ADD COMMENT</v-btn>
    <v-row justify="end">
      <v-btn color="success">編集</v-btn>
    </v-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      key: '',
      title: '',
      detail: '',
      isDone: false,
      comment: '',
      newComment: '',
    }
  },
  mounted: function () {
    const allData = this.$store.getters['data/getData']
    this.key = this.$route.params.id
    const data = allData[this.key]
    this.title = data.title
    this.detail = data.detail
    this.isDone = data.isDone
    this.comment = data.comment
    console.log(this.comment)
  },
  methods: {
    addComment: function () {
      this.comment = this.newComment
      this.updateData(this.key, 'comment', this.comment)
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
