"use client"

import Image from 'next/image'
import React from 'react'
import SocialMediaLinks from '../home/social-media-links'
import useMediaQuery from '@/lib/hooks/use-media-query'

const Footer = () => {
  const { isMobile } = useMediaQuery();

  return (
    <div className="animate-fade-up w-full mt-10 px-5 py-10 xl:px-0 flex items-center justify-around">
      <div className='z-10 flex flex-col xl:flex-row space-x-8 space-y-4 w-fit items-start md:items-center'>
        <img
          src="/mm.png"
          alt="M&M logo"
          style={isMobile ? {maxWidth: '40%'} : {height: '50px', width: 'auto'}}
        />
        <img
          src="/adria.png"
          alt="M&M logo"
          style={isMobile ? {maxWidth: '40%', marginLeft: '-5px'} : {height: '50px', width: 'auto'}}
        />
        <img
          src="/lymed.png"
          alt="M&M logo"
          style={isMobile ? {maxWidth: '20%'} : {height: '70px', width: '70px'}}
        />
      </div>

      <div className='z-10'>
        <SocialMediaLinks />
      </div>
    </div>
  )
}

export default Footer
