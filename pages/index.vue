<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card v-for="(post, key) in posts" :key="key" class="mb-8">
        <v-card-title class="headline">
          {{ post.title }}
        </v-card-title>
        <v-card-text>
          {{ post.body }}

          <v-timeline
            align-top
            dense
          >
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
          <v-btn color="primary" nuxt to="/inspire"> View </v-btn>
        </v-card-actions>
      </v-card>
      <v-pagination
        v-model="page"
        :length="pageCount"
        circle
        @input="onChangePage"
      ></v-pagination>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import { Post } from '~/types/posts'
import { DEFAULT_PAGE_SIZE } from '~/utils/posts'

const posts = namespace('posts')

@Component({
  components: {
    Logo,
    VuetifyLogo,
  },
})
export default class Feed extends Vue {
  page: number = 1

  pageSize: number = DEFAULT_PAGE_SIZE

  @posts.State
  public posts!: Post[]

  @posts.State
  public total!: number

  @posts.Action
  public fetchPosts!: (page: number) => Promise<void>

  @posts.Action
  public fetchTotal!: () => Promise<void>

  get pageCount() {
    return Math.round(this.total / this.pageSize)
  }

  scrollTop(): void {
    window.scrollTo(0, 0)
  }

  async fetch() {
    await this.fetchTotal()
    if (this.$route.query.page) {
      this.page = parseInt(this.$route.query.page.toString(), 10)
    }
    await this.fetchPosts(this.page)
  }

  onChangePage(value: number) {
    this.fetchPosts(value)
    this.$router.replace({ path: '/', query: { page: value.toString() } })
    this.scrollTop()
  }
}
</script>
