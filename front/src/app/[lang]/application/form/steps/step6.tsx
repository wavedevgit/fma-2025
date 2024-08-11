import { motion } from 'framer-motion'

export const Step6 = ({
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
        Complete
      </h2>
      <p className='mt-1 text-sm leading-6 text-gray-600'>
        Congratulations, your application is submitted
      </p>
    </motion.div>
  )
}