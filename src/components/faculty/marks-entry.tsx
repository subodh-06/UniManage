"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FacultyMarksEntry() {
  const [selectedCourse, setSelectedCourse] = React.useState("")
  const [selectedExam, setSelectedExam] = React.useState("")

  // ✅ Mock student data
  const students = [
    { id: "S101", name: "Rahul Sharma" },
    { id: "S102", name: "Priya Verma" },
    { id: "S103", name: "Aman Gupta" },
    { id: "S104", name: "Neha Patel" },
  ]

  // ✅ Marks state
  const [marks, setMarks] = React.useState<Record<string, string>>({})

  const handleMarksChange = (id: string, value: string) => {
    setMarks((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = () => {
    console.log("Course:", selectedCourse)
    console.log("Exam:", selectedExam)
    console.log("Marks:", marks)
    alert("✅ Marks submitted successfully!")
  }

  return (
    <div className="w-full p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Marks Entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Course & Exam selection */}
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
              <label className="text-sm font-medium">Select Exam</label>
              <Select onValueChange={(val) => setSelectedExam(val)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="midterm">Midterm</SelectItem>
                  <SelectItem value="final">Final Exam</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Students Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="text-center">Marks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell className="text-center">
                      <Input
                        type="text"
                        placeholder="Enter marks"
                        className="w-24 text-center"
                        value={marks[student.id] || ""}
                        onChange={(e) => handleMarksChange(student.id, e.target.value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Marks</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
