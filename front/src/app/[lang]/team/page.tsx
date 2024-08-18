"use client"

import { TeamForm } from "./form/team-form";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userState";


export default function ApplicationPage() {
  const userData = useRecoilValue<any>(userState);

  return (
    <div className="z-10 w-full px-5 max-w-screen-xl xl:px-0">
      <div className="space-y-6 p-10 pb-16">
        <TeamForm userData={userData} />
      </div>
    </div>
  )
}