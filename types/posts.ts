export interface Post {
  id: number
  title: string
  body: string
  userId: number
  comments?: Comment[]
  user?: User
}

export interface Geo {
  /**
   * широта
   */
  lat: string

  /**
   * долгота
   */
  lng: string
}

export interface UserAddress {
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

export interface UserCompany {
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

export interface User {
  id: number

  name: string

  username: string

  email: string

  address: UserAddress

  phone: string

  website: string

  company: UserCompany
}

export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}
