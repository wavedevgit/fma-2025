import React from 'react'
import { Book, Calendar, Location } from '@/components/shared/icons'

const TimeAndLocation = () => {
  return (
    <div className='z-10 px-16 md:px-0 md:flex items-center md:justify-center w-full'>
      <div 
        className='mb-5 max-w-fit flex items-center justify-center space-x-1 animate-fade-up overflow-hidden transition-colors opacity-0' 
        style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
      >
        <Calendar />
        <div className="text-sm text-gray-500 font-semibold py-6">
          Sunday <span className='text-[#272162]'>July 28th</span> to <br/>
          Thursday <span className='text-[#272162]'> August 1st</span>
        </div>
      </div>

      <div 
        className='mb-5 md:pl-4 max-w-fit flex items-center justify-center space-x-1 animate-fade-up overflow-hidden transition-colors opacity-0' 
        style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
      >
        <Book className='h-16'/>
        
        <div className="text-sm text-gray-500 font-semibold py-4">
          Top Students from <br/>
          <span className='text-[#272162]'>Bac+1</span> to <span className='text-[#272162]'>Bac+4</span>
        </div>
      </div>

      <div 
        className='mb-5 max-w-fit flex items-center justify-center space-x-1 animate-fade-up overflow-hidden transition-colors opacity-0' 
        style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
      >
        <Location />
        <div className="text-sm text-gray-500 font-semibold py-6">
          <span className='text-[#272162] inline'>UM6P | College of Computing</span> <br/>
          Benguerir
        </div>
      </div>
    </div>
  )
}

export default TimeAndLocation;
