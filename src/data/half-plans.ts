import type { TrainingPlan, Workout } from './types';

// Helper function to create a workout
const w = (type: Workout['type'], distance?: number, duration?: string, notes?: string): Workout => ({
  type,
  ...(distance !== undefined && { distance }),
  ...(duration && { duration }),
  ...(notes && { notes }),
});

// Half Marathon Novice 1 - For first-time half marathoners
const halfNovice1: TrainingPlan = {
  id: 'half-novice-1',
  name: 'Novice 1',
  raceDistance: 'half',
  subtitle: 'For First-Time Half Marathoners',
  description: 'A beginner-friendly 12-week plan with 3 days of running, cross-training, and gradual long run progression up to 10 miles.',
  difficulty: 1,
  totalWeeks: 12,
  peakMileage: 22,
  targetAudience: 'First-time half marathoners who can run 2-3 miles comfortably',
  weeks: [
    { weekNumber: 1, days: [w('rest'), w('easy', 3), w('cross', undefined, '30 min'), w('easy', 3), w('rest'), w('cross', undefined, '30 min'), w('long', 4)] },
    { weekNumber: 2, days: [w('rest'), w('easy', 3), w('cross', undefined, '30 min'), w('easy', 3), w('rest'), w('cross', undefined, '30 min'), w('long', 4)] },
    { weekNumber: 3, days: [w('rest'), w('easy', 3.5), w('cross', undefined, '30 min'), w('easy', 3.5), w('rest'), w('cross', undefined, '40 min'), w('long', 5)] },
    { weekNumber: 4, days: [w('rest'), w('easy', 3.5), w('cross', undefined, '30 min'), w('easy', 3.5), w('rest'), w('cross', undefined, '40 min'), w('long', 5)] },
    { weekNumber: 5, days: [w('rest'), w('easy', 4), w('cross', undefined, '30 min'), w('easy', 4), w('rest'), w('cross', undefined, '40 min'), w('long', 6)] },
    { weekNumber: 6, days: [w('rest'), w('easy', 4), w('cross', undefined, '30 min'), w('easy', 4), w('rest'), w('rest'), w('race', 3.1, undefined, '5K Race')] },
    { weekNumber: 7, days: [w('rest'), w('easy', 4.5), w('cross', undefined, '30 min'), w('easy', 4.5), w('rest'), w('cross', undefined, '50 min'), w('long', 7)] },
    { weekNumber: 8, days: [w('rest'), w('easy', 4.5), w('cross', undefined, '30 min'), w('easy', 4.5), w('rest'), w('cross', undefined, '50 min'), w('long', 8)] },
    { weekNumber: 9, days: [w('rest'), w('easy', 5), w('cross', undefined, '30 min'), w('easy', 5), w('rest'), w('rest'), w('race', 6.2, undefined, '10K Race')] },
    { weekNumber: 10, days: [w('rest'), w('easy', 5), w('cross', undefined, '30 min'), w('easy', 5), w('rest'), w('cross', undefined, '60 min'), w('long', 9)] },
    { weekNumber: 11, days: [w('rest'), w('easy', 5), w('cross', undefined, '30 min'), w('easy', 5), w('rest'), w('cross', undefined, '60 min'), w('long', 10)] },
    { weekNumber: 12, label: 'Race Week', days: [w('rest'), w('easy', 4), w('cross', undefined, '30 min'), w('easy', 2), w('rest'), w('rest'), w('race', 13.1, undefined, 'Half Marathon!')] },
  ],
};

