interface ResultCardProps {
  label: string
  value: string
  highlight?: boolean
  subLabel?: string
  subValue?: string
}

export default function ResultCard({ label, value, highlight, subLabel, subValue }: ResultCardProps) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <p className={`text-xs font-medium uppercase tracking-wide mb-1 ${highlight ? 'text-blue-100' : 'text-gray-500'}`}>
        {label}
      </p>
      <p className={`text-2xl font-bold ${highlight ? 'text-white' : 'text-gray-900'}`}>{value}</p>
      {subLabel && subValue && (
        <p className={`text-xs mt-1 ${highlight ? 'text-blue-200' : 'text-gray-400'}`}>
          {subLabel}: {subValue}
        </p>
      )}
    </div>
  )
}
