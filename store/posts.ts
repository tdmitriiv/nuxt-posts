import uniq from 'lodash/uniq'
import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'

interface Post {
  id: number
  title: string
  body: string
  userId: number
  comments?: Comment[]
  user?: User
}

interface Geo {
  /**
   * широта
   */
  lat: string

  /**
   * долгота
   */
  lng: string
}

interface UserAdress {
  /**
   * улица
   */
  street: string

  /**
   * номер квартиры
   */
  suite: string

  /**
   * город
   */
  city: string

  /**
   * почтовый код
   */
  zipcode: string

  /**
   * геопозиция
   */
  geo: Geo
}

interface UserCompany {
  /**
   * название компании
   */
  name: string
  /**
   * слоган
   */
  catchPhrase: string
  /**
   * сегмент
   */
  bs: string
}

interface User {
  id: number

  name: string

  username: string

  email: string

  address: UserAdress

  phone: string

  website: string

  company: UserCompany
}

interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

const loadUsers = (posts: Post[]): Promise<User[]> => {
  const userIDs = posts.map((post: Post) => post.userId)
  const userIdQuery = uniq(userIDs)
    .map((id: number) => `id=${id}`)
    .join('&')
  return $axios.$get(`users?${userIdQuery}`)
}

const loadComments = (posts: Post[]): Promise<Array<Comment[]>> => {
  const promises: Array<Promise<any>> = posts.map((post: Post) => {
    return $axios.$get(`comments?postId=${post.id}&_limit=2`)
  })

  return Promise.all(promises)
}

const mergePostData = (posts: Post[], users: User[], comments: Array<Comment[]>): Post[] => {
  return posts.map((post, index) => {
    const user = users.find((user: User) => user.id === post.userId)
    const postCommnets = Array.isArray(comments[index]) ? comments[index] : []
    return {
      ...post,
      ...(user ? { user } : {}),
      comments: postCommnets,
    }
  })
}

const preparePostsData = async (posts: Post[]): Promise<Post[]> => {
  const users = await loadUsers(posts)
  const comments = await loadComments(posts)

  return mergePostData(posts, users, comments)
}

@Module({ name: 'posts', namespaced: true, stateFactory: true })
export default class Posts extends VuexModule {
  public posts: Post[] = []

  public post: Post | null = null

  @Mutation SET_POSTS(posts: Post[]) {
    this.posts = posts
  }

  @Action
  public async fetchPosts(page: number, pageSize: number = 5): Promise<void> {
    const offset = (page - 1) * pageSize
    const posts = await $axios.$get(`posts?_start=${offset}&_limit=${pageSize}`)
    const preparedPosts = await preparePostsData(posts)
    this.SET_POSTS(preparedPosts)
  }
}
