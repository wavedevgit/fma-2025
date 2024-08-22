import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shared/card"
import { camelCaseToText } from '@/lib/utils'
import { Label } from '@/components/shared'
import { motion } from 'framer-motion'

const SummaryField = (key: string, value: string) => {
  return (
    <div key={key}>
      <Label className='text-lg'>{camelCaseToText(key)}</Label>
      <div>{value}</div>
      <span className='text-gray-500'>{!value && '(not defined)'}</span>
    </div>
  )
}

const SummaryCard = ({
  formData, 
  formType,
  delta,
}:{
  formData: z.infer<any>,
  formType: string,
  delta: number,
}) => {
  const formKeys = Object.keys(formData);

  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>{formType === 'create' ? 'Team Creation' : 'Team Join'}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 justify-between'>
            {formKeys.map((key) => 
              <div key={key}>
                <Label>{camelCaseToText(key)}</Label>
                <div className='text-lg'>{formData[key]}</div>
                <span className='text-gray-500'>{!formData[key] && '(not defined)'}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
    
  )
}

export default SummaryCard
