import { motion } from 'framer-motion'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form"
import { Checkbox, Separator } from '@/components/shared'

const RequiredAsterisk = () => <span className="text-red-500"> * </span>;

export const ValidationStep = ({
  form,
  delta,
}:{
  form: UseFormReturn,
  delta: number
}) => {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        Validation
      </h2>
      <p className='mt-1 text-sm leading-6 text-gray-600'>
        Read carefully our Terms of Agreement and validate your application 
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>

      <div className='mt-10 grid grid-cols-1 md:grid-cols-2md:grid-cols-2 gap-8 justify-between'>
        <FormField
          control={form.control}
          name="termsAgreement"
          render={({ field }) => (
            <div className="space-y-2">
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Terms of Agreement <RequiredAsterisk />
                  </FormLabel>
                  <FormDescription>
                  I confirm that I have read the competition regulations in full and commit to abide by them.<br/> 
                  In particular, I undertake to be present on the UM6P Benguérir campus for the entire duration of the competition (except for any derogation requested by email and explicitly approved by the organizing committee).<br/>
                  I acknowledge that providing false or incomplete information may result the automatic refusal of my application, the interdiction to compete and/or the withdrawal of prizes.
                  </FormDescription>
                </div>
              </FormItem>
              <FormMessage />
            </div>
          )}
        />
      </div>
    </motion.div>
  )
}