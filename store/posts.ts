import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

@Module({ name: 'posts', namespaced: true, stateFactory: true })
export default class Posts extends VuexModule {
  public posts: Post[] = []

  @Action
  public async fetchPosts(): Promise<Post[]> {
    const data = await $axios.$get('posts?_start=10&_limit=5')
    console.log(data)
    return []
  }
}
