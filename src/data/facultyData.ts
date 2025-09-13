import { GalleryVerticalEnd, Contact, FileLock, LogOut, SquareTerminal, BookCheck, Wallet, Bed, House } from "lucide-react"
import type { SidebarData } from "@/types/sidebar"

export const facultyData: SidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    { name: "UniManage", logo: GalleryVerticalEnd, plan: "Faculty Dashboard" },
    { name: "Profile", logo: Contact, plan: "Startup" },
    { name: "Change Password", logo: FileLock, plan: "Free" },
    { name: "Log out", logo: LogOut, plan: "Free" },
  ],
  navMain: [
    {
      title: "Courses",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Assigned Courses", url: "/faculty/courses" },
        { title: "Class Schedule", url: "/faculty/schedule" },
        { title: "Registered Subject", url: "/faculty/subject" },
      ],
    },
    {
      title: "Attendance & Marks",
      url: "#",
      icon: BookCheck,
      items: [
        { title: "Attendance", url: "/faculty/attendance" },
        { title: "Marks Entry", url: "/faculty/marks-entry" },
      ],
    },
    {
      title: "Exams & Invigilation",
      url: "#",
      icon: Wallet,
      items: [
        { title: "Exam Schedule", url: "/faculty/exam-schedule" },
        { title: "Invigilation Duty", url: "/faculty/invigilation" },
      ],
    },
    {
      title: "Research & Requests",
      url: "#",
      icon: Bed,
      items: [
        { title: "Publications", url: "/faculty/publications" },
        { title: "Leave Requests", url: "/faculty/leave-request" },
        { title: "Student Requests", url: "/faculty/student-requests" },
      ],
    },
  ],
  projects: [{ name: "Home", url: "/faculty", icon: House }],
}
