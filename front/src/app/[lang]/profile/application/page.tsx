
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
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userState";
import { useAuthGuard } from "@/components/hooks/use-auth-guard";


export default function ApplicationPage() {
  const userData = useRecoilValue<any>(userState);
  const [showForm, setShowForm] = useState<boolean>(false);
  const isNotified = userData?.application?.status?.status === 'NOTIFIED';
  const isUpdated = userData?.application?.status?.status === 'UPDATED';

  const updateApplicationCard = (
    <Card>
      <CardHeader>
        <CardTitle>Vous avez déjà soumis une candidature.</CardTitle>
        <CardDescription>Nous avons reçu votre candidature. Elle est en cours d&apos;examen par notre équipe.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm">Date de soumission: {formatDate(userData?.application?.createdAt)}</div>
        <div className="text-sm">Date de mise à jour: {formatDate(userData?.application?.updatedAt)}</div>
        <div className="text-sm">Statut: <Badge className="bg-orange-500 text-black">En cours</Badge></div>
      </CardContent>
      {/* <CardFooter className="space-x-4">
        <Button
          onClick={() => {setShowForm(true)}}
        >
          Mettre à jour votre candidature
        </Button>
      </CardFooter> */}
      {isNotified && (
        <CardFooter className="space-x-4">
          <CardDescription>Vous avez été notifié pour mettre à jour votre candidature.</CardDescription>
            
          <Button
            onClick={() => {setShowForm(true)}}
          >
            Mettre à jour votre candidature
          </Button>
        </CardFooter>
      )}
      {isUpdated &&
        <CardFooter className="space-x-4">
          <CardDescription>Merci d&apos;avoir mis à jour votre candidature.</CardDescription>
        </CardFooter>
      }
    </Card>
  );

  // const createApplicationCard = (
  //   <Card>
  //     <CardHeader>
  //       <CardTitle>Vous n&apos;avez pas encore soumis votre candidature</CardTitle>
        
  //     </CardHeader>
  //     <CardContent>
  //       <ul className="list-disc pl-6 mb-4">
  //         <li><CardDescription className="text-gray-800">Veuillez prendre connaissance et préparer les documents que vous devriez joindre à votre candidature (en bas du formulaire) avant de commencer de la remplir </CardDescription></li>
  //         <li><CardDescription className="text-gray-800">Prenez votre temps pour remplir les <span className="font-semibold">4 sections</span> ci-dessous <br/></CardDescription></li>
  //       </ul>
        
  //       <CardDescription className="text-red-700"><span className="font-semibold text-medium text-red-500">Important:</span> {' '}N&apos;oubliez pas de clickez sur le boutton <span className="text-red-500 font-semibold text-medium">{'"'}Envoyer ma candidature{'"'}</span> pour confirmer votre demande.</CardDescription>
  //     </CardContent>
  //   </Card>
  // );

  const closedApplicationCard = (
    <Card>
      <CardHeader>
        <CardTitle>La candidature pour Summer Camp 2024 est terminé!</CardTitle>
        <CardDescription>Nous vous remercions de l&apos;intérêt que vous portez à notre camp d&apos;été. Malheureusement, la période de candidature est terminée et nous n&apos;acceptons plus de nouvelles candidatures.</CardDescription>
        <CardDescription>N&apos;hésitez pas à consulter cette page pour connaître les prochaines opportunités. Nous espérons vous voir bientôt.</CardDescription>
      </CardHeader>
    </Card>
  )

  useAuthGuard();

  return (
    <div className="space-y-6">
      <div>
        <div className="text-lg font-medium">Candidature</div>
        <p className="text-sm text-muted-foreground">
          C&apos;est ici que vous gérez votre candidature en cours.
        </p>
      </div>

      <Separator />

      {!userData
        ? <ProfileSkeleton />
        : userData?.application 
          ? updateApplicationCard 
          : closedApplicationCard
      }

      {showForm && <ApplicationForm application={userData?.application} userData={userData}/>}
    </div>
  )
}