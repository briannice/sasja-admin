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
    // patch 6 SHL Dutch teams in
    .concat(dutchClubs)

  return clubs
}

const dutchClubs =
  [{
    id: 8881,
    name: 'Green Park Aalsmeer',
    short: 'Aalsmeer',
    logo: '/clubs/aalsmeer.png',
  }, {
    id: 8882,
    name: 'Herpertz Bevo',
    short: 'Bevo',
    logo: '/clubs/bevo.png',
  }, {
    id: 8883,
    name: 'Handbal Houten',
    short: 'Houten',
    logo: '/clubs/houten.png',
  }, {
    id: 8884,
    name: 'Hurry-up',
    short: 'Hurry-up',
    logo: '/clubs/hurry-up.png',
  }, {
    id: 8885,
    name: 'Kembit Lions Sittardia',
    short: 'Lions',
    logo: '/clubs/lions.png',
  }, {
    id: 8886,
    name: 'Kras Volendam',
    short: 'Volendam',
    logo: '/clubs/volendam.png',
  }]
