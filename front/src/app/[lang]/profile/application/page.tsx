
"use client"

import ApplicationForm from "./application-form"
import { Separator } from "@/components/shared"
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared";
import ProfileSkeleton from "../profile-skeleton";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userState";
import { useAuthGuard } from "@/components/hooks/use-auth-guard";


export default function ApplicationPage() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const userData = useRecoilValue<any>(userState);
  const isNotified = userData?.application?.status?.status === 'NOTIFIED';
  const isUpdated = userData?.application?.status?.status === 'UPDATED';
  const updateApplicationCard = (
    <Card>
      <CardHeader>
        <CardTitle>You&apos;ve already submitted an application</CardTitle>
        <CardDescription>We&apos;ve received your application. It&apos;s under review by our team.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm">Submission date: {formatDate(userData?.application?.createdAt)}</div>
        <div className="text-sm">Update date: {formatDate(userData?.application?.updatedAt)}</div>
        <div className="text-sm">Status: <Badge className="bg-orange-500 text-black">Ongoing</Badge></div>
      </CardContent>
      {isNotified && (
        <CardFooter className="space-x-4">
          <CardDescription>You have been notified to update your application.</CardDescription>
            
          <Button
            onClick={() => {setShowForm(true)}}
          >
            Update Application
          </Button>
        </CardFooter>
      )}
      {isUpdated &&
        <CardFooter className="space-x-4">
          <CardDescription>Thank you for updating your application.</CardDescription>
        </CardFooter>
      }
    </Card>
  );

  const createApplicationCard = (
    <Card>
      <CardHeader>
        <CardTitle>You haven&apos;t submitted an application yet</CardTitle>
        <CardDescription>For a seamless process and following our guidelines, please download, sign, and upload the <Link className="text-blue-500 underline" href="https://drive.google.com/file/d/1Qj0KONxATeMhIVMr4Llqp_X6boAUxBcV/view?usp=sharing" target="_blank">regulations file</Link> in the application form under the <span className="text-black">{'"'}Handwritten signed regulation{'"'}</span> field. </CardDescription>
        <CardDescription className="text-red-700"><span className="font-semibold text-medium text-red-500">Important:</span> {' '}Please do not forget to click on the <span className="text-red-500 font-semibold text-medium">{'"'}Submit Application{'"'}</span> button after filling the form to send your request.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => {setShowForm(true)}}
        >
          Fill Application
        </Button>
      </CardContent>
    </Card>
  );

  const closedApplicationCard = (
    <Card>
      <CardHeader>
        <CardTitle>The application for MMC 2024 is closed!</CardTitle>
        <CardDescription>Thank you for your interest in our competition. Unfortunately, the application period has ended, and we are no longer accepting new applications.</CardDescription>
        <CardDescription>Please check back for future opportunities. We hope to see you soon.</CardDescription>
      </CardHeader>
    </Card>
  )

  useAuthGuard();

  return (
    <div className="space-y-6">
      <div>
        <div className="text-lg font-medium">Application</div>
        <p className="text-sm text-muted-foreground">
          This is where you manage your current application.
        </p>
      </div>

      <Separator />

      {!userData
        ? <ProfileSkeleton />
        : userData?.application 
          ? updateApplicationCard 
          : createApplicationCard
      }

      {showForm && <ApplicationForm application={userData?.application} userData={userData}/>}
    </div>
  )
}
