"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function ClassSchedule() {
  // ✅ Mock Schedule Data
  const schedule = [
    {
      day: "Monday",
      subject: "Data Structures & Algorithms",
      faculty: "Dr. A. Sharma",
      time: "9:00 AM - 10:00 AM",
      room: "CS101",
      type: "Lecture",
    },
    {
      day: "Monday",
      subject: "Database Management Systems",
      faculty: "Prof. R. Mehta",
      time: "11:00 AM - 12:00 PM",
      room: "CS201",
      type: "Lecture",
    },
    {
      day: "Tuesday",
      subject: "Operating Systems Lab",
      faculty: "Dr. P. Kumar",
      time: "2:00 PM - 4:00 PM",
      room: "Lab-3",
      type: "Lab",
    },
    {
      day: "Wednesday",
      subject: "Computer Networks",
      faculty: "Prof. S. Iyer",
      time: "10:00 AM - 11:00 AM",
      room: "CS301",
      type: "Lecture",
    },
    {
      day: "Thursday",
      subject: "Database Tutorial",
      faculty: "Prof. R. Mehta",
      time: "1:00 PM - 2:00 PM",
      room: "Tutorial Hall",
      type: "Tutorial",
    },
    {
      day: "Friday",
      subject: "Operating Systems",
      faculty: "Dr. P. Kumar",
      time: "9:00 AM - 10:00 AM",
      room: "CS202",
      type: "Lecture",
    },
  ]

  return (
    <div className="w-full p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Class Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.day}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.faculty}</TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>{item.room}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.type === "Lecture"
                            ? "default"
                            : item.type === "Lab"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {item.type}
                      </Badge>
                    </TableCell>
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
