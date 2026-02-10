import { useMemo } from 'react'
import { useStore } from '../../store/store'
import { planById } from '../../data/plans'
import { generateScheduledPlan, getWorkoutLabel, getWorkoutColor, formatDate, formatDistance, convertDistance } from '../../lib/plan-engine'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function StepPreview() {
  const { planConfig, unit } = useStore()

  const scheduledPlan = useMemo(() => {
    if (!planConfig) return null
    const plan = planById[planConfig.planId]
    if (!plan) return null
    return generateScheduledPlan(plan, planConfig)
  }, [planConfig])

  if (!scheduledPlan || !planConfig) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Configure your plan first.</p>
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Plan Preview</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Review your complete {scheduledPlan.plan.name} training schedule
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {formatDate(scheduledPlan.startDate)} &mdash; {formatDate(scheduledPlan.raceDate)} | {formatDistance(scheduledPlan.totalMileage, unit)} total
        </p>
      </div>

      <div className="space-y-3">
        {scheduledPlan.weeks.map((week) => (
          <div
            key={week.weekNumber}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Week Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-white text-sm">
                  Week {week.weekNumber}
                </span>
                {week.label && (
                  <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full font-medium">
                    {week.label}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(week.startDate)} &mdash; {formatDate(week.endDate)} | {formatDistance(week.totalMileage, unit)}
              </span>
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-px bg-gray-100 dark:bg-gray-700">
              {week.days.map((day, i) => (
                <div
                  key={day.dateStr}
                  className={`p-2 text-center bg-white dark:bg-gray-800 ${
                    day.isToday ? 'ring-2 ring-primary ring-inset' : ''
                  }`}
                >
                  <div className="text-xs text-gray-400 mb-1">
                    <span className="sm:hidden">{DAY_NAMES[i].charAt(0)}</span>
                    <span className="hidden sm:inline">{DAY_NAMES[i]}</span>
                  </div>
                  <div className={`text-xs font-medium px-1 py-1 rounded border ${getWorkoutColor(day.workout.type)}`}>
                    <span className="hidden sm:inline">{getWorkoutLabel(day.workout, unit)}</span>
                    <span className="sm:hidden">
                      {day.workout.type === 'rest' ? 'R' : day.workout.distance ? `${Math.round(convertDistance(day.workout.distance, unit))}` : day.workout.type.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
