import { HandballBelgiumApi } from '@/services/hb'
import { OpponentModel } from '@/types/models'

export const getHandballBelgiumClubs = async () => {
  const { data, status } = await HandballBelgiumApi.get(
    'club/byMyLeague?season_id=2&sort[0]=short_name&sort[1]=reference&sort[2]=order&club_status_id=1'
  )

  if (status !== 200) return []

  const clubs: OpponentModel[] = data.elements.map((e: any) => ({
    id: e.reference,
    name: e.name,
    short: e.short_name,
    logo: e.logo_img_url || null,
  }))

  return clubs
}
