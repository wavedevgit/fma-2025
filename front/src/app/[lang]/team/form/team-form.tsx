"use client"

import { useState } from "react"
import { FormSteps } from "./header/form-steps"
import { FormNavigation } from "./navigation/form-navigation"
import { useForm } from "react-hook-form"
import { applicationSchema, getApplicationDefaultValues } from "@/lib/schemas/application-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { sanitizeApplication } from "@/lib/utils"
import { z } from "zod"
import { Form } from "@/components/shared/form"
import { Button, Separator } from "@/components/shared"
import { toast } from "@/components/hooks/use-toast";
import { Step1 } from "./steps/step1"

export const TeamForm = ({ 
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

  const onSubmit = async (formData: z.infer<typeof applicationSchema>) => {
    console.log('formData', formData);
  }
  
  const onError = async (errors: any) => {
    toast({
      title: "The form is invalid",
      description: "Not all required fields have been filled in.",
      variant: 'destructive',
    })
  }

  return (
    <section className='w-full inset-0 flex flex-col justify-between mt-6'>
      {/* Header */}
      <div className="flex justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Team Selection</h2>
          <div className="text-muted-foreground">
            Follow the steps below to create or join a team
          </div>
        </div>
      </div>
        
      <Separator className="my-6" />

      {/* Steps */}
      <FormSteps currentStep={currentStep} />

      {/* Navigation */}
      <FormNavigation
        currentStep={currentStep}
        form={form}
        setPreviousStep={setPreviousStep} 
        setCurrentStep={setCurrentStep} 
      />

      {/* Form */}
      <Form {...form}>
        <form className='mt-6' onSubmit={form.handleSubmit(onSubmit, onError)}>
          {currentStep === 0 && (
            <Step1 delta={delta} />
          )}

          {currentStep === 1 && (
            "Step 2"
          )}

          {currentStep === 2 && (
            "Step 3"
          )}

          {/* Submit Button */}
          {currentStep === 2 && (
            <div className='mt-20 text-center'> 
              <Button type="submit">
                <div>Submit Application</div>
              </Button>
            </div>
          )}
        </form>
      </Form>
      
      {/* Navigation */}
      <FormNavigation
        variant="button"
        form={form}
        currentStep={currentStep} 
        setPreviousStep={setPreviousStep} 
        setCurrentStep={setCurrentStep} 
      />
    </section>
  )
}