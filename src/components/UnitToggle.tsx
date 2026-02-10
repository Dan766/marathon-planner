import { useStore } from '../store/store'

export function UnitToggle() {
  const { unit, setUnit } = useStore()

  return (
    <div className="inline-flex rounded-md border border-white/30 text-sm overflow-hidden">
      <button
        onClick={() => setUnit('mi')}
        className={`px-2 py-0.5 transition-colors ${
          unit === 'mi'
            ? 'bg-white/20 text-white font-medium'
            : 'text-white/60 hover:text-white/80'
        }`}
      >
        mi
      </button>
      <button
        onClick={() => setUnit('km')}
        className={`px-2 py-0.5 transition-colors ${
          unit === 'km'
            ? 'bg-white/20 text-white font-medium'
            : 'text-white/60 hover:text-white/80'
        }`}
      >
        km
      </button>
    </div>
  )
}
