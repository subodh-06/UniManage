"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function FacultyInvigilationDuty() {
  // ✅ Mock invigilation data
  const duties = [
    {
      id: 1,
      course: "CS101 - Data Structures",
      date: "2025-10-12",
      time: "10:00 AM - 12:00 PM",
      venue: "Room A-101",
      role: "Chief Invigilator",
      status: "Assigned",
    },
    {
      id: 2,
      course: "CS102 - Database Systems",
      date: "2025-10-15",
      time: "02:00 PM - 05:00 PM",
      venue: "Room B-204",
      role: "Assistant Invigilator",
      status: "Assigned",
    },
    {
      id: 3,
      course: "CS103 - Operating Systems",
      date: "2025-10-20",
      time: "09:00 AM - 09:30 AM",
      venue: "Lab C-301",
      role: "Observer",
      status: "Completed",
    },
  ]

  return (
    <div className="w-full p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Invigilation Duties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {duties.map((duty) => (
                  <TableRow key={duty.id}>
                    <TableCell>{duty.course}</TableCell>
                    <TableCell>{duty.date}</TableCell>
                    <TableCell>{duty.time}</TableCell>
                    <TableCell>{duty.venue}</TableCell>
                    <TableCell>{duty.role}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={duty.status === "Assigned" ? "default" : "secondary"}
                      >
                        {duty.status}
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
