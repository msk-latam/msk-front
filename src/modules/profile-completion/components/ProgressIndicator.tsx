'use client'

interface ProgressIndicatorProps {
  currentStep: number
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="flex justify-center items-center gap-4 mb-8">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`h-1 rounded-full transition-all duration-300 w-full max-w-[100px] ${
            step <= currentStep ? 'bg-purple-600' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}
