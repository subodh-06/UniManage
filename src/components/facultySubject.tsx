"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function RegisteredSubjects() {
  // ✅ Mock Data (replace with API/db data)
  const registeredSubjects = [
    {
      code: "CS301",
      name: "Data Structures & Algorithms",
      faculty: "Dr. A. Sharma",
      credits: 4,
      status: "Approved",
    },
    {
      code: "CS305",
      name: "Database Management Systems",
      faculty: "Prof. R. Mehta",
      credits: 4,
      status: "Approved",
    },
    {
      code: "CS310",
      name: "Operating Systems",
      faculty: "Dr. P. Kumar",
      credits: 4,
      status: "Pending",
    },
    {
      code: "CS315",
      name: "Computer Networks",
      faculty: "Prof. S. Iyer",
      credits: 3,
      status: "Approved",
    },
  ]

  return (
    <div className="w-full p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Registered Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject Code</TableHead>
                  <TableHead>Subject Name</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registeredSubjects.map((subject) => (
                  <TableRow key={subject.code}>
                    <TableCell className="font-medium">{subject.code}</TableCell>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>{subject.faculty}</TableCell>
                    <TableCell>{subject.credits}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          subject.status === "Approved" ? "default" : "secondary"
                        }
                      >
                        {subject.status}
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
