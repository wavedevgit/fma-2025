import { Button } from "@/components/shared/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
 
export type TeamRow = {
  id: string,
  name: string,
  slogan: string,
  mentorFullName: string,
}
 
export const columns: ColumnDef<TeamRow>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "slogan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Slogan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "mentorFullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mentor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const mentorFullName = row.getValue("mentorFullName") as string;
      return <>
        {mentorFullName ?? <span className="text-gray-300">{"(empty)"}</span>}
      </>
    }
  },
  { // hidden column to make its value available in another column
    accessorKey: "leaderId",
    header: ({ column }) => { return },
    cell: ({ row }) => { return },
  },
  {
    accessorKey: "leaderName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Leader
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const leaderName = row.getValue("leaderName") as string;
      const leaderId = row.getValue("leaderId") as string;
      console.log('row: ', row.getVisibleCells());
      return <>
        {leaderName} <span className="text-gray-300">(id={leaderId})</span>
      </>
    },
  },
  {
    accessorKey: "numberOfMembers",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Number of Members
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]