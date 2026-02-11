# Marathon Trainer

A progressive web app that generates personalized training plans based on Hal Higdon's proven methodology. Choose from marathon, half marathon, and 5K plans, set your race date, and get a complete schedule you can export directly to your calendar.

**Live at [marathon.fontlabs.ca](https://marathon.fontlabs.ca)**

## Features

- **Multiple Distances** — Marathon, Half Marathon, and 5K training plans
- **Multiple Levels** — Novice through Advanced levels based on Hal Higdon's programs
- **Customizable Schedule** — Set your race date and the plan builds around it
- **Calendar Export** — One-click export to Google Calendar, Apple Calendar, or any ICS-compatible app
- **Progress Tracking** — Check off completed workouts as you train
- **Dark Mode** — Full light/dark theme support
- **Unit Toggle** — Switch between miles and kilometers
- **PWA** — Install on your phone and use offline

## Tech Stack

- React 19, TypeScript, Vite 7
- Tailwind CSS 4
- Zustand (state management with localStorage persistence)
- date-fns, ics
- vite-plugin-pwa

## Getting Started

```bash
npm install
npm run dev
```

## Building for Production

```bash
npm run build
npm run preview
```
