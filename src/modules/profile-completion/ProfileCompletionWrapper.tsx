'use client'

import { useState } from 'react'
import Step1BasicInfo from './components/Step1BasicInfo'
import Step2Professional from './components/Step2Professional'
import Step3Interests from './components/Step3Interests'
import Step4Recommendations from './components/Step4Recommendations'
import ProgressIndicator from './components/ProgressIndicator'

type FormDataType = {
  profession?: string
  specialty?: string
  country?: string
  phone?: string
  workplace?: string
  workArea?: string
  isMemberOfAssociation?: boolean
  associationName?: string
  interests?: string[]
}

export default function ProfileCompletionWrapper() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormDataType>({})

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)
  const skipProfile = () => {
    // Redirige o marca como completo sin llenar
    console.log('Perfil omitido')
  }

  const updateFormData = (data: Partial<FormDataType>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="w-full bg-white md:rounded-3xl rounded-t-3xl  shadow-md -mt-[40px] md:-mt-20 md:mx-20 z-[1] relative overflow-visible max-w-[1600px]">
    


      {step === 1 && (
        <Step1BasicInfo
          data={formData}
          onNext={nextStep}
          onSkip={skipProfile}
          onUpdate={updateFormData}
        />
      )}
      {step === 2 && (
        <Step2Professional
        data={formData}
        onNext={nextStep}
        onBack={prevStep}
        onUpdate={updateFormData}
        onSkip={() => {
          // lógica cuando el usuario quiera omitir
          nextStep() // o lo que necesites
        }}
      />
      
      )}
      {step === 3 && (
        <Step3Interests
          data={formData}
          onNext={nextStep}
          onBack={prevStep}
          onUpdate={updateFormData}
        />
      )}
      {step === 4 && (
        <Step4Recommendations
          
          onBack={prevStep}
        />
      )}
    </div>
    
  )
}
