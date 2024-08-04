"use client"

import { getToken, isBoolean } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useAuthModal } from '../layout/auth-modal';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/userState';
import Link from 'next/link';
import { Button } from '../shared';
import { MeteorCard } from './meteor-card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shared/dialog"
import { Separator } from '@radix-ui/react-separator';

const CtaButton = () => {
  const router = useRouter();
  const { AuthModal, setShowAuthModal } = useAuthModal();
  const userData = useRecoilValue(userState);
  const [hasApplied, setHasApplied] = useState<Boolean|undefined>(undefined)

  const onSubmitApplication = (e: SyntheticEvent) => {
    e.preventDefault();
    const token = getToken();
    
    if (token) {
      router.push('profile/application');
    } else {
      setShowAuthModal(true);
    }
  }

  useEffect(() => {
    setHasApplied(userData !== undefined && userData?.application !== null)
  }, [userData])

  const beforeDeadlineTemplate = (
    <div 
      className="text-center animate-fade-up opacity-0"
      style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
    >
      <AuthModal />
      
      <MeteorCard className="w-full flex flex-col space-y-4 items-center bg-transparent border-gray-400 py-4">
        <div><span className='font-semibold text-[#272162]'>Date limite pour candidater:</span> <span className='font-bold'>21 Juin 2024</span></div>

        <button
          className="p-[3px] relative"
          onClick={onSubmitApplication}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-[#272162] rounded-lg" />
          <div className="px-8 py-2 bg-white rounded-[6px] relative group transition duration-200 text-black hover:bg-transparent hover:text-white">
            L&apos;inscription est fermée
          </div>
        </button>

        <div className="w-full flex justify-center space-x-6">
          <Link href='https://drive.google.com/file/d/1Ah068enVUm9NnPcvPxtsUq4Db5KeNL2X/view' target='_blank'>
            <Button
              className='border border-white text-white w-[8rem]'
            >
              Règlement
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button className='border border-white text-white w-[8rem]'> Une question? </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[35rem]">
              <DialogHeader>
                <DialogTitle>Avez-vous une question?</DialogTitle>
                <Separator  className='my-6'/>
              </DialogHeader>
              <p>Les réponses des questions les plus importantes et fréquentes se trouvent dans la section <Link href='/faq' className='text-blue-700 underline inline-block'>FAQ</Link>.</p>

              <p>Si vous n&apos;avez pas trouvez de réponses, contactez-nous sur <span className="text-blue-500">math.maroc.summer.camp@gmail.com</span>.</p>
              
              <Separator />
              <DialogFooter>
                <DialogDescription>
                  Veuillez noter que nous ne répondrons pas aux mails concernant des questions déjà traitées dans la FAQ.
                </DialogDescription>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </MeteorCard>
    </div>
  )

  const afterDeadlineTemplate = (
    <div 
      className="text-center animate-fade-up opacity-0 space-y-4"
      style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
    >
      <AuthModal />
      <button 
        className="p-[3px] relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-[#272162] rounded-lg" />
        <div className="px-8 py-2 bg-white rounded-[6px] relative group transition duration-200 text-gray-900 hover:bg-transparent hover:text-white">
          Applications are closed!
        </div>
      </button>
      {isBoolean(hasApplied) && hasApplied &&
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
      }
    </div>
  )

  return beforeDeadlineTemplate;
}

export default CtaButton;
