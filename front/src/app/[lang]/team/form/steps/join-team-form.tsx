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
import { Input, Separator } from "@/components/shared"
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "@/components/shared/select"

const educationLevels = [
  {label: "Tronc commun", value:"tronc-commun"},
  {label: "1ère année Bac", value:"1bac"},
  {label: "2ème année Bac", value:"2bac"},
]

const RequiredAsterisk = () => <span className="text-red-500"> * </span>;

export const JoinTeamForm = ({
  form,
  delta,
}:{
  form: UseFormReturn<any>,
  delta: number
}) => {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        Join an existing Team
      </h2>

      <p className='mt-1 text-sm leading-6 text-gray-600'>
        Provide informations about your studies
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>

      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between'>
        {/* Education Level */}
        <FormField
          control={form.control}
          name="teamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teams <RequiredAsterisk /></FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectGroup>
                      <SelectLabel>Education Levels</SelectLabel>
                      {educationLevels.map(level =>
                        <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select> 
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Access Code */}
        <FormField
          control={form.control}
          name="accessCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Access Code <RequiredAsterisk /></FormLabel>
              <FormControl>
                <Input placeholder="Highschool" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                You will be given an access code from your team leader as a permission to access this team
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  )
}