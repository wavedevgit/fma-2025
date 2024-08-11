"use client"
import { Separator } from "@radix-ui/react-separator";
import { ApplicationForm } from "./application-form";


export default function ApplicationPage() {

  return (
    <div className="z-10 w-full px-5 max-w-screen-xl xl:px-0">
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Application</h2>
          <div className="text-muted-foreground">
            Follow the steps below to complete your application
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1 w-full">
            <ApplicationForm />
          </div>
        </div>
      </div>
    </div>
  )
}