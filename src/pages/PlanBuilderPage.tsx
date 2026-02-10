import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'
import { StepPlanSelect } from '../components/wizard/StepPlanSelect'
import { StepDateConfig } from '../components/wizard/StepDateConfig'
import { StepCustomize } from '../components/wizard/StepCustomize'
import { StepPreview } from '../components/wizard/StepPreview'
import { ThemeToggle } from '../components/ThemeToggle'
import { UnitToggle } from '../components/UnitToggle'

const STEPS = ['Select Plan', 'Set Dates', 'Customize', 'Preview']

export function PlanBuilderPage() {
  const navigate = useNavigate()
  const { wizardStep, setWizardStep, planConfig } = useStore()

  const canProceed = (): boolean => {
    switch (wizardStep) {
      case 0: return !!planConfig?.planId
      case 1: return !!planConfig?.raceDate
      case 2: return true
      case 3: return true
      default: return false
    }
  }

  const handleNext = () => {
    if (wizardStep < STEPS.length - 1) {
      setWizardStep(wizardStep + 1)
    } else {
      navigate('/plan')
    }
  }

  const handleBack = () => {
    if (wizardStep > 0) {
      setWizardStep(wizardStep - 1)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-4 no-print">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-white/80 hover:text-white transition-colors">
            &larr; Home
          </button>
          <h1 className="text-lg font-semibold">Create Training Plan</h1>
          <div className="flex items-center gap-3">
            <UnitToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-4 no-print">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, i) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    i < wizardStep
                      ? 'bg-secondary text-white'
                      : i === wizardStep
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {i < wizardStep ? '\u2713' : i + 1}
                </div>
                <span className={`ml-2 text-sm hidden sm:inline ${
                  i === wizardStep ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                    i < wizardStep ? 'bg-secondary' : 'bg-gray-200 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <main className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {wizardStep === 0 && <StepPlanSelect />}
          {wizardStep === 1 && <StepDateConfig />}
          {wizardStep === 2 && <StepCustomize />}
          {wizardStep === 3 && <StepPreview />}
        </div>
      </main>

      {/* Navigation Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-4 px-4 no-print">
        <div className="max-w-4xl mx-auto flex justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            &larr; Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-8 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {wizardStep === STEPS.length - 1 ? 'Finish & View Plan' : 'Next \u2192'}
          </button>
        </div>
      </div>
    </div>
  )
}
