import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shared/alert-dialog"
import { Button } from "@/components/shared";
import { generateAccessCode } from "@/api/TeamAccessCodeApi";
import { toast } from "@/components/hooks/use-toast";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/userState";
import { useState } from "react";

export const InviteButton = () => {
  const userData = useRecoilValue<any>(userState);
  const [accessCode, setAccessCode] = useState<string>('');

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

  return (
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
  )
}
