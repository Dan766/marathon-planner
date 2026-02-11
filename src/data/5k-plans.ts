import type { TrainingPlan, Workout } from './types';

// Helper function to create a workout
const w = (type: Workout['type'], distance?: number, duration?: string, notes?: string): Workout => ({
  type,
  ...(distance !== undefined && { distance }),
  ...(duration && { duration }),
  ...(notes && { notes }),
});

// 5K Novice - For first-time 5K runners
const fiveKNovice: TrainingPlan = {
  id: '5k-novice',
  name: 'Novice',
  raceDistance: '5k',
  subtitle: 'For First-Time 5K Runners',
  description: 'An 8-week walk/run plan with 3 days of running and 2 cross-training days. Builds from 1.5 miles up to 3 miles before race day.',
  difficulty: 1,
  totalWeeks: 8,
  peakMileage: 10,
  targetAudience: 'Complete beginners or returning runners who can walk briskly for 30 minutes',
  weeks: [
    { weekNumber: 1, days: [w('rest'), w('easy', 1.5, undefined, 'Run/walk'), w('cross', undefined, '20 min'), w('easy', 1.5, undefined, 'Run/walk'), w('rest'), w('cross', undefined, '20 min'), w('long', 2, undefined, 'Run/walk')] },
    { weekNumber: 2, days: [w('rest'), w('easy', 1.5, undefined, 'Run/walk'), w('cross', undefined, '20 min'), w('easy', 1.5, undefined, 'Run/walk'), w('rest'), w('cross', undefined, '25 min'), w('long', 2)] },
    { weekNumber: 3, days: [w('rest'), w('easy', 1.5), w('cross', undefined, '25 min'), w('easy', 2), w('rest'), w('cross', undefined, '25 min'), w('long', 2.5)] },
    { weekNumber: 4, days: [w('rest'), w('easy', 2), w('cross', undefined, '25 min'), w('easy', 2), w('rest'), w('cross', undefined, '30 min'), w('long', 2.5)] },
    { weekNumber: 5, days: [w('rest'), w('easy', 2), w('cross', undefined, '30 min'), w('easy', 2), w('rest'), w('cross', undefined, '30 min'), w('long', 3)] },
    { weekNumber: 6, days: [w('rest'), w('easy', 2), w('cross', undefined, '30 min'), w('easy', 2.5), w('rest'), w('cross', undefined, '30 min'), w('long', 3)] },
    { weekNumber: 7, days: [w('rest'), w('easy', 2.5), w('cross', undefined, '30 min'), w('easy', 2.5), w('rest'), w('cross', undefined, '30 min'), w('long', 3)] },
    { weekNumber: 8, label: 'Race Week', days: [w('rest'), w('easy', 2), w('cross', undefined, '20 min'), w('easy', 1.5), w('rest'), w('rest'), w('race', 3.1, undefined, '5K Race!')] },
  ],
};

// 5K Intermediate - For runners wanting to improve time
const fiveKIntermediate: TrainingPlan = {
  id: '5k-intermediate',
  name: 'Intermediate',
  raceDistance: '5k',
  subtitle: 'Improve Your 5K Time',
  description: 'An 8-week plan with 4-5 days of running including tempo runs and interval workouts. Builds speed and endurance for a faster 5K.',
  difficulty: 3,
  totalWeeks: 8,
  peakMileage: 18,
  targetAudience: 'Runners who have completed a 5K and want to improve their time',
  weeks: [
    { weekNumber: 1, days: [w('rest'), w('easy', 2.5), w('tempo', 2, '15 min'), w('easy', 2.5), w('rest'), w('easy', 2), w('long', 3.5)] },
    { weekNumber: 2, days: [w('rest'), w('easy', 2.5), w('intervals', 2.5, undefined, '6x400m'), w('easy', 2.5), w('rest'), w('easy', 2), w('long', 4)] },
    { weekNumber: 3, days: [w('rest'), w('easy', 3), w('tempo', 2.5, '20 min'), w('easy', 3), w('rest'), w('easy', 2), w('long', 4)] },
    { weekNumber: 4, days: [w('rest'), w('easy', 3), w('intervals', 3, undefined, '7x400m'), w('easy', 3), w('rest'), w('easy', 2.5), w('long', 4.5)] },
    { weekNumber: 5, days: [w('rest'), w('easy', 3), w('tempo', 3, '20 min'), w('easy', 3), w('rest'), w('easy', 2.5), w('long', 5)] },
    { weekNumber: 6, days: [w('rest'), w('easy', 3), w('intervals', 3, undefined, '8x400m'), w('easy', 3), w('rest'), w('easy', 3), w('long', 5)] },
    { weekNumber: 7, label: 'Taper', days: [w('rest'), w('easy', 3), w('tempo', 2.5, '15 min'), w('easy', 2.5), w('rest'), w('easy', 2), w('long', 4)] },
    { weekNumber: 8, label: 'Race Week', days: [w('rest'), w('easy', 2), w('intervals', 2, undefined, '4x400m'), w('easy', 1.5), w('rest'), w('rest'), w('race', 3.1, undefined, '5K Race!')] },
  ],
};

