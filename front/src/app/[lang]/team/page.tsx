"use client"

import { useRecoilValue } from "recoil";
import { userState } from "@/store/userState";
import { useAuthGuard } from "@/components/hooks/use-auth-guard";
import ProfileSkeleton from "../profile/profile-skeleton";
import { useRouter } from "next/navigation";


export default function ApplicationPage() {
  const userData = useRecoilValue<any>(userState);
  const router = useRouter();
  useAuthGuard();
  router.push('/profile/team');

  // if (!userData) {
  //   return <ProfileSkeleton />;
  // } else if (!userData?.application || userData?.application?.status?.status === 'DRAFT' || userData?.team) {
  //   router.push('/profile/team')
  // }  else {
  //   return (
  //     <div className="z-10 w-full px-5 max-w-screen-xl xl:px-0">
  //       <div className="space-y-6 p-10 pb-16">
  //         <TeamForm />
  //       </div>
  //     </div>
  //   )
  // }

  return <ProfileSkeleton />
}