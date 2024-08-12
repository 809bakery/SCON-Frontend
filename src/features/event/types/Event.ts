export interface EventType {
  id: number
  title: string
  image: string
  detail: string
  startDate: string
  endDate: string
  status: string
  createdAt: string
  location: string
  subTitle: string
  reserveLimit: number
}

export interface RecommendEventType {
  id: number
  title: string
  image: string
  startDate: string
  endDate: string
  date: string
  ovenName: string
  location: string
}
