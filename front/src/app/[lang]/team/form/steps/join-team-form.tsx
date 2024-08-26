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
import { Button, Input, Separator } from "@/components/shared"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shared/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/popover"
import { cn } from '@/lib/utils'
import { Team } from '@/types/team.type'

const RequiredAsterisk = () => <span className="text-red-500"> * </span>;

export const JoinTeamForm = ({
  form,
  teams,
  delta,
}:{
  form: UseFormReturn<any>,
  teams: Team[],
  delta: number
}) => {
  const teamsOptions = teams?.map(team => ({
    label: team?.name,
    value: team?.id.toString(),
    leader: `${team?.leader?.firstName} ${team?.leader?.lastName}`
  }))

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
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? teamsOptions.find(
                            (team) => team.value === field.value
                          )?.label
                        : "Select a team"
                      }
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-full md:w-[20rem] lg:w-[30rem] p-0">
                  <Command>
                    <CommandInput placeholder="Search team..." />
                    <CommandList>
                      <CommandEmpty>No Team found.</CommandEmpty>
                      <CommandGroup>
                        {teamsOptions.map((team) => (
                          <CommandItem
                            value={team.label}
                            key={team.value}
                            onSelect={() => {
                              form.setValue("teamId", team.value)
                            }}
                          > 
                            <div>
                              <div className='flex'>
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    team.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {team.label}
                              </div>

                              <div className='ml-6'> <span className='text-gray-500'>Created By: </span>{team.leader}</div>
                            </div>
                            
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>

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
                <Input placeholder="Enter your access code" {...field} />
              </FormControl>
              <FormDescription>
                You will be given an access code from your team leader as a permission to access this team
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  )
}