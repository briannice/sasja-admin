export type OpponentModel = {
  id: number
  name: string
  short: string
  logo: string | null
}

export type ScoreModel = {
  sasja: number
  opponent: number
}

export type TeamModel = {
  id: string
  name: string
}
