<template>
  <v-card v-if="post">
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
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Post } from '~/types/posts'

@Component
export default class PostCard extends Vue {
  @Prop()
  readonly post!: Post
}
</script>

<style scoped>

</style>