// Half Marathon Novice 2 - With pace work
const halfNovice2: TrainingPlan = {
  id: 'half-novice-2',
  name: 'Novice 2',
  raceDistance: 'half',
  subtitle: 'With Race Pace Training',
  description: 'A 12-week plan that adds race pace runs to the beginner formula, with long runs building up to 12 miles before race day.',
  difficulty: 2,
  totalWeeks: 12,
  peakMileage: 26,
  targetAudience: 'Runners with some experience who want structured pace work for their half marathon',
  weeks: [
    { weekNumber: 1, days: [w('rest'), w('easy', 3), w('easy', 3), w('easy', 3), w('rest'), w('long', 4), w('cross', undefined, '60 min')] },
    { weekNumber: 2, days: [w('rest'), w('easy', 3), w('pace', 3), w('easy', 3), w('rest'), w('long', 5), w('cross', undefined, '60 min')] },
    { weekNumber: 3, days: [w('rest'), w('easy', 3), w('easy', 4), w('easy', 3), w('rest'), w('long', 6), w('cross', undefined, '60 min')] },
    { weekNumber: 4, days: [w('rest'), w('easy', 3), w('pace', 4), w('easy', 3), w('rest'), w('long', 7), w('cross', undefined, '60 min')] },
    { weekNumber: 5, days: [w('rest'), w('easy', 3), w('easy', 4), w('easy', 3), w('rest'), w('long', 8), w('cross', undefined, '60 min')] },
    { weekNumber: 6, days: [w('rest'), w('easy', 3), w('pace', 4), w('easy', 3), w('rest'), w('race', 3.1, undefined, '5K Race'), w('cross', undefined, '60 min')] },
    { weekNumber: 7, days: [w('rest'), w('easy', 3), w('easy', 5), w('easy', 3), w('rest'), w('long', 9), w('cross', undefined, '60 min')] },
    { weekNumber: 8, days: [w('rest'), w('easy', 3), w('pace', 5), w('easy', 3), w('rest'), w('long', 10), w('cross', undefined, '60 min')] },
    { weekNumber: 9, days: [w('rest'), w('easy', 3), w('easy', 5), w('easy', 3), w('rest'), w('race', 6.2, undefined, '10K Race'), w('cross', undefined, '60 min')] },
    { weekNumber: 10, days: [w('rest'), w('easy', 3), w('pace', 5), w('easy', 3), w('rest'), w('long', 11), w('cross', undefined, '60 min')] },
    { weekNumber: 11, days: [w('rest'), w('easy', 3), w('easy', 5), w('easy', 3), w('rest'), w('long', 12), w('cross', undefined, '60 min')] },
    { weekNumber: 12, label: 'Race Week', days: [w('rest'), w('easy', 3), w('pace', 2), w('easy', 2), w('rest'), w('race', 13.1, undefined, 'Half Marathon!'), w('rest')] },
  ],
};

// Half Marathon Intermediate 1 - Endurance-focused
const halfIntermediate1: TrainingPlan = {
  id: 'half-intermediate-1',
  name: 'Intermediate 1',
  raceDistance: 'half',
  subtitle: 'Endurance-Focused Training',
  description: 'A 12-week plan with 5 running days, cross-training, mid-week pace runs, and long runs building to 12 miles.',
  difficulty: 3,
  totalWeeks: 12,
  peakMileage: 32,
  targetAudience: 'Runners who have completed a 5K or 10K and want to improve half marathon performance',
  weeks: [
    { weekNumber: 1, days: [w('cross', undefined, '30 min'), w('easy', 3), w('easy', 4), w('easy', 3), w('rest'), w('easy', 3), w('long', 4)] },
    { weekNumber: 2, days: [w('cross', undefined, '30 min'), w('easy', 3), w('pace', 4), w('easy', 3), w('rest'), w('pace', 3), w('long', 5)] },
    { weekNumber: 3, days: [w('cross', undefined, '40 min'), w('easy', 3.5), w('easy', 5), w('easy', 3.5), w('rest'), w('rest'), w('long', 6)] },
    { weekNumber: 4, days: [w('cross', undefined, '40 min'), w('easy', 3.5), w('pace', 5), w('easy', 3.5), w('rest'), w('easy', 3), w('long', 7)] },
    { weekNumber: 5, days: [w('cross', undefined, '40 min'), w('easy', 4), w('easy', 6), w('easy', 4), w('rest'), w('pace', 3), w('long', 8)] },
    { weekNumber: 6, days: [w('cross', undefined, '50 min'), w('easy', 4), w('pace', 6), w('easy', 4), w('rest'), w('rest'), w('race', 3.1, undefined, '5K Race')] },
    { weekNumber: 7, days: [w('rest'), w('easy', 4.5), w('easy', 7), w('easy', 4.5), w('rest'), w('pace', 4), w('long', 9)] },
    { weekNumber: 8, days: [w('cross', undefined, '50 min'), w('easy', 4.5), w('pace', 7), w('easy', 4.5), w('rest'), w('pace', 5), w('long', 10)] },
    { weekNumber: 9, days: [w('cross', undefined, '60 min'), w('easy', 5), w('easy', 8), w('easy', 5), w('rest'), w('rest'), w('race', 6.2, undefined, '10K Race')] },
    { weekNumber: 10, days: [w('rest'), w('easy', 5), w('pace', 8), w('easy', 5), w('rest'), w('pace', 5), w('long', 11)] },
    { weekNumber: 11, days: [w('cross', undefined, '60 min'), w('easy', 5), w('easy', 6), w('easy', 4), w('rest'), w('pace', 3), w('long', 12)] },
    { weekNumber: 12, label: 'Race Week', days: [w('rest'), w('easy', 4), w('pace', 4), w('easy', 2), w('rest'), w('rest'), w('race', 13.1, undefined, 'Half Marathon!')] },
  ],
};

