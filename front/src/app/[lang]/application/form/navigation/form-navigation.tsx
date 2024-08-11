import { Dispatch, SetStateAction } from "react"
import { steps } from "../header/steps"

export const FormNavigation = ({
  currentStep,
  setPreviousStep,
  setCurrentStep
}:{
  currentStep: number,
  setPreviousStep: Dispatch<SetStateAction<number>>,
  setCurrentStep: Dispatch<SetStateAction<number>>,
}) => {
  const next = async () => {
    // const fields = steps[currentStep].fields
    // const output = await trigger(fields as FieldName[], { shouldFocus: true })

    // if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        // await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <div className='mt-8 pt-5'>
      <div className='flex justify-between'>
        <button
          type='button'
          onClick={prev}
          disabled={currentStep === 0}
          className='rounded bg-white px-2 py-1 text-sm font-semibold text-blue-900 shadow-sm ring-1 ring-inset ring-blue-500 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 19.5L8.25 12l7.5-7.5'
            />
          </svg>
        </button>
        <button
          type='button'
          onClick={next}
          disabled={currentStep === steps.length - 1}
          className='rounded bg-white px-2 py-1 text-sm font-semibold text-blue-900 shadow-sm ring-1 ring-inset ring-blue-500 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 4.5l7.5 7.5-7.5 7.5'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}