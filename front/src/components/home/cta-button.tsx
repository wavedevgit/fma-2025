"use client"

import { getToken, isBoolean } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useAuthModal } from '../layout/auth-modal';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/userState';

const CtaButton = () => {
  const router = useRouter();
  const { AuthModal, setShowAuthModal } = useAuthModal();
  const userData = useRecoilValue(userState);
  const [hasApplied, setHasApplied] = useState<Boolean|undefined>(undefined)

  const onSubmitApplication = (e: SyntheticEvent) => {
    e.preventDefault();
    const token = getToken();
    
    if (token) {
      router.push('application');
    } else {
      setShowAuthModal(true);
    }
  }

  useEffect(() => {
    setHasApplied(userData !== undefined && userData?.application !== null)
  }, [userData])

  const beforeDeadlineTemplate = (
    <div 
      className="text-center animate-fade-up opacity-0 space-y-4"
      style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
    >
      <AuthModal />
      <button 
        className="p-[3px] relative"
        onClick={onSubmitApplication}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-[#272162] rounded-lg" />
        <div className="px-8 py-2 bg-white rounded-[6px] relative group transition duration-200 text-black hover:bg-transparent hover:text-white">
          Submit Application
        </div>
      </button>
      <p>
        <span className='font-semibold text-[#272162]'>Deadline for application:</span> <span className='font-bold'>May 31st 2024</span>
      </p>
    </div>
  )

  const afterDeadlineTemplate = (
    <div 
      className="text-center animate-fade-up opacity-0 space-y-4 space-x-12"
      style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
    >
      <AuthModal />
      <button 
        className="p-[3px] relative"
        onClick={() => router.push('results')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-[#272162] rounded-lg" />
        <div className="px-8 py-2 bg-white rounded-[6px] relative group transition duration-200 text-gray-900 hover:bg-transparent hover:text-white">
          See Results
        </div>
      </button>

      <button 
        className="p-[3px] relative"
        onClick={() => router.push('problems')}
      >
        <div className="absolute inset-0 bg-[#272162] rounded-lg" />
        <div className="px-8 py-2 bg-white rounded-[6px] relative group transition duration-200 text-gray-900 hover:bg-transparent hover:text-white">
          See Problems
        </div>
      </button>
      {/* {isBoolean(hasApplied) && hasApplied &&
        <p className='transition-all'>
          Future steps will be communicated by <span className='text-[#272162] font-semibold'>email</span>.<br/>
          The status of your application will be visible in your <span className='text-blue-600 hover:underline hover:cursor-pointer' onClick={onSubmitApplication}>Profile page</span><br/>
        </p>
      }
      {isBoolean(hasApplied) && !hasApplied &&
        <p>
          Thank you for your interest in our competition<br/>
          {!userData && <>If you&apos;ve already submitted an application, please <span className='text-blue-600 hover:underline hover:cursor-pointer' onClick={onSubmitApplication}>Login</span></>}
        </p>
      } */}
    </div>
  )

  return beforeDeadlineTemplate;
}

export default CtaButton;
