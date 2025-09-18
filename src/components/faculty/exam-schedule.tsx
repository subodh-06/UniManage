"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function FacultyExamSchedule() {
  // ✅ Mock exam data
  const exams = [
    {
      id: 1,
      course: "CS101 - Data Structures",
      examType: "Midterm",
      date: "2025-10-12",
      time: "10:00 AM - 12:00 PM",
      venue: "Room A-101",
      status: "Upcoming",
    },
    {
      id: 2,
      course: "CS102 - Database Systems",
      examType: "Final Exam",
      date: "2025-10-15",
      time: "02:00 PM - 05:00 PM",
      venue: "Room B-204",
      status: "Upcoming",
    },
    {
      id: 3,
      course: "CS103 - Operating Systems",
      examType: "Quiz",
      date: "2025-10-20",
      time: "09:00 AM - 09:30 AM",
      venue: "Lab C-301",
      status: "Completed",
    },
  ]

  return (
    <div className="w-full p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Exam Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Exam Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>{exam.course}</TableCell>
                    <TableCell>{exam.examType}</TableCell>
                    <TableCell>{exam.date}</TableCell>
                    <TableCell>{exam.time}</TableCell>
                    <TableCell>{exam.venue}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={exam.status === "Upcoming" ? "default" : "secondary"}
                      >
                        {exam.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
