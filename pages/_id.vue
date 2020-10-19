<template>
  <div>
    <v-skeleton-loader
      v-if="isPostLoading"
      class="mx-auto"
      type="article, list-item-three-line"
    />
    <post-card
      v-else
      :post="post"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PostModule } from '~/store'
import { Post } from '~/types/posts'
import PostCard from '~/components/PostCard.vue'

@Component({
  components: {
    PostCard,
  },
})
export default class ViewPost extends Vue {
  get post(): Post | null {
    return PostModule.post
  }

  get isPostLoading() {
    return this.$fetchState.pending || !this.post
  }

  async fetch() {
    const postId = parseInt(this.$route.params.id, 10)
    await PostModule.fetchSinglePost(postId)
  }
}
</script>

<style scoped>

</style>
