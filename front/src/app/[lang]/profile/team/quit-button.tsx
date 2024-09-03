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
          Quit this team
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
  )
}

export default QuitButton
