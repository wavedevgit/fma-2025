"use client"

import { useEffect, useState } from "react"
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
import { CreateOrJoinTeamStep } from "./steps/create-or-join-team"
import { CreateTeamForm } from "./steps/create-team-form"
import { JoinTeamForm } from "./steps/join-team-form"

export const TeamForm = ({ 
  userData,
}: {
  userData: any,
}) => {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [formType, setFormType] = useState('')
  const delta = currentStep - previousStep
  
  const createTeamForm = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange",
  })

  const joinTeamForm = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: userData?.application 
      ? {...sanitizeApplication(userData?.application), firstName: userData?.firstName, lastName: userData?.lastName} 
      : getApplicationDefaultValues(userData),
    mode: "onChange",
  })

  const onSubmitCreateTeam = async (formData: z.infer<typeof applicationSchema>) => {
    console.log('formData', formData);
  }

  const onSubmitJoinTeam = async (formData: z.infer<typeof applicationSchema>) => {
    console.log('formData', formData);
  }
  
  const onError = async (errors: any) => {
    toast({
      title: "The form is invalid",
      description: "Not all required fields have been filled in.",
      variant: 'destructive',
    })
  }

  useEffect(() => {
    if (formType) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [formType])

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
      {currentStep >= 1 && (
        <FormNavigation
          currentStep={currentStep}
          form={formType === 'create' ? createTeamForm : formType === 'join' ? joinTeamForm : undefined}
          setPreviousStep={setPreviousStep} 
          setCurrentStep={setCurrentStep}
          setFormType={setFormType}
        />
      )}

      {/* Forms */}

      {currentStep === 0 && (
        <CreateOrJoinTeamStep delta={delta} setFormType={setFormType} />
      )}
      
      {formType === 'create' && (
        <Form {...createTeamForm}>
          <form className='mt-6' onSubmit={createTeamForm.handleSubmit(onSubmitCreateTeam, onError)}>
            {currentStep === 1 && (
              <CreateTeamForm form={createTeamForm} delta={delta} />
            )}

            {currentStep === 2 && (
              "Validation Create Team"
            )}

            {/* Submit Button */}
            {currentStep === 2 && (
              <div className='mt-20 text-center'> 
                <Button type="submit">
                  <div>Create Team</div>
                </Button>
              </div>
            )}
          </form>
        </Form>
      )}

      {formType === 'join' && (
        <Form {...joinTeamForm}>
          <form className='mt-6' onSubmit={joinTeamForm.handleSubmit(onSubmitJoinTeam, onError)}>
            {currentStep === 1 && (
              <JoinTeamForm form={joinTeamForm} delta={delta} />
            )}

            {currentStep === 2 && (
              "Validation Join Team"
            )}

            {/* Submit Button */}
            {currentStep === 2 && (
              <div className='mt-20 text-center'> 
                <Button type="submit">
                  <div>Join Team</div>
                </Button>
              </div>
            )}
          </form>
        </Form>
      )}

      {/* Navigation */}
      {currentStep >= 1 && (
        <FormNavigation
          variant="button"
          currentStep={currentStep}
          form={formType === 'create' ? createTeamForm : formType === 'join' ? joinTeamForm : undefined}
          setPreviousStep={setPreviousStep} 
          setCurrentStep={setCurrentStep}
          setFormType={setFormType}
        />
      )}
    </section>
  )
}