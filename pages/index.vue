<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <post-card
        v-for="(post, key) in posts"
        :key="key"
        :post="post"
        class="mb-8"
      >
        <template v-slot:actions>
          <v-btn color="primary" nuxt :to="`/${post.id}`">View</v-btn>
        </template>
      </post-card>
      <v-pagination
        v-model="page"
        :length="pageCount"
        circle
        :total-visible="5"
        @input="onChangePage"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Post } from '~/types/posts'
import { DEFAULT_PAGE_SIZE } from '~/utils/posts'
import { PostModule } from '~/store'
import PostCard from '~/components/PostCard.vue'

@Component({
  components: {
    PostCard,
  },
})
export default class Feed extends Vue {
  page: number = 1

  pageSize: number = DEFAULT_PAGE_SIZE

  get posts(): Post[] {
    return PostModule.posts
  }

  get postsTotal(): number {
    return PostModule.total
  }

  get pageCount(): number {
    return Math.round(this.postsTotal / this.pageSize)
  }

  scrollTop(): void {
    window.scrollTo(0, 0)
  }

  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch()
    }
  }

  async fetch() {
    await PostModule.fetchTotal()
    if (this.$route.query.page) {
      this.page = parseInt(this.$route.query.page.toString(), 10)
    }
    await PostModule.fetchPosts(this.page)
  }

  onChangePage(value: number) {
    PostModule.fetchPosts(value)
    this.$router.replace({ path: '/', query: { page: value.toString() } })
    this.scrollTop()
  }
}
</script>
