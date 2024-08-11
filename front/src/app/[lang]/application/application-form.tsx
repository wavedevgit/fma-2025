import { useState } from "react"
import { motion } from 'framer-motion'
import { FormSteps } from "./form/header/form-steps"
import { FormNavigation } from "./form/navigation/form-navigation"
import { Step1 } from "./form/steps/step1"
import { Step2 } from "./form/steps/step2"
import { Step3 } from "./form/steps/step3"
import { Step4 } from "./form/steps/step4"
import { Step6 } from "./form/steps/step6"
import { Step5 } from "./form/steps/step5"




export const ApplicationForm = ({
  className,
}:{
  className?: string
}) => {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  

  return (
    <section className={`${className} w-full inset-0 flex flex-col justify-between mt-6`}>
      {/* Steps */}
      <FormSteps currentStep={currentStep} />

      {/* Navigation */}
      <FormNavigation
        currentStep={currentStep} 
        setPreviousStep={setPreviousStep} 
        setCurrentStep={setCurrentStep} 
      />

      {/* Form */}
      <form className='mt-12 py-12' onSubmit={() => console.log('submit')}>
        {currentStep === 0 && (
          <Step1 delta={delta} />
        )}

        {currentStep === 1 && (
          <Step2 delta={delta} />
        )}

        {currentStep === 2 && (
          <Step3 delta={delta} />
        )}

        {currentStep === 3 && (
          <Step4 delta={delta} />
        )}

        {currentStep === 4 && (
          <Step5 delta={delta} />
        )}

        {currentStep === 5 && (
          <Step6 delta={delta} />
        )}
      </form>
    </section>
  )
}