import uniq from 'lodash/uniq'
import { Comment, Post, User } from '~/types/posts'
import { $axios } from '~/utils/api'

export const DEFAULT_PAGE_SIZE = 5

const loadUsers = (posts: Post[]): Promise<User[]> => {
  /* TODO можно пользователя хранить и брать из state, при переходе из ленты */
  const userIDs = posts.map((post: Post) => post.userId)
  const userIdQuery = uniq(userIDs)
    .map((id: number) => `id=${id}`)
    .join('&')
  return $axios.$get(`users?${userIdQuery}`)
}

const loadComments = (
  posts: Post[],
  count?: number
): Promise<Array<Comment[]>> => {
  const promises: Array<Promise<any>> = posts.map((post: Post) => {
    const limit = count ? `&_limit=${count}` : ''
    return $axios.$get(`comments?postId=${post.id}${limit}`)
  })

  return Promise.all(promises)
}

const mergePostData = (
  posts: Post[],
  users: User[],
  comments: Array<Comment[]>
): Post[] => {
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

export const preparePostsData = async (
  posts: Post[],
  commentCount?: number
): Promise<Post[]> => {
  const users = await loadUsers(posts)
  const comments = await loadComments(posts, commentCount)

  return mergePostData(posts, users, comments)
}
