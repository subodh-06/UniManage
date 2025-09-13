import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh w-full flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex  max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center justify-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          UniManage
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
