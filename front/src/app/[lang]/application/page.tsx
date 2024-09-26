"use client"

import { ApplicationForm } from "./form/application-form";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userState";
import { useAuthGuard } from "@/components/hooks/use-auth-guard";
import ProfileSkeleton from "../profile/profile-skeleton";
import { useRouter } from "next/navigation";

export default function ApplicationPage() {
  const userData = useRecoilValue<any>(userState);
  const router = useRouter();
  useAuthGuard();
  router.push('/profile/application')

  // if (!userData) return <ProfileSkeleton />;

  // return (
  //   <div className="z-10 w-full px-5 max-w-screen-xl xl:px-0">
  //     <div className="space-y-6 p-10 pb-16">
  //       <ApplicationForm userData={userData} />
  //     </div>
  //   </div>
  // )

  return <ProfileSkeleton />
}