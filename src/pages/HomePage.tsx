import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'
import { ThemeToggle } from '../components/ThemeToggle'
import { UnitToggle } from '../components/UnitToggle'

export function HomePage() {
  const navigate = useNavigate()
  const { planConfig, resetAll } = useStore()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white py-6 px-4 text-center no-print">
        <div className="flex justify-end gap-3 max-w-2xl mx-auto">
          <UnitToggle />
          <ThemeToggle />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Race Trainer</h1>
        <p className="mt-2 text-blue-100 text-lg">
          Half marathon & marathon plans based on Hal Higdon's methodology
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">&#127939;</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Race Journey Starts Here
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-lg mx-auto">
              Generate a personalized training plan for your half marathon or marathon,
              preview your schedule, and export it directly to your calendar.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/build')}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Create New Plan
            </button>
            {planConfig && (
              <button
                onClick={() => navigate('/plan')}
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-primary font-semibold py-4 px-8 rounded-xl text-lg transition-colors border-2 border-primary"
              >
                View Current Plan
              </button>
            )}
          </div>

          {planConfig && (
            <div className="text-center">
              <button
                onClick={() => resetAll()}
                className="text-sm text-gray-400 hover:text-danger transition-colors"
              >
                Reset saved plan
              </button>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <FeatureCard
              icon="&#128197;"
              title="11 Plans"
              description="Half marathon & marathon plans from Novice to Advanced"
            />
            <FeatureCard
              icon="&#128228;"
              title="Calendar Export"
              description="One-click export to Google Calendar or Apple Calendar"
            />
            <FeatureCard
              icon="&#9989;"
              title="Track Progress"
              description="Check off completed workouts and monitor your training"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-400 text-sm no-print">
        Built with Hal Higdon's training methodology
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
      <div className="text-3xl mb-3" dangerouslySetInnerHTML={{ __html: icon }} />
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}
