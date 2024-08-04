"use client"

import React from 'react'
import { Button } from '@/components/shared';
import { useRouter } from 'next/navigation';

const Informations = () => {
  const router = useRouter();

  return (
    <>
      <div
        className="drop-shadow-sm md:flex"
      >
        <div className="w-full md:text-xl py-4 space-y-4">
          <p className="md:w-3/4">Des séances de haut niveau en mathématiques, une introduction à l&apos;informatique, des ateliers, des conférences, des projets… vous attendent dans le cadre d&apos;un programme stimulant et ludique à la fois.</p>
          <div>
            <button
              className="p-[3px] relative"
              onClick={() => router.push('/schedule')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-[#272162] rounded-lg" />
              <div className="px-8 py-2 bg-white rounded-[6px] relative group transition duration-200 text-black hover:bg-transparent hover:text-white">
                Découvrez le programme complet
              </div>
            </button>
          </div>
        </div>

        <div className="w-full md:leading-[4rem] font-medium text-4xl md:text-5xl">
          <p><span className='bg-gradient-to-br from-sky-500 to-[#272162] inline-block text-transparent bg-clip-text'>40+</span> Participants</p>
          <p><span className='bg-gradient-to-br from-sky-500 to-[#272162] inline-block text-transparent bg-clip-text'>1</span> semaine entièrement prise en charge</p>
        </div>
      </div>
    </>
  )
}

export default Informations
