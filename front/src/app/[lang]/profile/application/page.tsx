
"use client"

import { Separator } from "@/components/shared"
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
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
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userState";
import { useAuthGuard } from "@/components/hooks/use-auth-guard";
import { useRouter } from "next/navigation";

const getBadgeClassname = (status: string) => {
  switch(status) {
    case 'DRAFT':
      return 'bg-gray-300 text-black';
    case 'PENDING':
      return 'bg-[#FFE380] text-black';
    case 'NOTIFIED':
      return 'bg-[#79E2F2] text-black';
    case 'UPDATED':
      return 'bg-[#B3D4FF] text-black';
    case 'VALIDATED':
      return 'bg-[#79F2C0] text-black';
    case 'ACCEPTED':
      return 'bg-[#006644] text-white';
    case 'REJECTED':
      return 'bg-[#BF2600] text-white';
    case 'WAITLIST':
      return 'bg-[#403294] text-white';
  }
}

export default function ApplicationPage() {
  useAuthGuard();
  const userData = useRecoilValue<any>(userState);
  const [content, setContent] = useState<any>(undefined);
  const router = useRouter();
  
  useEffect(() => {
    const application = userData?.application;
    const applicationStatus = application?.status?.status;

    if (!application) {
      setContent({
        title: "You haven't submitted an application yet",
        subtitle: "Make sure to submit an application, and then join a team",
        ctaLabel: "Create an application",
      })
    } else if (applicationStatus === 'DRAFT') {
      setContent({
        title: "You have saved an application draft. It's not yet submitted",
        subtitle: "Make sure to complete and submit your application, and then join a team",
        ctaLabel: "Complete your application",
      })
    } else {
      setContent({
        title: "You have already submitted an application",
        subtitle: "Make sure that you joined a team so that your application will be taken into account",
        ctaLabel: "Update your application",
      })
    }
  }, [userData])

  const applicationCard = (
    <Card>
      <CardHeader>
        <CardTitle>
          {content?.title}
        </CardTitle>
        <CardDescription>
          {content?.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {userData?.application && 
          <>
            <div className="text-sm"><span className="font-bold">Submission date</span>: {formatDate(userData?.application?.createdAt)}</div>
            <div className="text-sm"><span className="font-bold">Update date</span>: {formatDate(userData?.application?.updatedAt)}</div>
            <div className="text-sm"><span className="font-bold">Status</span>: <Badge className={`px-4 ${getBadgeClassname(userData?.application?.status?.status)}`}>{userData?.application?.status?.status}</Badge></div>
          </>
        }
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => router.push('/application')}
        >
          {content?.ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  );

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
        : applicationCard
      }
    </div>
  )
}
