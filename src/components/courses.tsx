"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AssignedCourses() {
  // ✅ Mock Data (replace with API/db data)
  const assignedCourses = [
    {
      code: "CS301",
      name: "Data Structures & Algorithms",
      semester: "5th",
      section: "CSE-A",
      credits: 4,
      schedule: "Mon-Wed-Fri 10:00 AM - 11:00 AM",
    },
    {
      code: "CS305",
      name: "Database Management Systems",
      semester: "5th",
      section: "CSE-B",
      credits: 4,
      schedule: "Tue-Thu 11:00 AM - 12:30 PM",
    },
    {
      code: "CS310",
      name: "Operating Systems",
      semester: "5th",
      section: "CSE-C",
      credits: 4,
      schedule: "Mon-Wed 2:00 PM - 3:30 PM",
    },
    {
      code: "CS315",
      name: "Computer Networks",
      semester: "5th",
      section: "CSE-A",
      credits: 3,
      schedule: "Fri 9:00 AM - 11:00 AM",
    },
  ]

  return (
    <div className="w-full p-6 space-y-6">
      {/* Faculty Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Assigned Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Schedule</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedCourses.map((course) => (
                  <TableRow key={course.code}>
                    <TableCell className="font-medium">{course.code}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.semester}</TableCell>
                    <TableCell>{course.section}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>{course.schedule}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
