"use client"

import { useState } from "react"
import { FormSteps } from "./header/form-steps"
import { FormNavigation } from "./navigation/form-navigation"
import { PersonalInformationStep, EducationStep, CompetitionStep, UploadStep, ValidationStep } from "./steps"
import { useForm } from "react-hook-form"
import { applicationSchema, getApplicationDefaultValues } from "@/lib/schemas/application.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { excludeFileFields, sanitizeApplication } from "@/lib/utils"
import { z } from "zod"
import { Form } from "@/components/shared/form"
import { Button, Separator } from "@/components/shared"
import { toast } from "@/components/hooks/use-toast";
import { postApplication, putApplication } from "@/api/ApplicationApi"
import { useRouter } from "next/navigation"

export const ApplicationForm = ({ 
  userData,
}: {
  userData: any,
}) => {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()
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

  const onSave = async () => {
    const application = form.watch()

    try {
      const applicationResponse = userData?.application
        ? await putApplication(application?.id, excludeFileFields(application)) as any
        : await postApplication({userId: userData.id, ...application}) as any
      ;

      if (applicationResponse?.statusCode !== 200) {
        throw new Error('Post of application failed')
      }

      toast({
        title: 'Application saved successfully',
        description: 'You can access your current application in your profile page',
      });
      
      router.push('/profile/application')
      setTimeout(() => {
        window.location.reload();
      }, 500)
    } catch(err: any) {
      toast({
        title: 'Application submission failed',
        description: err?.message,
        variant: 'destructive'
      });
    }    
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
          <h2 className="text-2xl font-bold tracking-tight">Application</h2>
          <div className="text-muted-foreground">
            Follow the steps below to complete your application
          </div>
        </div>

        <div>
          <Button onClick={onSave}>Save as Draft</Button>
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
          {/* Personal informations */}
          {currentStep === 0 && (
            <PersonalInformationStep form={form} delta={delta} />
          )}

          {currentStep === 1 && (
            <EducationStep form={form} delta={delta} />
          )}

          {currentStep === 2 && (
            <CompetitionStep form={form} delta={delta} />
          )}

          {currentStep === 3 && (
            <UploadStep form={form} delta={delta} />
          )}

          {currentStep === 4 && (
            <ValidationStep form={form} delta={delta} />
          )}

          {/* Submit Button */}
          {currentStep === 4 && (
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