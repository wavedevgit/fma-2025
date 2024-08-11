import { motion } from 'framer-motion'

export const Step5 = ({
  delta
}:{
  delta: number
}) => {
  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className='text-base font-semibold leading-7 text-gray-900'>
        Team
      </h2>
      <p className='mt-1 text-sm leading-6 text-gray-600'>
        Provide informations about your team
      </p>

      <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
        Fields...
      </div>
    </motion.div>
  )
}