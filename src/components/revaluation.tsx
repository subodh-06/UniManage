"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FileEdit } from "lucide-react"

export default function RevaluationRequestSection() {
  const [semester, setSemester] = React.useState("")
  const [subject, setSubject] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Revaluation requested for:", { semester, subject })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-6 border rounded-lg shadow-sm space-y-6"
    >
      {/* Student Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div>
          <Label className="text-gray-300">Student Name</Label>
          <p className="border-b border-gray-300 py-1">ABHINAV KUMAR</p>
        </div>
        <div>
          <Label className="text-gray-300">Enrollment No.</Label>
          <p className="border-b border-gray-300 py-1">2341011109</p>
        </div>
        <div>
          <Label className="text-gray-300">Program</Label>
          <p className="border-b border-gray-300 py-1">Bachelor of Technology</p>
        </div>
        <div>
          <Label className="text-gray-300">Branch</Label>
          <p className="border-b border-gray-300 py-1">Computer Science & Engineering</p>
        </div>
      </div>

      {/* Semester + Subject + Submit */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
        {/* Semester Select */}
        <div>
          <Label htmlFor="semester-code" className="text-gray-700">
            Select Semester Code
          </Label>
          <Select onValueChange={setSemester}>
            <SelectTrigger
              id="semester-code"
              className="mt-1 w-full border-0 border-b rounded-none shadow-none focus:ring-0 focus:border-b-2"
            >
              <SelectValue placeholder="Select Semester Code" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sem-1">SEM 1</SelectItem>
              <SelectItem value="sem-2">SEM 2</SelectItem>
              <SelectItem value="sem-3">SEM 3</SelectItem>
              <SelectItem value="sem-4">SEM 4</SelectItem>
              <SelectItem value="sem-5">SEM 5</SelectItem>
              <SelectItem value="sem-6">SEM 6</SelectItem>
              <SelectItem value="sem-7">SEM 7</SelectItem>
              <SelectItem value="sem-8">SEM 8</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Subject Select */}
        <div>
          <Label htmlFor="subject-code" className="text-gray-700">
            Select Subject
          </Label>
          <Select onValueChange={setSubject}>
            <SelectTrigger
              id="subject-code"
              className="mt-1 w-full border-0 border-b rounded-none shadow-none focus:ring-0 focus:border-b-2"
            >
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="dsa">Data Structures</SelectItem>
              <SelectItem value="os">Operating Systems</SelectItem>
              <SelectItem value="dbms">DBMS</SelectItem>
              <SelectItem value="cn">Computer Networks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            disabled={!semester || !subject}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <FileEdit size={16} />
            Request Revaluation
          </Button>
        </div>
      </div>
    </form>
  )
}
