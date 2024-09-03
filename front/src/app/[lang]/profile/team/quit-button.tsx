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
import { removeUser } from "@/api/TeamApi";
import { toast } from "@/components/hooks/use-toast";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userState";

const QuitButton = () => {
  const userData = useRecoilValue<any>(userState);

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

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='destructive'
        >
          Quitter l&apos;équipe
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr de vouloir quitter cette équipe?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Vous devrez postuler à nouveau pour une nouvelle équipe afin que votre candidature soit prise en compte. 
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Fermer</AlertDialogCancel>
          <AlertDialogAction
            onClick={onQuitTeam}
          >
            Quitter
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default QuitButton
