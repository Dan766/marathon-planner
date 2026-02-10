import { addDays, subWeeks, startOfWeek, format, parseISO, isAfter, isBefore, isToday } from 'date-fns'
import type { TrainingPlan, WeekSchedule, Workout } from '../data/types'
import type { PlanConfig, DistanceUnit } from '../store/store'

const MI_TO_KM = 1.60934

export function convertDistance(miles: number, unit: DistanceUnit): number {
  if (unit === 'mi') return miles
  return miles * MI_TO_KM
}

export function formatDistance(miles: number, unit: DistanceUnit): string {
  const value = convertDistance(miles, unit)
  const rounded = unit === 'km' ? Math.round(value * 10) / 10 : Math.round(value)
  return `${rounded} ${unit}`
}

export interface ScheduledDay {
  date: Date
  dateStr: string
  workout: Workout
  weekIndex: number
  dayIndex: number
  isToday: boolean
  isPast: boolean
  isFuture: boolean
}

export interface ScheduledWeek {
  weekNumber: number
  label?: string
  days: ScheduledDay[]
  totalMileage: number
  startDate: Date
  endDate: Date
}

export interface ScheduledPlan {
  plan: TrainingPlan
  config: PlanConfig
  weeks: ScheduledWeek[]
  startDate: Date
  raceDate: Date
  totalMileage: number
}

export function generateScheduledPlan(
  plan: TrainingPlan,
  config: PlanConfig
): ScheduledPlan {
  const raceDate = parseISO(config.raceDate)

  // Calculate start date: go back totalWeeks from race date
  // Then align to the chosen start day of week
  const rawStart = subWeeks(raceDate, plan.totalWeeks)
  const startDate = startOfWeek(rawStart, { weekStartsOn: config.startDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let totalMileage = 0

  const weeks: ScheduledWeek[] = plan.weeks.map((week, weekIndex) => {
    const weekStartDate = addDays(startDate, weekIndex * 7)
    const weeklyApplied = applyCustomizations(week, config, weekIndex)

    let weekMileage = 0
    const days: ScheduledDay[] = weeklyApplied.days.map((workout, dayIndex) => {
      const date = addDays(weekStartDate, dayIndex)
      const dateOnly = new Date(date)
      dateOnly.setHours(0, 0, 0, 0)

      if (workout.distance) {
        weekMileage += workout.distance
      }

      return {
        date,
        dateStr: format(date, 'yyyy-MM-dd'),
        workout,
        weekIndex,
        dayIndex,
        isToday: isToday(date),
        isPast: isBefore(dateOnly, today),
        isFuture: isAfter(dateOnly, today),
      }
    })

    totalMileage += weekMileage

    return {
      weekNumber: week.weekNumber,
      label: week.label,
      days,
      totalMileage: weekMileage,
      startDate: weekStartDate,
      endDate: addDays(weekStartDate, 6),
    }
  })

  return {
    plan,
    config,
    weeks,
    startDate,
    raceDate,
    totalMileage,
  }
}

function applyCustomizations(
  week: WeekSchedule,
  config: PlanConfig,
  weekIndex: number
): WeekSchedule {
  const days = [...week.days] as [Workout, Workout, Workout, Workout, Workout, Workout, Workout]

  // Apply day swaps
  if (config.swappedDays && config.swappedDays[weekIndex]) {
    const [a, b] = config.swappedDays[weekIndex]
    const temp = days[a]
    days[a] = days[b]
    days[b] = temp
  }

  return { ...week, days }
}

export function getWorkoutLabel(workout: Workout, unit: DistanceUnit = 'mi'): string {
  const dist = workout.distance ? formatDistance(workout.distance, unit) : null
  switch (workout.type) {
    case 'rest': return 'Rest'
    case 'cross': return 'Cross Training'
    case 'easy': return dist ? `Easy ${dist}` : 'Easy Run'
    case 'long': return dist ? `Long Run ${dist}` : 'Long Run'
    case 'tempo': return dist ? `Tempo ${dist}` : 'Tempo Run'
    case 'pace': return dist ? `Pace ${dist}` : 'Race Pace'
    case 'race': return dist ? `Race ${dist}` : 'Race Day!'
    case 'intervals': return dist ? `Intervals ${dist}` : 'Intervals'
    default: return 'Workout'
  }
}

export function getWorkoutColor(type: Workout['type']): string {
  switch (type) {
    case 'rest': return 'bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
    case 'cross': return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800'
    case 'easy': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
    case 'long': return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
    case 'tempo': return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800'
    case 'pace': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
    case 'race': return 'bg-yellow-50 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800'
    case 'intervals': return 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800'
    default: return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
  }
}

export function formatDate(date: Date): string {
  return format(date, 'MMM d')
}

export function formatDateFull(date: Date): string {
  return format(date, 'EEEE, MMMM d, yyyy')
}