// 5K Advanced - For competitive 5K runners
const fiveKAdvanced: TrainingPlan = {
  id: '5k-advanced',
  name: 'Advanced',
  raceDistance: '5k',
  subtitle: 'For Competitive Runners',
  description: 'An intense 8-week plan with 6 days of running including hill repeats, track intervals, and tempo work. Designed for runners chasing a PR.',
  difficulty: 4,
  totalWeeks: 8,
  peakMileage: 28,
  targetAudience: 'Competitive runners with a strong base seeking a 5K personal record',
  weeks: [
    { weekNumber: 1, days: [w('easy', 3), w('intervals', 4, undefined, '6x400m at 5K pace'), w('easy', 3), w('tempo', 3, '20 min'), w('easy', 3), w('rest'), w('long', 5)] },
    { weekNumber: 2, days: [w('easy', 3), w('intervals', 4, undefined, '6x hill repeats'), w('easy', 3), w('tempo', 3.5, '25 min'), w('easy', 3), w('rest'), w('long', 6)] },
    { weekNumber: 3, days: [w('easy', 3), w('intervals', 4.5, undefined, '5x800m at 5K pace'), w('easy', 3), w('tempo', 4, '25 min'), w('easy', 3.5), w('rest'), w('long', 6)] },
    { weekNumber: 4, days: [w('easy', 3), w('intervals', 5, undefined, '8x400m at 5K pace'), w('easy', 3), w('tempo', 4, '30 min'), w('easy', 3.5), w('rest'), w('long', 7)] },
    { weekNumber: 5, days: [w('easy', 3), w('intervals', 5, undefined, '7x hill repeats'), w('easy', 3.5), w('tempo', 4.5, '30 min'), w('easy', 3.5), w('rest'), w('long', 7)] },
    { weekNumber: 6, days: [w('easy', 3), w('intervals', 5, undefined, '6x800m at 5K pace'), w('easy', 3.5), w('tempo', 5, '35 min'), w('easy', 3.5), w('rest'), w('long', 7)] },
    { weekNumber: 7, label: 'Taper', days: [w('easy', 3), w('intervals', 4, undefined, '5x400m at 5K pace'), w('easy', 3), w('tempo', 3, '20 min'), w('easy', 3), w('rest'), w('long', 5)] },
    { weekNumber: 8, label: 'Race Week', days: [w('easy', 3), w('intervals', 3, undefined, '4x400m at 5K pace'), w('easy', 2), w('easy', 2), w('rest'), w('rest'), w('race', 3.1, undefined, '5K Race!')] },
  ],
};

// Export 5K plans
export const fiveKPlans: TrainingPlan[] = [
  fiveKNovice,
  fiveKIntermediate,
  fiveKAdvanced,
];

export const fiveKPlanById: Record<string, TrainingPlan> = {
  '5k-novice': fiveKNovice,
  '5k-intermediate': fiveKIntermediate,
  '5k-advanced': fiveKAdvanced,
};
