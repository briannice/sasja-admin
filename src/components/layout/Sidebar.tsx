import Link from '@/components/Link'
import { auth } from '@/services/firebase'
import clsx from 'clsx'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import React from 'react'
import {
  RiArrowLeftRightLine,
  RiCalendarLine,
  RiDashboardLine,
  RiGameLine,
  RiGamepadLine,
  RiGlobalLine,
  RiLogoutCircleRLine,
  RiNewspaperLine,
  RiRunLine,
  RiShieldUserLine,
  RiTeamLine,
} from 'react-icons/ri'

const links = [
  { name: 'Dashboard', url: '/dashboard', icon: RiDashboardLine },
  { name: 'Evenementen', url: '/evenementen', icon: RiCalendarLine },
  { name: 'Matchverslagen', url: '/matchverslagen', icon: RiGameLine },
  { name: 'Nieuws', url: '/nieuws', icon: RiNewspaperLine },
  { name: 'Teams', url: '/teams', icon: RiTeamLine },
  { name: 'Spelers', url: '/spelers', icon: RiRunLine },
  { name: 'Wedstrijden', url: '/wedstrijden', icon: RiGamepadLine },
  { name: 'Medewerkers', url: '/medewerkers', icon: RiShieldUserLine },
  { name: 'Tegenstanders', url: '/medewerkers', icon: RiArrowLeftRightLine },
]

export default function Sidebar() {
  const router = useRouter()

  return (
    <aside className="flex flex-col rounded-lg bg-white p-8 shadow">
      <nav>
        <ul className="flex flex-col space-y-2">
          {links.map((link) => {
            const isSelected = router.asPath.startsWith(link.url)
            return (
              <li key={link.name} className="group">
                <Link
                  href={link.url}
                  className={clsx(
                    'flex items-center space-x-4 rounded-lg border-2 px-4 py-2',
                    isSelected
                      ? 'border-primary bg-primary'
                      : 'border-white group-hover:border-primary'
                  )}
                >
                  <link.icon
                    className={clsx('h-6 w-6', isSelected ? 'text-white' : 'text-primary')}
                  />
                  <span className={clsx('font-kanit', isSelected ? 'text-white' : 'text-dark')}>
                    {link.name}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="mt-auto flex flex-col space-y-4">
        <Link href="/website" className="btn btn-text-icon btn-primary">
          <span>Website</span>
          <RiGlobalLine />
        </Link>
        <button onClick={() => signOut(auth)} className="btn btn-text-icon btn-primary">
          <span>Uitloggen</span>
          <RiLogoutCircleRLine />
        </button>
      </div>
    </aside>
  )
}
