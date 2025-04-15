'use client'

interface ProgressIndicatorProps {
  currentStep: number
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="flex justify-center items-center gap-4 max-w-md mx-auto px-20 mb-6">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`h-1 rounded-full transition-all duration-300 w-1/3 ${
            step <= currentStep ? 'bg-[#9200ad]' : 'bg-[#dbdde2]'
          }`}
        />
      ))}
    </div>
  )
}
