import { Button } from "@/components/shared/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shared/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/table"
import { useRouter } from 'next/navigation'
import Link from "next/link";

const TeamsMembers = ({
  members,
}:{
  members: any[],
}) => {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs">Show Members</Button>
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Team Members</DialogTitle>
          <DialogDescription>
            You&apos;ll find the list of all the team members
          </DialogDescription>

          <div>
            <Table>
              <TableCaption>{members.length === 0 ? <span className="text-gray-400">Empty list</span> : ''}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Id</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.id}</TableCell>
                    <TableCell>{member.firstName}</TableCell>
                    <TableCell>{member.lastName}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/home/applications/${member?.application?.id}`} target="_blank">
                        <Button 
                          className="text-xs" 
                        >
                          Show Application
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default TeamsMembers
