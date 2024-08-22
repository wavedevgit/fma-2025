"use client"

import { getToken } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useAuthModal } from '../layout/auth-modal';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/userState';
import { DottedLine1, DottedLine2, DottedLine3 } from '../shared/icons/dotted-lines';
import useMediaQuery from '@/lib/hooks/use-media-query';

const CtaButton = () => {
  const router = useRouter();
  const { AuthModal, setShowAuthModal } = useAuthModal();
  const {isMobile} = useMediaQuery()
  const userData = useRecoilValue(userState);

  const onSubmitApplication = (e: SyntheticEvent) => {
    e.preventDefault();
    const token = getToken();
    
    if (token) {
      if (userData?.application) {
        router.push('/profile/application');
      } else {
        router.push('/application');
      }
    } else {
      setShowAuthModal(true);
    }
  }

  const onJoinTeam = (e: SyntheticEvent) => {
    e.preventDefault();
    const token = getToken();
    
    if (token) {
      if (userData?.team) {
        router.push('/profile/team');
      } else {
        router.push('/team');
      }
    } else {
      setShowAuthModal(true);
    }
  }

  return (
    <div 
      className="text-center animate-fade-up opacity-0 space-y-4 space-x-8"
      style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
    >
      <AuthModal />

      <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 '>
        {!isMobile && <DottedLine1 className='w-1/6'/>}

        <button 
          className="p-[3px] relative"
          onClick={onSubmitApplication}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-[#272162] rounded-lg" />
          <div className="px-8 py-2 bg-white rounded-[6px] relative group transition duration-200 text-black hover:bg-transparent hover:text-white">
            Submit Application
          </div>
        </button>

        {!isMobile && <DottedLine2 className='w-1/6'/>}

        <button 
          className="p-[3px] relative"
          onClick={onJoinTeam}
        >
          <div className="absolute inset-0 bg-[#272162] rounded-lg" />
          <div className="px-8 py-2 bg-white rounded-[6px] relative group transition duration-200 text-gray-900 hover:bg-transparent hover:text-white">
            Join a Team
          </div>
        </button>

        {!isMobile && <DottedLine3 className='w-1/6'/>}
      </div>
      
      <p>
        <span className='font-semibold text-[#272162]'>Deadline for application:</span> <span className='font-bold'>May 31st 2024</span>
      </p>
    </div>
  )
}

export default CtaButton;
