"use client"

import { useEffect, useState } from "react"
import { FormSteps } from "./header/form-steps"
import { FormNavigation } from "./navigation/form-navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form } from "@/components/shared/form"
import { Button, Separator } from "@/components/shared"
import { toast } from "@/components/hooks/use-toast";
import { CreateOrJoinTeamStep } from "./steps/create-or-join-team"
import { CreateTeamForm } from "./steps/create-team-form"
import { JoinTeamForm } from "./steps/join-team-form"
import { createTeamDefaultValues, createTeamSchema } from "@/lib/schemas/create-team.schema"
import { joinTeamDefaultValues, joinTeamSchema } from "@/lib/schemas/join-team.schema"
import SummaryCard from "./steps/summary-step"

export const TeamForm = ({ 
  userData,
}: {
  userData: any,
}) => {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [formType, setFormType] = useState('')
  const delta = currentStep - previousStep
  
  const createTeamForm = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: createTeamDefaultValues,
    mode: "onChange",
  })

  const joinTeamForm = useForm<z.infer<typeof joinTeamSchema>>({
    resolver: zodResolver(joinTeamSchema),
    defaultValues: joinTeamDefaultValues,
    mode: "onChange",
  })

  const onSubmitCreateTeam = async (formData: z.infer<typeof createTeamSchema>) => {
    console.log('formData create', formData);
  }

  const onSubmitJoinTeam = async (formData: z.infer<typeof joinTeamSchema>) => {
    console.log('formData join', formData);
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
          formType={formType}
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
              <SummaryCard formData={createTeamForm.watch()} formType={formType} delta={delta} />
            )}

            {/* Submit Button */}
            {currentStep === 2 && (
              <div className='mt-20 text-center'> 
                <Button type="submit" className='text-lg md:w-1/4 lg:w-1/6 p-8'>
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
              <SummaryCard formData={joinTeamForm.watch()} formType={formType} delta={delta} />
            )}

            {/* Submit Button */}
            {currentStep === 2 && (
              <div className='mt-20 text-center'> 
                <Button type="submit" className='text-lg md:w-1/4 lg:w-1/6 p-8'>
                  <div>Join Team</div>
                </Button>
              </div>
            )}
          </form>
        </Form>
      )}

      {/* Navigation */}
      {currentStep == 1 && (
        <FormNavigation
          variant="button"
          currentStep={currentStep}
          form={formType === 'create' ? createTeamForm : formType === 'join' ? joinTeamForm : undefined}
          formType={formType}
          setPreviousStep={setPreviousStep} 
          setCurrentStep={setCurrentStep}
          setFormType={setFormType}
        />
      )}
    </section>
  )
}