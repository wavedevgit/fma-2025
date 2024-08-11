import { Separator } from "@/components/shared"
import { SidebarNav } from "./sidebar-nav"

const sidebarNavItems = [
  {
    title: "Account",
    href: "/profile/account",
  },
  {
    title: "Application",
    href: "/profile/application",
  },
  {
    title: "Team",
    href: "/profile/team",
  },
]

interface ProfileLayoutProps {
  children: React.ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="z-10 w-full px-5 max-w-screen-xl xl:px-0">
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
          <div className="text-muted-foreground">
            Manage your application and account informations.
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </div>
  )
}
