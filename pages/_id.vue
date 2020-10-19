<template>
  <div>
    <v-skeleton-loader
      v-if="isPostLoading"
      class="mx-auto"
      type="article, list-item-three-line"
    />
    <v-card v-else>
      <v-card-title class="headline">
        {{ post.title }}
      </v-card-title>
      <v-card-text>
        {{ post.body }}

        <v-timeline align-top dense>
          <v-timeline-item
            v-for="(comment, commentKey) in post.comments"
            :key="commentKey"
            small
          >
            <div>
              <div class="font-weight-normal">
                <strong>{{ comment.email }}</strong>
              </div>
              <div>{{ comment.body }}</div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
      <v-card-actions>
        <v-chip small color="secondary" class="white--text">
          {{ post.user.name }}
        </v-chip>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PostModule } from '~/store'
import { Post } from '~/types/posts'

@Component
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
