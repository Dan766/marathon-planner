import { createEvents, type EventAttributes } from 'ics'
import type { ScheduledPlan } from './plan-engine'
import { getWorkoutLabel, formatDistance } from './plan-engine'
import type { DistanceUnit } from '../store/store'

export function generateICS(scheduledPlan: ScheduledPlan, unit: DistanceUnit = 'mi'): string | null {
  const events: EventAttributes[] = []

  for (const week of scheduledPlan.weeks) {
    for (const day of week.days) {
      if (day.workout.type === 'rest') continue

      const title = getWorkoutLabel(day.workout, unit)
      const year = day.date.getFullYear()
      const month = day.date.getMonth() + 1
      const dayOfMonth = day.date.getDate()

      let description = `Week ${week.weekNumber} - ${scheduledPlan.plan.name}\n`
      description += `Workout: ${title}\n`
      if (day.workout.distance) {
        description += `Distance: ${formatDistance(day.workout.distance, unit)}\n`
      }
      if (day.workout.duration) {
        description += `Duration: ${day.workout.duration}\n`
      }
      if (day.workout.notes) {
        description += `\nNotes: ${day.workout.notes}`
      }
      if (week.label) {
        description += `\n${week.label}`
      }

      events.push({
        title,
        start: [year, month, dayOfMonth],
        duration: { hours: 1 },
        description,
        categories: ['Race Training', day.workout.type],
        status: 'CONFIRMED' as const,
        busyStatus: 'BUSY' as const,
        alarms: [
          {
            action: 'display' as const,
            description: `Time for your ${title}!`,
            trigger: { hours: 1, before: true },
          },
        ],
      })
    }
  }

  const { error, value } = createEvents(events)

  if (error) {
    console.error('Error generating ICS:', error)
    return null
  }

  return value ?? null
}

export function downloadICS(icsContent: string, filename: string = 'training-plan.ics') {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function generateShareUrl(config: { planId: string; raceDate: string; startDayOfWeek: number }): string {
  const params = new URLSearchParams({
    plan: config.planId,
    race: config.raceDate,
    start: config.startDayOfWeek.toString(),
  })
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`
}
