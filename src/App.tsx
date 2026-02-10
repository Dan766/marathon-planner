import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { PlanBuilderPage } from './pages/PlanBuilderPage'
import { PlanViewPage } from './pages/PlanViewPage'
import { useTheme } from './hooks/useTheme'

function App() {
  useTheme()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/build" element={<PlanBuilderPage />} />
          <Route path="/plan" element={<PlanViewPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
