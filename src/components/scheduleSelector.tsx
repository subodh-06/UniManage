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
import { Save } from "lucide-react"

export default function RegistrationForm() {
  const [code, setCode] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Selected Registration Code:", code)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-6 border rounded-lg shadow-sm flex items-center justify-between gap-6"
    >
      {/* Left Section - Label + Dropdown */}
      <div className="flex-1">
        <Label htmlFor="registration-code" className="text-sm font-medium">
          Registration Code <span className="text-blue-500">*</span>
        </Label>
        <Select onValueChange={setCode}>
          <SelectTrigger id="registration-code" className="mt-1 w-auto min-w-[200px]">
  <SelectValue placeholder="Select code" />
</SelectTrigger>
          <SelectContent>
            <SelectItem value="odd-sem-2025">ODD SEM 2025 - ITER</SelectItem>
            <SelectItem value="even-sem-2025">EVEN SEM 2025 - ITER</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Right Section - Submit Button */}
      <Button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
      >
        <Save size={16} />
        Submit
      </Button>
    </form>
  )
}