// Half Marathon Intermediate 2 - Speed-focused with intervals
const halfIntermediate2: TrainingPlan = {
  id: 'half-intermediate-2',
  name: 'Intermediate 2',
  raceDistance: 'half',
  subtitle: 'Speed-Focused with Intervals',
  description: 'A 12-week plan with alternating tempo runs and interval workouts on Wednesdays, plus pace runs and long runs up to 12 miles.',
  difficulty: 3,
  totalWeeks: 12,
  peakMileage: 34,
  targetAudience: 'Experienced runners seeking faster half marathon times through structured speedwork',
  weeks: [
    { weekNumber: 1, days: [w('cross', undefined, '30 min'), w('easy', 3), w('intervals', 4, undefined, '5x400m'), w('easy', 3), w('rest'), w('pace', 3), w('long', 5)] },
    { weekNumber: 2, days: [w('cross', undefined, '30 min'), w('easy', 3), w('tempo', 4, '30 min'), w('easy', 3), w('rest'), w('pace', 3), w('long', 6)] },
    { weekNumber: 3, days: [w('cross', undefined, '40 min'), w('easy', 3.5), w('intervals', 4, undefined, '6x400m'), w('easy', 3), w('rest'), w('rest'), w('race', 3.1, undefined, '5K Race')] },
    { weekNumber: 4, days: [w('cross', undefined, '40 min'), w('easy', 3.5), w('tempo', 5, '35 min'), w('easy', 3), w('rest'), w('easy', 3), w('long', 7)] },
    { weekNumber: 5, days: [w('cross', undefined, '40 min'), w('easy', 4), w('intervals', 5, undefined, '7x400m'), w('easy', 3), w('rest'), w('pace', 3), w('long', 8)] },
    { weekNumber: 6, days: [w('cross', undefined, '50 min'), w('easy', 4), w('tempo', 5, '40 min'), w('easy', 3), w('rest'), w('rest'), w('race', 6.2, undefined, '10K Race')] },
    { weekNumber: 7, days: [w('rest'), w('easy', 4.5), w('intervals', 5, undefined, '8x400m'), w('easy', 3), w('rest'), w('pace', 4), w('long', 9)] },
    { weekNumber: 8, days: [w('cross', undefined, '50 min'), w('easy', 4.5), w('tempo', 5, '40 min'), w('easy', 3), w('rest'), w('pace', 5), w('long', 10)] },
    { weekNumber: 9, days: [w('cross', undefined, '60 min'), w('easy', 5), w('intervals', 6, undefined, '9x400m'), w('easy', 3), w('rest'), w('rest'), w('race', 9.3, undefined, '15K Race')] },
    { weekNumber: 10, days: [w('rest'), w('easy', 5), w('tempo', 6, '45 min'), w('easy', 3), w('rest'), w('pace', 5), w('long', 11)] },
    { weekNumber: 11, days: [w('cross', undefined, '60 min'), w('easy', 5), w('intervals', 6, undefined, '10x400m'), w('easy', 3), w('rest'), w('pace', 3), w('long', 12)] },
    { weekNumber: 12, label: 'Race Week', days: [w('rest'), w('easy', 4), w('tempo', 4, '30 min'), w('easy', 2), w('rest'), w('rest'), w('race', 13.1, undefined, 'Half Marathon!')] },
  ],
};

