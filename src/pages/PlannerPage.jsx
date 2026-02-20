import React, { useMemo, useState } from 'react'
import { useProfile } from '../context/ProfileContext'
import { generateItinerary } from '../data/plannerLogic'
import styles from './PlannerPage.module.css'

export default function PlannerPage() {
  const { profile } = useProfile()
  const [regenerateKey, setRegenerateKey] = useState(0)

  const itinerary = useMemo(
    () => generateItinerary(profile, null),
    [profile, regenerateKey]
  )

  const handleRegenerate = () => {
    setRegenerateKey((k) => k + 1)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>맞춤 일정 플래너</h1>
        <p className={styles.sub}>{itinerary.destination} · {itinerary.totalDays}일</p>
        <div className={styles.meta}>
          <span className={styles.badge}>난이도: {itinerary.difficultyLabel}</span>
          <span className={styles.badge}>페이스: {itinerary.paceLabel}</span>
        </div>
      </header>

      <section className={styles.tipsSection}>
        <h2>이번 일정 팁</h2>
        <ul>
          {itinerary.tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className={styles.daysSection}>
        {itinerary.days.map((day) => (
          <article key={day.day} className={styles.dayCard}>
            <h3>{day.dateLabel}</h3>
            <ul className={styles.slots}>
              {day.slots.map((slot, i) => (
                <li key={i} className={styles.slot} dataType={slot.type}>
                  <span className={styles.slotTime}>{slot.time}</span>
                  <span className={styles.slotLabel}>{slot.label}</span>
                  {slot.note && <span className={styles.slotNote}>{slot.note}</span>}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <footer className={styles.footer}>
        <button type="button" className={styles.btnSecondary} onClick={handleRegenerate}>
          일정 다시 만들기
        </button>
        <p className={styles.hint}>프로필을 바꾸면 더 맞는 일정이 만들어져요.</p>
      </footer>
    </div>
  )
}
