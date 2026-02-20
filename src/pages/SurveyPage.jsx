import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../context/ProfileContext'
import {
  IconExerciseLow,
  IconExerciseMid,
  IconExerciseHigh,
  IconRestLow,
  IconRestMid,
  IconRestHigh,
  IconActivity,
  IconRelax,
  IconCulture,
  IconHeart,
  IconJoint,
  IconSleep,
  IconEye,
  IconNone,
} from '../components/Icons'
import styles from './SurveyPage.module.css'

const EXERCISE_OPTIONS = [
  { value: 1, label: '거의 안 함', Icon: IconExerciseLow },
  { value: 2, label: '가벼운 산책', Icon: IconExerciseMid },
  { value: 3, label: '규칙적 운동', Icon: IconExerciseHigh },
]

const REST_OPTIONS = [
  { value: 1, label: '휴식 적게 필요', Icon: IconRestLow },
  { value: 2, label: '적당히 필요', Icon: IconRestMid },
  { value: 3, label: '휴식 많이 필요', Icon: IconRestHigh },
]

const TRAVEL_STYLE_OPTIONS = [
  { value: 'activity', label: '활동적인', Icon: IconActivity },
  { value: 'relax', label: '휴양·휴식', Icon: IconRelax },
  { value: 'culture', label: '문화·역사', Icon: IconCulture },
]

const CONDITION_OPTIONS = [
  { value: 'heart', label: '심혈관', Icon: IconHeart },
  { value: 'joint', label: '관절', Icon: IconJoint },
  { value: 'sleep', label: '수면/피로', Icon: IconSleep },
  { value: 'eye', label: '눈/피로', Icon: IconEye },
  { value: 'none', label: '해당 없음', Icon: IconNone },
]

const DESTINATIONS = ['제주도', '부산·경남', '강릉·동해', '전주·전북', '경주', '기타']

const DURATIONS = [
  { value: 1, label: '1박 2일' },
  { value: 2, label: '2박 3일' },
  { value: 3, label: '3박 4일' },
  { value: 4, label: '4박 5일 이상' },
]

export default function SurveyPage() {
  const navigate = useNavigate()
  const { profile, updateProfile } = useProfile()
  const [step, setStep] = useState(1)

  const toggleTravelStyle = (value) => {
    const next = profile.travelStyle.includes(value)
      ? profile.travelStyle.filter((v) => v !== value)
      : [...profile.travelStyle, value]
    updateProfile({ travelStyle: next })
  }

  const toggleCondition = (value) => {
    if (value === 'none') {
      updateProfile({ conditions: [] })
      return
    }
    const next = profile.conditions.includes(value)
      ? profile.conditions.filter((v) => v !== value)
      : [...profile.conditions.filter((v) => v !== 'none'), value]
    updateProfile({ conditions: next })
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
    else navigate('/curation')
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>나의 여행 프로필</h1>
        <p>건강과 성향에 맞는 맞춤 일정을 만들어 드려요</p>
        <div className={styles.progress}>
          <div className={styles.progressBar} style={{ width: `${(step / 4) * 100}%` }} />
        </div>
        <span className={styles.stepLabel}>{step} / 4</span>
      </header>

      <main className={styles.main}>
        {step === 1 && (
          <section className={styles.section}>
            <h2>평소 운동량은 어느 정도인가요?</h2>
            <div className={styles.iconGrid}>
              {EXERCISE_OPTIONS.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  className={styles.iconCard}
                  dataSelected={profile.exerciseLevel === value}
                  onClick={() => updateProfile({ exerciseLevel: value })}
                >
                  <span className={styles.iconWrap}>
                    <Icon />
                  </span>
                  <span className={styles.iconLabel}>{label}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 2 && (
          <>
            <section className={styles.section}>
              <h2>여행 중 휴식이 얼마나 필요하신가요?</h2>
              <div className={styles.iconGrid}>
                {REST_OPTIONS.map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    className={styles.iconCard}
                    dataSelected={profile.restNeed === value}
                    onClick={() => updateProfile({ restNeed: value })}
                  >
                    <span className={styles.iconWrap}>
                      <Icon />
                    </span>
                    <span className={styles.iconLabel}>{label}</span>
                  </button>
                ))}
              </div>
            </section>
            <section className={styles.section}>
              <h2>걱정되는 건강 이슈가 있다면 선택해 주세요 (복수 선택 가능)</h2>
              <div className={styles.iconGrid}>
                {CONDITION_OPTIONS.map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    className={styles.iconCard}
                    dataSelected={profile.conditions.includes(value)}
                    onClick={() => toggleCondition(value)}
                  >
                    <span className={styles.iconWrap}>
                      <Icon />
                    </span>
                    <span className={styles.iconLabel}>{label}</span>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {step === 3 && (
          <section className={styles.section}>
            <h2>선호하는 여행 스타일을 골라 주세요 (복수 선택 가능)</h2>
            <div className={styles.iconGrid}>
              {TRAVEL_STYLE_OPTIONS.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  className={styles.iconCard}
                  dataSelected={profile.travelStyle.includes(value)}
                  onClick={() => toggleTravelStyle(value)}
                >
                  <span className={styles.iconWrap}>
                    <Icon />
                  </span>
                  <span className={styles.iconLabel}>{label}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 4 && (
          <>
            <section className={styles.section}>
              <h2>가고 싶은 여행지는?</h2>
              <div className={styles.chipGrid}>
                {DESTINATIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={styles.chip}
                    dataSelected={profile.destination === d}
                    onClick={() => updateProfile({ destination: d })}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </section>
            <section className={styles.section}>
              <h2>예상 여행 기간</h2>
              <div className={styles.chipGrid}>
                {DURATIONS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    className={styles.chip}
                    dataSelected={profile.duration === value}
                    onClick={() => updateProfile({ duration: value })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        {step > 1 && (
          <button type="button" className={styles.btnSecondary} onClick={handlePrev}>
            이전
          </button>
        )}
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={handleNext}
        >
          {step === 4 ? '여행 정보 보기' : '다음'}
        </button>
      </footer>
    </div>
  )
}
