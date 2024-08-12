"use client"

import { useState } from "react"
import { FormSteps } from "./form/header/form-steps"
import { FormNavigation } from "./form/navigation/form-navigation"
import { Step1 } from "./form/steps/step1"
import { Step2 } from "./form/steps/step2"
import { Step3 } from "./form/steps/step3"
import { Step4 } from "./form/steps/step4"
import { Step6 } from "./form/steps/step6"
import { Step5 } from "./form/steps/step5"
import { useForm } from "react-hook-form"
import { applicationSchema, getApplicationDefaultValues } from "@/lib/schemas/application-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { sanitizeApplication } from "@/lib/utils"
import { z } from "zod"
import { Form } from "@/components/shared/form"

export const ApplicationForm = ({ 
  userData,
}: {
  userData: any,
}) => {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: userData?.application 
      ? {...sanitizeApplication(userData?.application), firstName: userData?.firstName, lastName: userData?.lastName} 
      : getApplicationDefaultValues(userData),
    mode: "onChange",
  })

  return (
    <section className='w-full inset-0 flex flex-col justify-between mt-6'>
      {/* Steps */}
      <FormSteps currentStep={currentStep} />

      {/* Navigation */}
      <FormNavigation
        currentStep={currentStep} 
        setPreviousStep={setPreviousStep} 
        setCurrentStep={setCurrentStep} 
      />

      {/* Form */}
      <Form {...form}>
        <form className='mt-6' onSubmit={() => console.log('submit')}>
          {/* Personal informations */}
          {currentStep === 0 && (
            <Step1 form={form} delta={delta} />
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
      </Form>

      {/* Navigation */}
      <FormNavigation
        variant="button"
        currentStep={currentStep} 
        setPreviousStep={setPreviousStep} 
        setCurrentStep={setCurrentStep} 
      />
    </section>
  )
}