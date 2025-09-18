import { GalleryVerticalEnd, Contact, FileLock, LogOut, SquareTerminal, BookCheck, Wallet, Bed, House } from "lucide-react"
import type { SidebarData } from "@/types/sidebar"

export const studentData: SidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    { name: "UniManage", logo: GalleryVerticalEnd, plan: "Student Dashboard" },
    { name: "Profile", logo: Contact },
    { name: "Change Password", logo: FileLock },
    { name: "Log out", logo: LogOut },
  ],
  navMain: [
    {
      title: "Academic Info.",
      url: "#",
      icon: SquareTerminal,
      items: [
        { title: "Class Schedule", url: "/student/class-schedule" },
        { title: "Attendance tracking", url: "/student/attendance" },
        { title: "Registered Subject", url: "/student/registered-subject" },
      ],
    },
    {
      title: "Exams & Results",
      url: "#",
      icon: BookCheck,
      items: [
        { title: "Exam schedule", url: "/student/exam-schedule" },
        { title: "My Result", url: "/student/result" },
        { title: "Revaluation requests", url: "/student/revaluation" },
      ],
    },
    {
      title: "Fees & Payments",
      url: "#",
      icon: Wallet,
      items: [
        { title: "Fee details", url: "/student/fees-and-payments" },
        { title: "Payment history", url: "/student/payment-history" },
      ],
    },
    {
      title: "Accommodation",
      url: "#",
      icon: Bed,
      items: [
        { title: "Room details", url: "/student/hostel-details" },
        { title: "Leave requests", url: "/student/leave-requests" },
      ],
    },
  ],
  projects: [{ name: "Home", url: "/student/", icon: House }],
}
