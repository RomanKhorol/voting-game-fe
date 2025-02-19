export interface votesType {
  _id: string
  value: number
  label: string
}

export interface JokeType {
  _id: string
  question: string
  answer: string
  votes: votesType[]
  availableVotes?: string[]
}
