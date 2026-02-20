import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProfileProvider } from './context/ProfileContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SurveyPage from './pages/SurveyPage'
import CurationPage from './pages/CurationPage'
import PlannerPage from './pages/PlannerPage'

function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/survey" element={<SurveyPage />} />
            <Route path="/curation" element={<CurationPage />} />
            <Route path="/planner" element={<PlannerPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ProfileProvider>
  )
}

export default App
