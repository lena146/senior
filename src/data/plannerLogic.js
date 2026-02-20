// 건강·성향에 맞춘 일정 자동 생성 및 난이도 조정

const STYLE_LABELS = { activity: '활동', relax: '휴양', culture: '문화' }

function getDifficulty(profile) {
  const { exerciseLevel = 2, restNeed = 2, conditions = [] } = profile
  let score = 3 // 기본 보통
  if (exerciseLevel === 1) score -= 1
  if (exerciseLevel === 3) score += 1
  if (restNeed === 3) score -= 1
  if (restNeed === 1) score += 1
  if (conditions.length > 0) score -= 1
  return Math.max(1, Math.min(5, score))
}

function getPace(profile) {
  const difficulty = getDifficulty(profile)
  if (difficulty <= 2) return { activitiesPerDay: 2, restSlots: 2, label: '여유' }
  if (difficulty >= 4) return { activitiesPerDay: 4, restSlots: 1, label: '활발' }
  return { activitiesPerDay: 3, restSlots: 1, label: '보통' }
}

function buildDayPlan(dayIndex, totalDays, profile) {
  const pace = getPace(profile)
  const styles = profile.travelStyle?.length ? profile.travelStyle : ['relax']
  const isFirst = dayIndex === 0
  const isLast = dayIndex === totalDays - 1

  const slots = []

  if (isFirst) {
    slots.push({ type: 'move', label: '출발·이동', time: '오전', note: '편한 복장, 필요시 중간 휴식' })
    slots.push({ type: 'rest', label: '숙소 도착·휴식', time: '점심 전후', note: '짐 풀고 잠깐 쉬기' })
  }

  if (styles.includes('culture')) {
    slots.push({ type: 'culture', label: '문화·역사 관광', time: '오전', note: '관광지 1곳, 휴식 포인트 포함' })
  }
  if (pace.restSlots >= 2) {
    slots.push({ type: 'rest', label: '휴식·카페', time: '오후 초', note: '음료·간단한 휴식' })
  }
  if (styles.includes('relax')) {
    slots.push({ type: 'relax', label: '휴양·산책', time: '오후', note: '해변·공원 등 평탄한 코스' })
  }
  if (styles.includes('activity') && pace.activitiesPerDay >= 3) {
    slots.push({ type: 'activity', label: '가벼운 활동', time: '오후', note: '난이도 조절된 코스' })
  }
  if (pace.restSlots >= 1 && !slots.some((s) => s.type === 'rest' && s.label === '휴식·카페')) {
    slots.push({ type: 'rest', label: '휴식·카페', time: '중간', note: '음료·간단한 휴식' })
  }

  if (isLast) {
    slots.push({ type: 'move', label: '귀가 이동', time: '오후', note: '체크아웃 후 여유 있게' })
  }

  return {
    day: dayIndex + 1,
    dateLabel: `${dayIndex + 1}일차`,
    slots: slots.slice(0, 6),
  }
}

export function generateItinerary(profile, destinationData) {
  const duration = profile.duration ?? 2
  const totalDays = duration + 1
  const difficulty = getDifficulty(profile)
  const pace = getPace(profile)
  const destination = profile.destination || '제주도'

  const days = []
  for (let d = 0; d < totalDays; d++) {
    days.push(buildDayPlan(d, totalDays, profile))
  }

  return {
    destination,
    totalDays,
    difficulty,
    difficultyLabel: difficulty <= 2 ? '여유' : difficulty >= 4 ? '활발' : '보통',
    paceLabel: pace.label,
    days,
    tips: [
      pace.restSlots >= 2 && '오전·오후에 짧은 휴식 취하기',
      profile.conditions?.length > 0 && '필요한 약·보조용품 챙기기',
      profile.restNeed >= 2 && '점심 후 30분~1시간 휴식 권장',
    ].filter(Boolean),
  }
}

export { getDifficulty, getPace, STYLE_LABELS }
