'use client'

interface InputFieldProps {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  prefix?: string
  suffix?: string
  formatValue?: (v: number) => string
}

export default function InputField({
  label, value, onChange, min, max, step = 1, prefix, suffix, formatValue,
}: InputFieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={`${id}-number`} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex items-center gap-1">
          {prefix && <span className="text-sm text-gray-500">{prefix}</span>}
          <input
            id={`${id}-number`}
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            aria-label={label}
            title={label}
            onChange={e => {
              const v = Number(e.target.value)
              if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)))
            }}
            className="w-28 text-right text-sm font-semibold border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {suffix && <span className="text-sm text-gray-500">{suffix}</span>}
        </div>
      </div>
      <input
        id={`${id}-range`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={`${label} slider`}
        title={`${label} slider`}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{prefix}{min.toLocaleString('en-IN')}{suffix}</span>
        <span>{prefix}{max.toLocaleString('en-IN')}{suffix}</span>
      </div>
    </div>
  )
}