import { useStore } from '../../store/store'
import { trainingPlans } from '../../data/plans'

const difficultyStars = (level: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < level ? 'text-amber-400' : 'text-gray-200'}>
      &#9733;
    </span>
  ))
}

export function StepPlanSelect() {
  const { planConfig, setPlanConfig, updatePlanConfig } = useStore()
  const selectedId = planConfig?.planId

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

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Training Plan</h2>
        <p className="text-gray-500 mt-2">
          Select the plan that matches your experience level and goals
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainingPlans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => handleSelect(plan.id)}
            className={`text-left p-5 rounded-xl border-2 transition-all ${
              selectedId === plan.id
                ? 'border-primary bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-gray-900">{plan.name}</h3>
              {selectedId === plan.id && (
                <span className="text-primary text-lg">{'\u2713'}</span>
              )}
            </div>
            <p className="text-sm text-primary font-medium mb-2">{plan.subtitle}</p>
            <p className="text-sm text-gray-500 mb-3">{plan.description}</p>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Difficulty</span>
                <span className="flex">{difficultyStars(plan.difficulty)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Duration</span>
                <span className="text-gray-700 font-medium">{plan.totalWeeks} weeks</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Peak Mileage</span>
                <span className="text-gray-700 font-medium">~{plan.peakMileage} mi/week</span>
              </div>
              <div className="text-xs text-gray-400 mt-2">{plan.targetAudience}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
