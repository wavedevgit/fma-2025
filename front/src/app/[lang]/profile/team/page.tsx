import { Separator } from "@/components/shared"
import { TeamForm } from "./team-form";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Team</h3>
        <p className="text-sm text-muted-foreground">
          This is where you see the details of your team.
        </p>
      </div>
      <Separator />

      <TeamForm />
    </div>
  )
}
