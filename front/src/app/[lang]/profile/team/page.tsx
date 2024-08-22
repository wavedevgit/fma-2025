
"use client"

import { Separator } from "@/components/shared"
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shared/alert-dialog"
import { Button } from "@/components/shared";
import ProfileSkeleton from "../profile-skeleton";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userState";
import { useAuthGuard } from "@/components/hooks/use-auth-guard";
import { useRouter } from "next/navigation";
import { removeUser } from "@/api/TeamApi";
import { toast } from "@/components/hooks/use-toast";

export default function TeamPage() {
  useAuthGuard();
  const userData = useRecoilValue<any>(userState);
  const [content, setContent] = useState<any>(undefined);
  const router = useRouter();

  const onQuitTeam = async () => {
    try {
      const result = await removeUser(userData?.team?.id);
      console.log('result', result);
      setTimeout(() => {
        router.push('/profile/team')
      }, 500)
    } catch(e) {
      toast({
        title: 'This operation have failed',
        description: 'There have a been a problem. Please try later',
        variant: 'destructive',
      });
    }
  }
  
  useEffect(() => {
    const team = userData?.team;

    if (!team) {
      setContent({
        title: "You haven't joined a team yet!",
        subtitle: "Make sure to join a team so that your application will be taken into account",
        ctaLabel: "Join a team",
      })
    } else {
      setContent({
        title: "You have joined a team!",
        subtitle: "Your application will be joined to the applications of your teammates",
        ctaLabel: "Quit this team",
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
        {userData?.team && 
          <>
            <div className="text-sm"><span className="font-bold">Team Name</span>: {userData?.team?.name}</div>
            <div className="text-sm"><span className="font-bold">Team Slogan</span>: {userData?.team?.slogan}</div>
            <div className="text-sm"><span className="font-bold">Mentor</span>: {userData?.team?.mentorFullName ?? '(not defined)'}</div>
          </>
        }
      </CardContent>
      <CardFooter>
        {!userData?.team &&
          <Button
            onClick={() => router.push('/team')}
          >
            {content?.ctaLabel}
          </Button>
        }
        {userData?.team &&
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant='destructive'
              >
                {content?.ctaLabel}
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to quit this team?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. You&apos;ll have to reapply for a new team for your application to be taken into account. 
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onQuitTeam}
                >
                  Quit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
        }
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
