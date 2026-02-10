import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PlanConfig {
  planId: string
  raceDate: string // ISO date string
  startDayOfWeek: number // 0=Sun, 1=Mon, ... 6=Sat
  customRestDays?: number[] // day indices that should be rest
  swappedDays?: Record<number, [number, number]> // weekIndex -> [dayA, dayB] swapped
}

export interface CompletedWorkout {
  weekIndex: number
  dayIndex: number
  completedAt: string // ISO date
  notes?: string
}

export type Theme = 'light' | 'dark' | 'system'
export type DistanceUnit = 'mi' | 'km'

interface AppState {
  // Wizard state
  wizardStep: number
  planConfig: PlanConfig | null

  // Progress tracking
  completedWorkouts: CompletedWorkout[]

  // Theme
  theme: Theme

  // Units
  unit: DistanceUnit

  // Actions
  setWizardStep: (step: number) => void
  setPlanConfig: (config: PlanConfig | null) => void
  updatePlanConfig: (partial: Partial<PlanConfig>) => void
  toggleWorkout: (weekIndex: number, dayIndex: number) => void
  addWorkoutNote: (weekIndex: number, dayIndex: number, notes: string) => void
  setTheme: (theme: Theme) => void
  setUnit: (unit: DistanceUnit) => void
  resetProgress: () => void
  resetAll: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      wizardStep: 0,
      planConfig: null,
      completedWorkouts: [],
      theme: 'system' as Theme,
      unit: 'mi' as DistanceUnit,

      setWizardStep: (step) => set({ wizardStep: step }),

      setPlanConfig: (config) => set({ planConfig: config, completedWorkouts: [] }),

      updatePlanConfig: (partial) => {
        const current = get().planConfig
        if (current) {
          set({ planConfig: { ...current, ...partial } })
        }
      },

      toggleWorkout: (weekIndex, dayIndex) => {
        const { completedWorkouts } = get()
        const existing = completedWorkouts.find(
          (w) => w.weekIndex === weekIndex && w.dayIndex === dayIndex
        )
        if (existing) {
          set({
            completedWorkouts: completedWorkouts.filter(
              (w) => !(w.weekIndex === weekIndex && w.dayIndex === dayIndex)
            ),
          })
        } else {
          set({
            completedWorkouts: [
              ...completedWorkouts,
              { weekIndex, dayIndex, completedAt: new Date().toISOString() },
            ],
          })
        }
      },

      addWorkoutNote: (weekIndex, dayIndex, notes) => {
        const { completedWorkouts } = get()
        set({
          completedWorkouts: completedWorkouts.map((w) =>
            w.weekIndex === weekIndex && w.dayIndex === dayIndex
              ? { ...w, notes }
              : w
          ),
        })
      },

      setTheme: (theme) => set({ theme }),
      setUnit: (unit) => set({ unit }),

      resetProgress: () => set({ completedWorkouts: [] }),

      resetAll: () => set({ wizardStep: 0, planConfig: null, completedWorkouts: [] }),
    }),
    {
      name: 'marathon-planner-storage',
    }
  )
)
