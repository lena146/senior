import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProfile } from '../context/ProfileContext'
import { CURATION_BY_DESTINATION } from '../data/curationData'
import {
  IconAccommodation,
  IconTransport,
  IconAttraction,
  IconFood,
} from '../components/Icons'
import styles from './CurationPage.module.css'

const CATEGORIES = [
  { key: 'accommodation', label: '숙소', Icon: IconAccommodation },
  { key: 'transport', label: '교통', Icon: IconTransport },
  { key: 'attraction', label: '관광지', Icon: IconAttraction },
  { key: 'food', label: '음식', Icon: IconFood },
]

export default function CurationPage() {
  const { profile } = useProfile()
  const [activeCategory, setActiveCategory] = useState('accommodation')

  const destination = profile.destination || '제주도'
  const data = useMemo(
    () => CURATION_BY_DESTINATION[destination] || CURATION_BY_DESTINATION['제주도'],
    [destination]
  )

  const top3Summary = useMemo(() => ({
    accommodation: data.accommodation.slice(0, 3),
    transport: data.transport.slice(0, 3),
    attraction: data.attraction.slice(0, 3),
    food: data.food.slice(0, 3),
  }), [data])

  const currentList = data[activeCategory] || []
  const CurrentIcon = CATEGORIES.find((c) => c.key === activeCategory)?.Icon

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>여행 정보 큐레이션</h1>
        <p className={styles.destination}>{destination}</p>
        <p className={styles.summary}>{data.summary}</p>
      </header>

      <section className={styles.top3Section}>
        <h2>Top 3 요약</h2>
        <p className={styles.top3Desc}>비교와 결정을 위해 각 카테고리 상위 3곳을 정리했어요.</p>
        <div className={styles.top3Grid}>
          {CATEGORIES.map(({ key, label, Icon }) => (
            <div key={key} className={styles.top3Card}>
              <span className={styles.top3Icon}>
                <Icon />
              </span>
              <span className={styles.top3Label}>{label}</span>
              <ul className={styles.top3List}>
                {(top3Summary[key] || []).slice(0, 3).map((item, i) => (
                  <li key={item.id || i}>
                    {item.name || item.type}
                    {item.note && <span className={styles.top3Note}> · {item.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.categorySection}>
        <h2>카테고리별 상세</h2>
        <div className={styles.tabs}>
          {CATEGORIES.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              className={styles.tab}
              dataActive={activeCategory === key}
              onClick={() => setActiveCategory(key)}
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className={styles.listSection}>
          {currentList.map((item, i) => (
            <article key={item.id || i} className={styles.card}>
              <div className={styles.cardHeader}>
                {CurrentIcon && (
                  <span className={styles.cardIcon}>
                    <CurrentIcon />
                  </span>
                )}
                <div>
                  <h3 className={styles.cardTitle}>{item.name}</h3>
                  {item.type && <span className={styles.cardType}>{item.type}</span>}
                  {item.score && <span className={styles.cardScore}>★ {item.score}</span>}
                  {item.source && <span className={styles.cardSource}>{item.source}</span>}
                </div>
              </div>
              {item.note && <p className={styles.cardNote}>{item.note}</p>}
              {item.price && <p className={styles.cardPrice}>{item.price}</p>}
              {item.tip && <p className={styles.cardTip}>💡 {item.tip}</p>}
              {item.level && <span className={styles.cardLevel}>난이도: {item.level}</span>}
              {item.tags && (
                <div className={styles.cardTags}>
                  {item.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <Link to="/planner" className={styles.btnPrimary}>
          이 정보로 일정 만들기
        </Link>
      </footer>
    </div>
  )
}
