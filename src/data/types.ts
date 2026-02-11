export type WorkoutType = 'rest' | 'cross' | 'easy' | 'long' | 'tempo' | 'pace' | 'race' | 'intervals';

export interface Workout {
  type: WorkoutType;
  distance?: number; // miles
  duration?: string; // e.g., "30 min"
  notes?: string;
}

export interface WeekSchedule {
  weekNumber: number;
  label?: string; // e.g., "Taper Week", "Race Week"
  days: [Workout, Workout, Workout, Workout, Workout, Workout, Workout]; // Mon-Sun
}

export type RaceDistance = 'marathon' | 'half' | '5k';

export interface TrainingPlan {
  id: string;
  name: string;
  raceDistance: RaceDistance;
  subtitle: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  totalWeeks: number;
  peakMileage: number;
  targetAudience: string;
  weeks: WeekSchedule[];
}
