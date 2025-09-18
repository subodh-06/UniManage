"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Megaphone } from "lucide-react"

export default function StudentDashboardHome() {
  // Sample Data (in real app -> fetch from API/db)
  const student = {
    name: "Abhinav Sharma",
    enrollment: "2021CS101",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    section: "CSE-A",
  }

  const notices = [
    {
      id: 1,
      title: "Mid-Semester Exam Notice",
      date: "10 Sep 2025",
      description: "Mid-semester exams will start from 20th September. Timetable has been uploaded."
    },
    {
      id: 2,
      title: "Library Due Reminder",
      date: "08 Sep 2025",
      description: "Students are advised to return issued books before 15th September to avoid fines."
    },
  ]

  const announcements = [
    {
      id: 1,
      title: "Workshop on AI & ML",
      date: "12 Sep 2025",
      description: "A 2-day workshop on Artificial Intelligence & Machine Learning will be conducted in Block A Seminar Hall."
    },
    {
      id: 2,
      title: "Sports Meet Registration",
      date: "09 Sep 2025",
      description: "Registrations for Annual Sports Meet are now open. Contact Sports Committee."
    },
  ]

  return (
    <div className="w-full p-6 space-y-6">
      {/* Welcome Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Welcome, {student.name} 👋
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <p><span className="font-medium">Enrollment:</span> {student.enrollment}</p>
          <p><span className="font-medium">Course:</span> {student.course}</p>
          <p><span className="font-medium">Year:</span> {student.year}</p>
          <p><span className="font-medium">Section:</span> {student.section}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notices */}
        <Card className="h-[350px] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="w-4 h-4" /> Notices
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[280px] px-4">
              <ul className="space-y-4">
                {notices.map((notice) => (
                  <li key={notice.id} className="border-b pb-2">
                    <p className="font-medium">{notice.title}</p>
                    <p className="text-xs text-muted-foreground">{notice.date}</p>
                    <p className="text-sm">{notice.description}</p>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card className="h-[350px] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Megaphone className="w-4 h-4" /> Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[280px] px-4">
              <ul className="space-y-4">
                {announcements.map((announcement) => (
                  <li key={announcement.id} className="border-b pb-2">
                    <p className="font-medium">{announcement.title}</p>
                    <p className="text-xs text-muted-foreground">{announcement.date}</p>
                    <p className="text-sm">{announcement.description}</p>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
