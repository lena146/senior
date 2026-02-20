import React from 'react'
import { Link } from 'react-router-dom'
import { useProfile } from '../context/ProfileContext'
import styles from './HomePage.module.css'

export default function HomePage() {
  const { profile } = useProfile()
  const hasProfile = profile.destination && profile.duration != null

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1>시니어 여행 플래너</h1>
        <p>건강과 성향에 맞는 여행 정보와 일정을 추천해 드려요</p>
      </header>

      <nav className={styles.cards}>
        <Link to="/survey" className={styles.card}>
          <span className={styles.cardIcon}>📋</span>
          <h2>나의 프로필</h2>
          <p>건강 상태, 여행 성향, 선호 지역·기간을 선택하세요</p>
          {hasProfile && <span className={styles.badge}>설정됨</span>}
        </Link>

        <Link to="/curation" className={styles.card}>
          <span className={styles.cardIcon}>✈️</span>
          <h2>여행 정보</h2>
          <p>숙소·교통·관광·맛집 Top 3와 상세 큐레이션</p>
        </Link>

        <Link to="/planner" className={styles.card}>
          <span className={styles.cardIcon}>📅</span>
          <h2>맞춤 일정</h2>
          <p>프로필에 맞춘 일정 자동 생성·재생성</p>
        </Link>
      </nav>

      <footer className={styles.footer}>
        <p>먼저 ‘나의 프로필’을 입력한 뒤, 여행 정보를 보고 일정을 만들어 보세요.</p>
      </footer>
    </div>
  )
}
