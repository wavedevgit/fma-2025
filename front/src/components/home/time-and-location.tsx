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
          du Samedi <span className='text-[#272162]'>20 Juillet</span> au <br/>
          Dimanche <span className='text-[#272162]'> 28 Juillet</span>
        </div>
      </div>

      <div 
        className='mb-5 md:pl-4 max-w-fit flex items-center justify-center space-x-1 animate-fade-up overflow-hidden transition-colors opacity-0' 
        style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
      >
        <Book className='h-16'/>
        
        <div className="text-sm text-gray-500 font-semibold py-4">
          Élèves de <br/>
          <span className='text-[#272162]'>troisième année collège</span>
        </div>
      </div>

      <div 
        className='mb-5 max-w-fit flex items-center justify-center space-x-1 animate-fade-up overflow-hidden transition-colors opacity-0' 
        style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
      >
        <Location />
        <div className="text-sm text-gray-500 font-semibold py-6">
          <span className='text-[#272162] inline'>Lycée Méditerranéen</span> <br/>
          LYMED, Martil
        </div>
      </div>
    </div>
  )
}

export default TimeAndLocation;
