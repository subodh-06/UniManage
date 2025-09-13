"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function FacultyAttendance() {
  const [selectedCourse, setSelectedCourse] = React.useState("")
  const [date, setDate] = React.useState("")

  // ✅ Mock student data
  const students = [
    { id: "S101", name: "Rahul Sharma" },
    { id: "S102", name: "Priya Verma" },
    { id: "S103", name: "Aman Gupta" },
    { id: "S104", name: "Neha Patel" },
  ]

  // ✅ Track attendance state
  const [attendance, setAttendance] = React.useState<Record<string, boolean>>({})

  const toggleAttendance = (id: string) => {
    setAttendance((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSave = () => {
    console.log("Course:", selectedCourse)
    console.log("Date:", date)
    console.log("Attendance:", attendance)
    alert("✅ Attendance submitted successfully!")
  }

  return (
    <div className="w-full p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Mark Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Course selection & date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Select Course</label>
              <Select onValueChange={(val) => setSelectedCourse(val)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CS101">CS101 - Data Structures</SelectItem>
                  <SelectItem value="CS102">CS102 - Database Systems</SelectItem>
                  <SelectItem value="CS103">CS103 - Operating Systems</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Select Date</label>
              <Input
                type="date"
                className="mt-1"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Students table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="text-center">Present</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={attendance[student.id] || false}
                        onCheckedChange={() => toggleAttendance(student.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Attendance</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
