import { useState } from 'react'
import { useStore } from '../../store/store'
import { trainingPlans } from '../../data/plans'
import { formatDistance } from '../../lib/plan-engine'
import type { RaceDistance } from '../../data/types'

const difficultyStars = (level: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < level ? 'text-amber-400' : 'text-gray-200 dark:text-gray-600'}>
      &#9733;
    </span>
  ))
}

const distanceTabs: { value: RaceDistance; label: string }[] = [
  { value: '5k', label: '5K' },
  { value: 'half', label: 'Half Marathon' },
  { value: 'marathon', label: 'Marathon' },
]

export function StepPlanSelect() {
  const { planConfig, setPlanConfig, updatePlanConfig, unit } = useStore()
  const selectedId = planConfig?.planId
  const [activeDistance, setActiveDistance] = useState<RaceDistance>(() => {
    if (selectedId) {
      const selectedPlan = trainingPlans.find((p) => p.id === selectedId)
      if (selectedPlan) return selectedPlan.raceDistance
    }
    return '5k'
  })

  const filteredPlans = trainingPlans.filter((p) => p.raceDistance === activeDistance)

  const handleSelect = (planId: string) => {
    if (planConfig) {
      updatePlanConfig({ planId })
    } else {
      setPlanConfig({
        planId,
        raceDate: '',
        startDayOfWeek: 1, // Monday default
      })
    }
  }

  const handleTabChange = (distance: RaceDistance) => {
    setActiveDistance(distance)
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Choose Your Training Plan</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Select the plan that matches your experience level and goals
        </p>
      </div>

      {/* Distance Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-1">
          {distanceTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                activeDistance === tab.value
                  ? 'bg-white dark:bg-gray-700 text-primary shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => handleSelect(plan.id)}
            className={`text-left p-5 rounded-xl border-2 transition-all ${
              selectedId === plan.id
                ? 'border-primary bg-blue-50 dark:bg-blue-900/20 shadow-md'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              {selectedId === plan.id && (
                <span className="text-primary text-lg">{'\u2713'}</span>
              )}
            </div>
            <p className="text-sm text-primary font-medium mb-2">{plan.subtitle}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{plan.description}</p>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Difficulty</span>
                <span className="flex">{difficultyStars(plan.difficulty)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Duration</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">{plan.totalWeeks} weeks</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Peak Mileage</span>
                <span className="text-gray-700 dark:text-gray-200 font-medium">~{formatDistance(plan.peakMileage, unit)}/week</span>
              </div>
              <div className="text-xs text-gray-400 mt-2">{plan.targetAudience}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
