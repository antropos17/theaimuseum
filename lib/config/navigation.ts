export type NavItem = {
  label: string
  href: string
}

/** Primary nav items shown in desktop header */
export const mainNavItems: NavItem[] = [
  { label: 'Explore', href: '/explore' },
  { label: 'Evolution', href: '/evolution' },
  { label: 'Battles', href: '/battles' },
  { label: 'Simulator', href: '/simulator' },
  { label: 'Quiz', href: '/quiz' },
  { label: 'Passport', href: '/passport' },
]

/** Secondary nav items shown in mobile menu */
export const secondaryNavItems: NavItem[] = [
  { label: 'Graveyard', href: '/graveyard' },
  { label: 'Memes', href: '/memes' },
  { label: 'Victims', href: '/victims' },
  { label: 'Predictions', href: '/predictions' },
  { label: 'Leaderboard', href: '/leaderboard' },
]
