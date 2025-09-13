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
import { FileText } from "lucide-react"

export default function ResultSection() {
  const [semester, setSemester] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Result requested for semester:", semester)
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

      {/* Semester Select + Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
        {/* Select Semester */}
        <div className="flex-1 w-full sm:w-auto">
          <Label htmlFor="semester-code" className="text-gray-300">
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

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!semester}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <FileText size={16} />
          View Result
        </Button>
      </div>
    </form>
  )
}
