"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useAuthModal } from "./auth-modal";
import { UserNav } from "./user-nav";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userState";
import { getToken } from "@/lib/utils";

const links = [
  {
    key: 'schedule',
    label: 'Programme',
    href: '/schedule',
  },
  {
    key: 'organizing-team',
    label: 'Equipe organisatrice',
    href: '/organizing-team',
  },
  {
    key: 'partners',
    label: 'Partenaires',
    href: '/partners',
  },
  {
    key: 'faq',
    label: 'FAQ',
    href: '/faq',
  },
];

export default function NavBar({ lang }: { lang: string }) {
  const { AuthModal, setShowAuthModal } = useAuthModal();
  const scrolled = useScroll(50);
  const userData = useRecoilValue(userState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {    
    const token = getToken();
    if (!token) {
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    console.log('userData', userData)
    if (userData) {
      setIsLoading(false);
    }
  }, [userData])

  return (
    <>
      <AuthModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 py-2 flex h-fit max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/mm_circle.png"
              alt="M&M logo"
              width="40"
              height="40"
              className="mr-2 rounded-sm"
            ></Image>
          </Link>

          <div
            className="mx-2 space-y-1 md:mx-0 space-x-2 md:space-x-6 text-center"
          >
            {links.map(link => {
              return (
                <button
                  key={link.key}
                  className="rounded-full font-base border border-gray-300 p-1.5 px-4 text-xs md:text-sm transition-all hover:bg-black hover:text-white"
                  onClick={() => {router.push(link.href)}}
                >
                  {link.label}
                </button>
              )
            })}
          </div>

          <div className="space-x-4 flex items-center">
            {/* <LanguageSwitcher lang={lang}></LanguageSwitcher> */}
            {!isLoading &&
              (
                userData
                ? (
                  <UserNav
                    firstName={userData.firstName}
                    lastName={userData.lastName} 
                    email={userData.email} 
                  />
                ) : (
                  <button
                    className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Se connecter
                  </button>
                )
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}
