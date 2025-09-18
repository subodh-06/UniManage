// src/data/adminData.ts
import {
  GalleryVerticalEnd,
  Contact,
  FileLock,
  LogOut,
  SquareTerminal,
  BookCheck,
  Wallet,
  Bed,
  House,
} from "lucide-react"
import type { SidebarData } from "@/types/sidebar"

export const adminData: SidebarData = {
  user: {
    name: "Admin",
    email: "admin@unimanage.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    { name: "UniManage", logo: GalleryVerticalEnd, plan: "Admin Dashboard" },
    { name: "Profile", logo: Contact, plan: "Settings" },
    { name: "Change Password", logo: FileLock, plan: "Security" },
    { name: "Log out", logo: LogOut, plan: "Exit" },
  ],
  navMain: [
    {
      title: "Student Management",
      url: "#",
      icon: SquareTerminal,
      items: [
        { title: "Admissions", url: "/admin/admissions" },
        { title: "Student Records", url: "/admin/student-records" },
        { title: "Attendance Monitoring", url: "/admin/attendance" },
      ],
    },
    {
      title: "Staff & Faculty",
      url: "#",
      icon: BookCheck,
      items: [
        { title: "Staff Records", url: "/admin/staff-records" },
        { title: "Payroll", url: "/admin/payroll" },
        { title: "Workload", url: "/admin/workload" },
      ],
    },
    {
      title: "Finance & Fees",
      url: "#",
      icon: Wallet,
      items: [
        { title: "Fee Collection", url: "/admin/fee-collection" },
        { title: "Pending Dues", url: "/admin/pending-dues" },
        { title: "Receipts", url: "/admin/receipts" },
      ],
    },
    {
      title: "Accommodation & Library",
      url: "#",
      icon: Bed,
      items: [
        { title: "Hostel Management", url: "/admin/hostel" },
        { title: "Room Allocation", url: "/admin/room-allocation" },
        { title: "Library Management", url: "/admin/library-management" },
      ],
    },
    {
      title: "Academics & Exams",
      url: "#",
      icon: BookCheck,
      items: [
        { title: "Course Allocation", url: "/admin/courses" },
        { title: "Exam Schedule", url: "/admin/exam-schedule" },
        { title: "Results Approval", url: "/admin/results" },
      ],
    },
    {
      title: "Reports & Analytics",
      url: "#",
      icon: SquareTerminal,
      items: [
        { title: "Performance Reports", url: "/admin/performance-reports" },
        { title: "Dropout Predictions", url: "/admin/dropout-analysis" },
        { title: "Department Reports", url: "/admin/department-reports" },
      ],
    },
    {
      title: "Communication",
      url: "#",
      icon: Contact,
      items: [
        { title: "Announcements", url: "/admin/announcements" },
        { title: "Parent Notifications", url: "/admin/parent-notifications" },
        { title: "Feedback", url: "/admin/feedback" },
      ],
    },
    {
      title: "Settings & Access",
      url: "#",
      icon: FileLock,
      items: [
        { title: "Role Management", url: "/admin/roles" },
        { title: "Permissions", url: "/admin/permissions" },
        { title: "System Logs", url: "/admin/system-logs" },
      ],
    },
  ],
  projects: [{ name: "Home", url: "/admin", icon: House }],
}
