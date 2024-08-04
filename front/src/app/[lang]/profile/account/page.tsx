import { Separator } from "@/components/shared"
import { AccountForm } from "./account-form";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          C&apos;est ainsi que les autres vous verront sur le site.
        </p>
      </div>
      <Separator />

      <AccountForm />
    </div>
  )
}
