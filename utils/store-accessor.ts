import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import postModule from '~/store/posts'

let Post: postModule

function initializeStores(store: Store<any>): void {
  Post = getModule(postModule, store)
}

export { initializeStores, Post }
