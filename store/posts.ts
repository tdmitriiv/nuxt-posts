import { Module, VuexModule, Action } from 'vuex-module-decorators'

@Module({ name: 'posts', namespaced: true, stateFactory: true })
export default class Posts extends VuexModule {
  @Action
  public fetchPosts(): any[] {
    console.log('fetch posts action')
    return []
  }
}
