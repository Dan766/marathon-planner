import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'
import { planById } from '../data/plans'
import { generateScheduledPlan, getWorkoutLabel, getWorkoutColor, formatDate } from '../lib/plan-engine'
import { generateICS, downloadICS, generateShareUrl } from '../lib/ics-generator'
import type { ScheduledWeek } from '../lib/plan-engine'

export function PlanViewPage() {
  const navigate = useNavigate()
  const { planConfig, completedWorkouts, toggleWorkout } = useStore()
  const [copiedShare, setCopiedShare] = useState(false)

  const scheduledPlan = useMemo(() => {
    if (!planConfig) return null
    const plan = planById[planConfig.planId]
    if (!plan) return null
    return generateScheduledPlan(plan, planConfig)
  }, [planConfig])

  if (!scheduledPlan || !planConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No plan configured yet.</p>
          <button
            onClick={() => navigate('/build')}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold"
          >
            Create a Plan
          </button>
        </div>
      </div>
    )
  }

  const isWorkoutCompleted = (weekIndex: number, dayIndex: number) =>
    completedWorkouts.some((w) => w.weekIndex === weekIndex && w.dayIndex === dayIndex)

  const totalWorkouts = scheduledPlan.weeks.reduce(
    (sum, w) => sum + w.days.filter((d) => d.workout.type !== 'rest').length,
    0
  )
  const completedCount = completedWorkouts.length
  const progressPercent = totalWorkouts > 0 ? Math.round((completedCount / totalWorkouts) * 100) : 0

  const handleExportICS = () => {
    const ics = generateICS(scheduledPlan)
    if (ics) {
      downloadICS(ics, `${scheduledPlan.plan.id}-training-plan.ics`)
    }
  }

  const handleShare = () => {
    const url = generateShareUrl(planConfig)
    navigator.clipboard.writeText(url).then(() => {
      setCopiedShare(true)
      setTimeout(() => setCopiedShare(false), 2000)
    })
  }

  const handlePrint = () => {
    window.print()
  }

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-4 no-print">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-white/80 hover:text-white transition-colors">
            &larr; Home
          </button>
          <h1 className="text-lg font-semibold">{scheduledPlan.plan.name}</h1>
          <button onClick={() => navigate('/build')} className="text-white/80 hover:text-white text-sm">
            Edit
          </button>
        </div>
      </header>

      {/* Action Bar */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 no-print">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          <button
            onClick={handleExportICS}
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
          >
            &#128197; Export to Calendar
          </button>
          <button
            onClick={handleShare}
            className="bg-white hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg font-medium text-sm border border-gray-300 transition-colors"
          >
            {copiedShare ? '\u2713 Link Copied!' : '&#128279; Share Plan'}
          </button>
          <button
            onClick={handlePrint}
            className="bg-white hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg font-medium text-sm border border-gray-300 transition-colors"
          >
            &#128424; Print
          </button>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Training Progress</span>
            <span className="text-sm text-gray-500">
              {completedCount} / {totalWorkouts} workouts ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-secondary rounded-full h-2.5 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Total: {Math.round(scheduledPlan.totalMileage)} miles</span>
            <span>
              {formatDate(scheduledPlan.startDate)} &mdash; {formatDate(scheduledPlan.raceDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Print Header */}
      <div className="print-only px-4 py-4">
        <h1 className="text-2xl font-bold">{scheduledPlan.plan.name}</h1>
        <p className="text-gray-600">
          {formatDate(scheduledPlan.startDate)} &mdash; {formatDate(scheduledPlan.raceDate)} | Total: {Math.round(scheduledPlan.totalMileage)} miles
        </p>
      </div>

      {/* Calendar Grid */}
      <main className="flex-1 px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Day Headers (desktop) */}
          <div className="hidden lg:grid grid-cols-8 gap-2 text-center text-sm font-medium text-gray-500 px-2">
            <div>Week</div>
            {dayLabels.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {scheduledPlan.weeks.map((week) => (
            <WeekRowComponent
              key={week.weekNumber}
              week={week}
              dayLabels={dayLabels}
              isWorkoutCompleted={isWorkoutCompleted}
              toggleWorkout={toggleWorkout}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

function WeekRowComponent({
  week,
  dayLabels,
  isWorkoutCompleted,
  toggleWorkout,
}: {
  week: ScheduledWeek
  dayLabels: string[]
  isWorkoutCompleted: (weekIndex: number, dayIndex: number) => boolean
  toggleWorkout: (weekIndex: number, dayIndex: number) => void
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Week Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 text-sm">
            Week {week.weekNumber}
          </span>
          {week.label && (
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
              {week.label}
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500">
          {formatDate(week.startDate)} &mdash; {formatDate(week.endDate)} | {Math.round(week.totalMileage)} mi
        </div>
      </div>

      {/* Days Grid - Desktop */}
      <div className="hidden lg:grid grid-cols-7 gap-px bg-gray-100">
        {week.days.map((day) => {
          const completed = isWorkoutCompleted(day.weekIndex, day.dayIndex)
          return (
            <button
              key={day.dateStr}
              onClick={() => day.workout.type !== 'rest' && toggleWorkout(day.weekIndex, day.dayIndex)}
              className={`p-3 text-center transition-all ${
                day.workout.type === 'rest' ? 'bg-gray-50 cursor-default' : 'bg-white hover:bg-gray-50 cursor-pointer'
              } ${day.isToday ? 'ring-2 ring-primary ring-inset' : ''} ${
                completed ? 'opacity-60' : ''
              }`}
            >
              <div className="text-xs text-gray-400 mb-1">{formatDate(day.date)}</div>
              <div className={`text-xs font-medium px-2 py-1 rounded border ${getWorkoutColor(day.workout.type)} ${
                completed ? 'line-through' : ''
              }`}>
                {getWorkoutLabel(day.workout)}
              </div>
              {completed && (
                <div className="text-xs text-green-600 mt-1">{'\u2713'}</div>
              )}
            </button>
          )
        })}
      </div>

      {/* Days List - Mobile */}
      <div className="lg:hidden divide-y divide-gray-50">
        {week.days.map((day, i) => {
          const completed = isWorkoutCompleted(day.weekIndex, day.dayIndex)
          return (
            <button
              key={day.dateStr}
              onClick={() => day.workout.type !== 'rest' && toggleWorkout(day.weekIndex, day.dayIndex)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                day.workout.type === 'rest' ? 'cursor-default' : 'hover:bg-gray-50 cursor-pointer active:bg-gray-100'
              } ${day.isToday ? 'bg-blue-50/50' : ''}`}
            >
              <div className="w-10 text-center">
                <div className="text-xs text-gray-400">{dayLabels[i]}</div>
                <div className="text-sm font-medium text-gray-600">{formatDate(day.date)}</div>
              </div>
              <div className={`flex-1 text-sm font-medium px-3 py-1.5 rounded border ${getWorkoutColor(day.workout.type)} ${
                completed ? 'line-through opacity-60' : ''
              }`}>
                {getWorkoutLabel(day.workout)}
                {day.workout.notes && (
                  <span className="block text-xs font-normal mt-0.5 opacity-75">{day.workout.notes}</span>
                )}
              </div>
              {completed && (
                <span className="text-green-600 text-lg">{'\u2713'}</span>
              )}
              {day.isToday && !completed && day.workout.type !== 'rest' && (
                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Today</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
