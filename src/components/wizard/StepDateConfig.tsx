import { useMemo } from 'react'
import { format, parseISO, subWeeks } from 'date-fns'
import { useStore } from '../../store/store'
import { planById } from '../../data/plans'

const DAYS_OF_WEEK = [
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
  { value: 0, label: 'Sunday' },
]

export function StepDateConfig() {
  const { planConfig, updatePlanConfig } = useStore()

  const plan = planConfig?.planId ? planById[planConfig.planId] : null

  const raceDate = planConfig?.raceDate
  const totalWeeks = plan?.totalWeeks

  const calculatedStart = useMemo(() => {
    if (!raceDate || !totalWeeks) return null
    const parsed = parseISO(raceDate)
    return subWeeks(parsed, totalWeeks)
  }, [raceDate, totalWeeks])

  const minRaceDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + (totalWeeks ?? 18) * 7)
    return format(date, 'yyyy-MM-dd')
  }, [totalWeeks])

  if (!planConfig || !plan) return null

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Set Your Race Date</h2>
        <p className="text-gray-500 mt-2">
          We'll calculate your {plan.totalWeeks}-week plan backwards from race day
        </p>
      </div>

      <div className="space-y-6">
        {/* Race Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Race Date
          </label>
          <input
            type="date"
            value={planConfig.raceDate}
            min={minRaceDate}
            onChange={(e) => updatePlanConfig({ raceDate: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-lg"
          />
          {planConfig.raceDate && (
            <p className="mt-2 text-sm text-gray-500">
              Race day: <strong>{format(parseISO(planConfig.raceDate), 'EEEE, MMMM d, yyyy')}</strong>
            </p>
          )}
        </div>

        {/* Week Start Day */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Week Starts On
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {DAYS_OF_WEEK.map((day) => (
              <button
                key={day.value}
                onClick={() => updatePlanConfig({ startDayOfWeek: day.value })}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  planConfig.startDayOfWeek === day.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {day.label.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Calculated Summary */}
        {calculatedStart && planConfig.raceDate && (
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h3 className="font-semibold text-blue-900 mb-3">Plan Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Training Starts</span>
                <span className="font-medium text-blue-900">
                  {format(calculatedStart, 'MMM d, yyyy')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Race Day</span>
                <span className="font-medium text-blue-900">
                  {format(parseISO(planConfig.raceDate), 'MMM d, yyyy')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Duration</span>
                <span className="font-medium text-blue-900">{plan.totalWeeks} weeks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Plan</span>
                <span className="font-medium text-blue-900">{plan.name}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
