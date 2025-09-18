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
import { Eye } from "lucide-react"

export default function ExamSchedule() {
  const [semester, setSemester] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Admit Card requested for semester:", semester)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-6 border rounded-lg shadow-sm space-y-6"
    >
      {/* Top Row - Student Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div>
          <Label className="text-gray-500">Student Name</Label>
          <p className="border-b border-gray-300 py-1">ALOK NATH</p>
        </div>
        <div>
          <Label className="text-gray-500">Enrollment No.</Label>
          <p className="border-b border-gray-300 py-1">2341014152</p>
        </div>
        <div>
          <Label className="text-gray-500">Program</Label>
          <p className="border-b border-gray-300 py-1">Bachelor of Technology</p>
        </div>
        <div>
          <Label className="text-gray-500">Exam Name</Label>
          <p className="border-b border-gray-300 py-1">End Semester Examination</p>
        </div>
        <div>
          <Label className="text-gray-500">Exam Session</Label>
          <p className="border-b border-gray-300 py-1">ODD 2025</p>
        </div>
      </div>

      {/* Bottom Row - Semester Code + Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
        {/* Select Semester */}
        <div className="flex-1 w-full sm:w-auto">
          <Label htmlFor="semester-code" className="text-gray-700">
            Select Semester Code
          </Label>
          <Select onValueChange={setSemester}>
    <SelectTrigger id="registration-code" className="mt-1 w-auto min-w-[200px]">
  <SelectValue placeholder="Select code" />
</SelectTrigger>

            <SelectContent>
              <SelectItem value="odd-sem-2025">ODD SEM 2025</SelectItem>
              <SelectItem value="even-sem-2025">EVEN SEM 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!semester}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <Eye size={16} />
          View Admit Card
        </Button>
      </div>
    </form>
  )
}