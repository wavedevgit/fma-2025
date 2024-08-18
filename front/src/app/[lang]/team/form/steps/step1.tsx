import { motion } from 'framer-motion'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form"
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "@/components/shared/select"
import { Input, Separator, Textarea } from "@/components/shared"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/popover"
import { Calendar } from "@/components/shared"
import { CalendarIcon } from "@radix-ui/react-icons"
import { PhoneInput } from "@/components/shared/phone-input"
import { cn } from '@/lib/utils'
import { Button } from "@/components/shared"
import { format } from "date-fns"

const regions = [
  {label: "Tanger-Tétouan-Al Hoceïma", value:"tanger-tetouan-al-houceima"},
  {label: "Oriental", value:"oriental"},
  {label: "Fès-Meknès", value:"fes-meknes"},
  {label: "Rabat-Salé-Kénitra", value:"rabat-sale-kenitra"},
  {label: "Béni Mellal-Khénifra", value:"beni-mellal-khenifra"},
  {label: "Casablanca-Settat", value:"casablanca-settat"},
  {label: "Marrakech-Safi", value:"marrakech-safi"},
  {label: "Drâa-Tafilalet", value:"draa-tafilalet"},
  {label: "Souss-Massa", value:"souss-massa"},
  {label: "Guelmim-Oued Noun", value:"guelmim-oued-noun"},
  {label: "Laâyoune-Sakia El Hamra", value:"laayoune-sakia-el-hamra"},
  {label: "Dakhla-Oued Eddahab", value:"dakhla-oued-eddahab"},
  {label: "Abroad", value:"abroad"},
]

const relationshipsWithGuardian = [
  {label: "Père", value:"father"},
  {label: "Mère", value:"mother"},
  {label: "Tuteur", value:"guardian"},
]

const RequiredAsterisk = () => <span className="text-red-500"> * </span>;

export const Step1 = ({
  delta,
}:{
  delta: number
}) => {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className='text-base font-semibold leading-7 text-[#0284C7]'>
        Team Selection
      </h2>
      <p className='mt-1 text-sm leading-6 text-gray-600'>
        Choose whether you want to create a new team or join an existing one
        <Separator className='mt-4 bg-[#0284C7]'/>
      </p>

      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between'>
      </div>
    </motion.div>
  )
}