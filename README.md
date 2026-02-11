# Marathon Trainer

A progressive web app that generates personalized marathon training plans based on Hal Higdon's proven methodology. Choose from 6 training plans (Novice 1/2, Intermediate 1/2, Advanced 1/2), set your race date, and get a complete 18-week schedule you can export directly to your calendar.

## Features

- **6 Training Plans** — Novice through Advanced levels based on Hal Higdon's programs
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
