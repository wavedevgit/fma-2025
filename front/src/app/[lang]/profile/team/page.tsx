
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/table"
import { Button } from "@/components/shared";
import ProfileSkeleton from "../profile-skeleton";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userState";
import { useAuthGuard } from "@/components/hooks/use-auth-guard";
import { useRouter } from "next/navigation";
import { InviteButton } from "./invite-button";
import QuitButton from "./quit-button";
import { Badge } from "@/components/shared/badge";
import { ActionButton } from "./action-button";

export default function TeamPage() {
  useAuthGuard();
  const userData = useRecoilValue<any>(userState);
  const [content, setContent] = useState<any>(undefined);
  const [isTeamLeader, setIsTeamLeader] = useState<boolean>(false);
  const router = useRouter();
  
  useEffect(() => {
    const team = userData?.team;
    console.log('team: ', team);
    const isTeamLeader = team?.leader?.id === userData?.id 
    setIsTeamLeader(isTeamLeader);

    if (!team) {
      setContent({
        title: "You are not part of a team yet!",
        subtitle: "Make sure to join a team so that your application will be taken into account",
      })
    } else {
      setContent({
        title: isTeamLeader ? "You have created a team!" : "You have joined a team!",
        subtitle: "Your application will be joined to the applications of your teammates",
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
            
            <div className="mt-4 p-4">
              <>
                <span className="font-bold">Membres de l&apos;équipe</span>

                <Table>
                  <TableCaption>A list of the team members.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prénom</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData?.team?.users.map((user: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{user?.firstName}</TableCell>
                        <TableCell>{user?.lastName}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell className="flex justify-end">
                          {user?.id === userData?.team?.leader?.id 
                            ? <Badge className="bg-green-700">Lead</Badge>
                            : isTeamLeader
                              ? <ActionButton user={user}/>
                              : ''
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </>

              <>
                <span className="font-bold">Mentor</span>

                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">{userData?.team?.mentorFullname ?? <span className="text-gray-500">(non défini)</span>}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </>
            </div>
          </>
        }
      </CardContent>
      <CardFooter>
        {!userData?.team &&
          <Button
            onClick={() => router.push('/team')}
          >
            Join a team
          </Button>
        }
        {userData?.team &&
          <div className="flex space-x-4">
            {isTeamLeader && <InviteButton />}
            <QuitButton />
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