// Half Marathon Advanced - For competitive runners
const halfAdvanced: TrainingPlan = {
  id: 'half-advanced',
  name: 'Advanced',
  raceDistance: 'half',
  subtitle: 'For Competitive Runners',
  description: 'An intense 12-week plan with 6 days of running including hill repeats, intervals, tempo runs, and race pace work. Long runs reach 2 hours.',
  difficulty: 4,
  totalWeeks: 12,
  peakMileage: 40,
  targetAudience: 'Competitive runners with a strong base seeking significant half marathon time improvements',
  weeks: [
    { weekNumber: 1, days: [w('easy', 3), w('intervals', 5, undefined, '6x hill repeats'), w('easy', 3), w('tempo', 5, '40 min'), w('rest'), w('easy', 3), w('long', 10, undefined, '90 min run')] },
    { weekNumber: 2, days: [w('easy', 3), w('intervals', 5, undefined, '7x400m at 5K pace'), w('easy', 3), w('tempo', 6, '45 min'), w('rest'), w('pace', 3), w('long', 10, undefined, '90 min run')] },
    { weekNumber: 3, days: [w('easy', 3), w('intervals', 5, undefined, '7x hill repeats'), w('easy', 3), w('tempo', 4, '30 min'), w('rest'), w('rest'), w('race', 3.1, undefined, '5K Race')] },
    { weekNumber: 4, days: [w('easy', 3), w('intervals', 5, undefined, '8x400m at 5K pace'), w('easy', 3), w('tempo', 5, '40 min'), w('rest'), w('easy', 3), w('long', 10, undefined, '90 min run')] },
    { weekNumber: 5, days: [w('easy', 3), w('intervals', 6, undefined, '8x hill repeats'), w('easy', 3), w('tempo', 6, '45 min'), w('rest'), w('pace', 3), w('long', 10, undefined, '90 min run')] },
    { weekNumber: 6, days: [w('easy', 3), w('intervals', 5, undefined, '8x400m at 5K pace'), w('easy', 3), w('tempo', 4, '30 min'), w('rest'), w('rest'), w('race', 6.2, undefined, '10K Race')] },
    { weekNumber: 7, days: [w('easy', 3), w('intervals', 6, undefined, '4x800m at 10K pace'), w('easy', 3), w('tempo', 6, '45 min'), w('rest'), w('pace', 4), w('long', 12, undefined, '1:45 run')] },
    { weekNumber: 8, days: [w('easy', 3), w('intervals', 6, undefined, '3x1600m at race pace'), w('easy', 3), w('tempo', 7, '50 min'), w('rest'), w('pace', 5), w('long', 12, undefined, '1:45 run')] },
    { weekNumber: 9, days: [w('easy', 3), w('intervals', 6, undefined, '5x800m at 10K pace'), w('easy', 3), w('tempo', 4, '30 min'), w('rest'), w('rest'), w('race', 9.3, undefined, '15K Race')] },
    { weekNumber: 10, days: [w('easy', 3), w('intervals', 7, undefined, '4x1600m at race pace'), w('easy', 3), w('tempo', 7, '55 min'), w('rest'), w('pace', 5), w('long', 14, undefined, '2:00 run')] },
    { weekNumber: 11, days: [w('easy', 3), w('intervals', 7, undefined, '6x800m at 10K pace'), w('easy', 3), w('tempo', 8, '60 min'), w('rest'), w('pace', 3), w('long', 14, undefined, '2:00 run')] },
    { weekNumber: 12, label: 'Race Week', days: [w('easy', 3), w('intervals', 4, undefined, '6x400m at 5K pace'), w('easy', 2), w('tempo', 4, '30 min'), w('rest'), w('rest'), w('race', 13.1, undefined, 'Half Marathon!')] },
  ],
};

// Export half marathon plans
export const halfMarathonPlans: TrainingPlan[] = [
  halfNovice1,
  halfNovice2,
  halfIntermediate1,
  halfIntermediate2,
  halfAdvanced,
];

export const halfPlanById: Record<string, TrainingPlan> = {
  'half-novice-1': halfNovice1,
  'half-novice-2': halfNovice2,
  'half-intermediate-1': halfIntermediate1,
  'half-intermediate-2': halfIntermediate2,
  'half-advanced': halfAdvanced,
};
