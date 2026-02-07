import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'

export function HomePage() {
  const navigate = useNavigate()
  const { planConfig, resetAll } = useStore()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white py-6 px-4 text-center no-print">
        <h1 className="text-3xl font-bold tracking-tight">Marathon Trainer</h1>
        <p className="mt-2 text-blue-100 text-lg">
          Personalized training plans based on Hal Higdon's methodology
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">&#127939;</div>
            <h2 className="text-2xl font-bold text-gray-900">
              Your Marathon Journey Starts Here
            </h2>
            <p className="text-gray-600 text-lg max-w-lg mx-auto">
              Generate a personalized 18-week training plan, preview your schedule,
              and export it directly to your calendar.
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
                className="bg-white hover:bg-gray-50 text-primary font-semibold py-4 px-8 rounded-xl text-lg transition-colors border-2 border-primary"
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
              title="6 Plans"
              description="From Novice to Advanced, based on Hal Higdon's proven methodology"
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
        Built with Hal Higdon's marathon training methodology
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
      <div className="text-3xl mb-3" dangerouslySetInnerHTML={{ __html: icon }} />
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  )
}
