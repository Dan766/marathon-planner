import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { PlanBuilderPage } from './pages/PlanBuilderPage'
import { PlanViewPage } from './pages/PlanViewPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
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
