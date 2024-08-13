"use client"

import { Separator } from "@radix-ui/react-separator";
import { ApplicationForm } from "./form/application-form";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userState";
import { Button } from "@/components/shared";


export default function ApplicationPage() {
  const userData = useRecoilValue<any>(userState);

  return (
    <div className="z-10 w-full px-5 max-w-screen-xl xl:px-0">
      <div className="space-y-6 p-10 pb-16">
        <ApplicationForm userData={userData} />
      </div>
    </div>
  )
}