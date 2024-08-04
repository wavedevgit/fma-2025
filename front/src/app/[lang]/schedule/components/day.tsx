import React from 'react'
import { DaySchedule } from './schedule'

const Day = ({
  dayLabel,
  daySchedule,
}:{
  dayLabel: string,
  daySchedule: DaySchedule,
}) => {
  return (
    <div className='flex flex-col'>
      <div className='mb-2'>
        {dayLabel}
      </div>
      {daySchedule.map((activity, index) => 
        <div 
          key={index} 
          className={`${activity?.bgColor} flex justify-center items-center outline outline-white outline-2`}
          style={{height: `${activity?.rowspan * 1.5}rem`}} 
        >
          {activity?.label}
        </div>
      )}
    </div>
  )
}

export default Day
