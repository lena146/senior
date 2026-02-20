import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Layout.module.css'

const NAV_ITEMS = [
  { to: '/', label: '홈', icon: '🏠' },
  { to: '/survey', label: '프로필', icon: '📋' },
  { to: '/curation', label: '여행정보', icon: '✈️' },
  { to: '/planner', label: '일정', icon: '📅' },
]

export default function Layout({ children }) {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>{children}</main>
      <nav className={styles.nav} aria-label="메인 메뉴">
        {NAV_ITEMS.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [styles.navItem, isActive ? styles.navItemActive : ''].filter(Boolean).join(' ')
            }
            end={to === '/'}
          >
            <span className={styles.navIcon}>{icon}</span>
            <span className={styles.navLabel}>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
