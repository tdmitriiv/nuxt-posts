import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'
import { Post } from '~/types/posts'
import { DEFAULT_PAGE_SIZE, preparePostsData } from '~/utils/posts'

@Module({ name: 'posts', namespaced: true, stateFactory: true })
export default class Posts extends VuexModule {
  public posts: Post[] = []

  public post: Post | null = null

  public total: number = 0

  @Mutation
  private SET_POSTS(posts: Post[]) {
    this.posts = posts
  }

  @Mutation
  private SET_TOTAL(count: number) {
    this.total = count
  }

  @Mutation
  private SET_POST(post: Post) {
    this.post = post
  }

  @Action
  public async fetchTotal(): Promise<void> {
    const posts = await $axios.$get('posts')
    this.SET_TOTAL(posts.length)
  }

  @Action
  public async fetchPosts(
    page: number,
    pageSize: number = DEFAULT_PAGE_SIZE
  ): Promise<void> {
    const offset = (page - 1) * pageSize
    const posts = await $axios.$get(`posts?_start=${offset}&_limit=${pageSize}`)
    const preparedPosts = await preparePostsData(posts, 2)
    this.SET_POSTS(preparedPosts)
  }

  @Action
  public async fetchSinglePost(id: number): Promise<void> {
    const post = await $axios.$get(`posts/${id}`)
    const preparedPosts = await preparePostsData([post])
    this.SET_POST(preparedPosts[0])
  }
}
