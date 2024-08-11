"use client"

import React from 'react'
import { Button } from '@/components/shared';
import { MeteorCard } from './meteor-card';
import { useRouter } from 'next/navigation';

const Informations = () => {
  const router = useRouter();

  return (
    <>
      <div
        className="drop-shadow-sm md:flex"
      >
        <div className="w-full md:text-xl py-4 space-y-4">
          <p className="md:w-3/4">Get ready for two contest days, inspiring conferences, fun activities, and memorable moments. Explore what awaits you in our exciting schedule.</p>
          <div>
            <button
              className="p-[3px] relative"
              onClick={() => router.push('/schedule')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-[#272162] rounded-lg" />
              <div className="px-8 py-2 bg-white rounded-[6px] relative group transition duration-200 text-black hover:bg-transparent hover:text-white">
                See Schedule
              </div>
            </button>
          </div>
        </div>

        <div className="w-full md:leading-[5rem] font-medium text-4xl md:text-6xl">
          <p><span className='bg-gradient-to-br from-sky-500 to-[#272162] inline-block text-transparent bg-clip-text'>200+</span> Participants</p>
          <p><span className='bg-gradient-to-br from-sky-500 to-[#272162] inline-block text-transparent bg-clip-text'>3</span> Speakers</p>
          <p><span className='bg-gradient-to-br from-sky-500 to-[#272162] inline-block text-transparent bg-clip-text'>5</span> fully sponsored days</p>
        </div>
      </div>

      <div
        className="drop-shadow-sm space-y-6 md:space-y-0 md:flex md:justify-around"
      >
        <div className='w-full'>
          <MeteorCard 
            title='Speakers' 
            description='Engage with exceptional speakers from world-class institutions. Prepare for insightful conferences and stimulating discussions that will broaden your perspective on mathematics.'
            ctaLabel='See Speakers'
            className='h-full'
            onClick={() => router.push('/speakers')}
          />
        </div>
        <div className='w-full'>
          <MeteorCard 
            title='Partners' 
            description='Learn about our invaluable partners who share our commitment to fostering excellence in math. Their support makes this event a reality.'
            ctaLabel='See Partners'
            className='h-full'
            onClick={() => router.push('/partners')}
          />
        </div>
      </div>

      <div
        className="drop-shadow-sm space-y-6 md:space-y-0 md:flex md:justify-around"
      >
        <div className='w-full'>
          <MeteorCard 
            title='Organizing team' 
            description='Discover the passionate individuals behind the scenes who dedicated countless hours to make this competition possible. Get to know them before meeting in person in UM6P.'
            ctaLabel='See Organizing Team'
            className='h-full'
            onClick={() => router.push('/organizing-team')}
          />
        </div>
        <div className='w-full'>
          <MeteorCard 
            title='Prizes' 
            description='Explore the prizes awaiting top performers in the competition.'
            ctaLabel='See Prizes'
            className='h-full'
            onClick={() => router.push('/prizes')}
          />
        </div>
      </div>
    </>
  )
}

export default Informations
