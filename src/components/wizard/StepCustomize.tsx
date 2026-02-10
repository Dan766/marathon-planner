import { useStore } from '../../store/store'
import type { DistanceUnit } from '../../store/store'
import { planById } from '../../data/plans'
import { getWorkoutLabel, getWorkoutColor, formatDistance, convertDistance } from '../../lib/plan-engine'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function StepCustomize() {
  const { planConfig, unit } = useStore()
  const plan = planConfig?.planId ? planById[planConfig.planId] : null

  if (!plan || !planConfig) return null

  // Show a sample week (week 1) for reference
  const sampleWeek = plan.weeks[0]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customize Your Plan</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Review the weekly structure. You can swap days in the full plan view later.
        </p>
      </div>

      {/* Weekly Structure Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Typical Week Structure</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Based on Week 1 of your {plan.name} plan</p>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {sampleWeek.days.map((workout, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3">
              <div className="w-12 text-sm font-medium text-gray-500 dark:text-gray-400">{DAY_NAMES[i]}</div>
              <div className={`flex-1 text-sm font-medium px-3 py-1.5 rounded border ${getWorkoutColor(workout.type)}`}>
                {getWorkoutLabel(workout, unit)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mileage Progression Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Weekly Mileage Progression</h3>
        </div>
        <div className="p-5">
          <MileageChart unit={unit} weeks={plan.weeks.map((w) => ({
            weekNumber: w.weekNumber,
            label: w.label,
            mileage: w.days.reduce((sum, d) => sum + (d.distance ?? 0), 0),
          }))} />
        </div>
      </div>

      {/* Plan Details */}
      <div className="mt-6 bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-100 dark:border-green-800">
        <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">Plan Overview</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-green-700 dark:text-green-300">Total Weeks:</span>
            <span className="ml-2 font-medium text-green-900 dark:text-green-200">{plan.totalWeeks}</span>
          </div>
          <div>
            <span className="text-green-700 dark:text-green-300">Peak Mileage:</span>
            <span className="ml-2 font-medium text-green-900 dark:text-green-200">~{formatDistance(plan.peakMileage, unit)}/week</span>
          </div>
          <div>
            <span className="text-green-700 dark:text-green-300">Difficulty:</span>
            <span className="ml-2 font-medium text-green-900 dark:text-green-200">{plan.difficulty}/5</span>
          </div>
          <div>
            <span className="text-green-700 dark:text-green-300">For:</span>
            <span className="ml-2 font-medium text-green-900 dark:text-green-200">{plan.targetAudience}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MileageChart({ weeks, unit }: { weeks: { weekNumber: number; label?: string; mileage: number }[]; unit: DistanceUnit }) {
  const maxMileage = Math.max(...weeks.map((w) => w.mileage))

  return (
    <div className="flex items-end gap-1 h-32">
      {weeks.map((week) => {
        const heightPercent = maxMileage > 0 ? (week.mileage / maxMileage) * 100 : 0
        const isRaceWeek = week.label?.toLowerCase().includes('race')
        const isTaper = week.label?.toLowerCase().includes('taper')

        return (
          <div
            key={week.weekNumber}
            className="flex-1 flex flex-col items-center gap-1"
            title={`Week ${week.weekNumber}: ${formatDistance(week.mileage, unit)}${week.label ? ` (${week.label})` : ''}`}
          >
            <div className="text-xs text-gray-400 font-medium">
              {Math.round(convertDistance(week.mileage, unit))}
            </div>
            <div
              className={`w-full rounded-t transition-all ${
                isRaceWeek ? 'bg-yellow-400' : isTaper ? 'bg-amber-300' : 'bg-primary/70'
              }`}
              style={{ height: `${heightPercent}%`, minHeight: week.mileage > 0 ? '4px' : '0px' }}
            />
            <div className="text-xs text-gray-400">{week.weekNumber}</div>
          </div>
        )
      })}
    </div>
  )
}
