import { motion } from 'framer-motion'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form"
import { Separator, Textarea } from "@/components/shared"
import { RadioGroup, RadioGroupItem } from '@/components/shared/radio-group';

const RequiredAsterisk = () => <span className="text-red-500"> * </span>;

export const CompetitionStep = ({
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
        Competition
      </h2>
      <p className='mt-1 text-sm leading-6 text-gray-600'>
        Provide informations about your previous competitions
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between'>
        {/* Has Previously Participated */}
        <FormField
          control={form.control}
          name="hasPreviouslyParticipated"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Have you participated in competitions before (Olympiads, national contests...) ? <RequiredAsterisk /></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Previous Participations */}
        <FormField
          control={form.control}
          name="previousCompetitions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If yes, please specify which ones and the achieved result.</FormLabel>
              <FormControl>
              <Textarea
                placeholder="Tell us about your achievements"
                className="resize-none"
                {...field}
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Has Previously Participated in MMC */}
        <FormField
          control={form.control}
          name="hasPreviouslyParticipatedInMtym"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Have you participated in MTYM in Mai 2024 ? <RequiredAsterisk /></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="not-selected" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      I applied but i wasn&apos;t selected
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='mt-10 grid grid-cols-1 gap-4 justify-between'>
        {/* Motivations */}
        <FormField
          control={form.control}
          name="motivations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tell us about your motivations to participate in the competition ? <RequiredAsterisk /></FormLabel>
              <FormControl>
              <Textarea
                placeholder="Max 300 words"
                className="resize-none"
                {...field}
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='mt-10 grid grid-cols-1 gap-4 justify-between'>
        {/* Comments */}
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks / Comments</FormLabel>
              <FormControl>
              <Textarea
                placeholder="Anything to add ?"
                className="resize-none"
                {...field}
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  )
}