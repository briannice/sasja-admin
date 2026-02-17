import type { NextApiRequest, NextApiResponse } from 'next'

const apiToken = process.env.HANDBALL_BELGIUM_API_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!apiToken) {
    return res.status(500).json({ error: 'No HB API token' })
  }

  const response = await fetch(
    'https://admin.handballbelgium.be/lms_league_ws/public/api/v1/club/byMyLeague?season_id=2&sort[0]=short_name&sort[1]=reference&sort[2]=order&club_status_id=1',
    {
      headers: { authorization: apiToken },
      signal: AbortSignal.timeout(10000),
    }
  )

  if (!response.ok) {
    return res.status(response.status).json({ error: 'Failed to fetch clubs' })
  }

  const data = await response.json()
  res.status(200).json(data)
}
