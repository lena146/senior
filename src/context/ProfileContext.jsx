import React, { createContext, useContext, useState, useCallback } from 'react'

const ProfileContext = createContext(null)

const defaultProfile = {
  // 건강: 운동량 (1~5), 휴식 필요도 (1~5), 질환(복수 선택 가능)
  exerciseLevel: null,
  restNeed: null,
  conditions: [],
  // 여행 성향: 활동/휴양/문화 (복수 가능, 비중 있음)
  travelStyle: [],
  // 선호 여행지, 기간
  destination: '',
  duration: null,
}

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile)

  const updateProfile = useCallback((updates) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }, [])

  const resetProfile = useCallback(() => {
    setProfile({ ...defaultProfile })
  }, [])

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, resetProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider')
  return ctx
}
