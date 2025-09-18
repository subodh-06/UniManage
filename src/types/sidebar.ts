import { LucideIcon } from "lucide-react"
export type User = {
  name: string
  email: string
  avatar: string
}

export type Team = {
  name: string
  logo: LucideIcon
  plan?: string
}

export type NavItemChild = {
  title: string
  url: string
}

export type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  items?: NavItemChild[]
}

export type Project = {
  name: string
  url: string
  icon: LucideIcon
}

export type SidebarData = {
  user: User
  teams: Team[]
  navMain: NavItem[]
  projects: Project[]
}

