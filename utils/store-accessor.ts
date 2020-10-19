import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import postModule from '~/store/posts'

let PostModule: postModule

function initializeStores(store: Store<any>): void {
  PostModule = getModule(postModule, store)
}

export { initializeStores, PostModule }
