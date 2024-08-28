
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
import { generateAccessCode } from "@/api/TeamAccessCodeApi";
import { toast } from "@/components/hooks/use-toast";

export default function TeamPage() {
  useAuthGuard();
  const userData = useRecoilValue<any>(userState);
  const [content, setContent] = useState<any>(undefined);
  const [accessCode, setAccessCode] = useState<string>('');
  const [isTeamLeader, setIsTeamLeader] = useState<boolean>(false);
  const router = useRouter();

  const onQuitTeam = async () => {
    try {
      const result = await removeUser(userData?.team?.id);      
      window.location.reload()
    } catch(e) {
      toast({
        title: 'This operation have failed',
        description: 'There have a been a problem. Please try later',
        variant: 'destructive',
      });
    }
  }

  const onGenerateAccessCode = async () => {
    const teamId = userData?.team?.id;

    try {
      const result = await generateAccessCode(teamId) as any;
      if (result?.statusCode !== 200) {
        toast({
          title: 'This operation have failed',
          description: result?.message,
          variant: 'destructive',
        });  
      }

      const accessCode = result?.accessCode;
      setAccessCode(accessCode);
    } catch(e: any) {
      toast({
        title: 'This operation have failed',
        description: e.message,
        variant: 'destructive',
      });
    }
  }
  
  useEffect(() => {
    const team = userData?.team;
    const isTeamLeader = team?.leader?.id === userData?.id 
    setIsTeamLeader(isTeamLeader);

    if (!team) {
      setContent({
        title: "You are not part of a team yet!",
        subtitle: "Make sure to join a team so that your application will be taken into account",
        ctaLabel: "Join a team",
      })
    } else {
      setContent({
        title: isTeamLeader ? "You have created a team!" : "You have joined a team!",
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
            <div className="bg-gray-100 rounded-md p-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-black to-stone-600 inline-block text-transparent bg-clip-text">{userData?.team?.name}</div>
              <div className="text-base text-gray-700">{userData?.team?.slogan}</div>
            </div>
            
            <div className="p-4">
              <div className="text-sm"><span className="font-bold">Mentor</span>: {userData?.team?.mentorFullName ?? <span className="text-gray-500">(not defined)</span>}</div>
              <div className="text-sm"><span className="font-bold">Created By</span>: {userData?.team?.leader ? `${userData?.team?.leader.firstName} ${userData?.team?.leader.lastName}` : '(not defined)'}</div>
            </div>
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
          <div className="flex space-x-4">
            {isTeamLeader &&
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant='default'
                  >
                    Invite people
                  </Button>
                </AlertDialogTrigger>
  
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Generate Access Code</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-6">
                      <p>Send an access code to the people you want to invite. It&apos;s to be used by them in the team application form.</p>
                      <p>This is a single use access code. You&apos;ll have to generate a new access code to each member of the team.</p>
  
                      <div className="mt-6 flex space-x-4">
                        <Button
                          onClick={onGenerateAccessCode}
                        >
                          Generate Access Code
                        </Button>
  
                        {accessCode && 
                          <div className="bg-gray-100 rounded-md font-bold text-lg py-2 px-4">
                            {accessCode}
                          </div>
                        }
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
  
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setAccessCode('')}
                    >
                      Cancel
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            }

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
          </div>
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
