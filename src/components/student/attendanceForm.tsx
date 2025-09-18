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

export default function AttendanceForm() {
    const [code, setCode] = React.useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Selected Semester Code:", code)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full p-6 border rounded-lg shadow-sm space-y-6"
        >
            {/* Top Row - Static Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div>
                    <Label className="text-gray-300">Name</Label>
                    <p className="border-b border-gray-300 py-1">ABHINAV KUMAR</p>
                </div>
                <div>
                    <Label className="text-gray-300">Enrollment no</Label>
                    <p className="border-b border-gray-300 py-1">2341011109</p>
                </div>
                <div>
                    <Label className="text-gray-300">Program</Label>
                    <p className="border-b border-gray-300 py-1">BTECH</p>
                </div>
                <div>
                    <Label className="text-gray-300">Section</Label>
                    <p className="border-b border-gray-300 py-1">IOT-412B1</p>
                </div>
                <div>
                    <Label className="text-gray-300">Subsection</Label>
                    <p className="border-b border-gray-300 py-1">IOT-412B1</p>
                </div>
            </div>

            {/* Bottom Row - Dropdown + Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                <div className="flex-1 w-full sm:w-auto">
                    <Label htmlFor="semester-code" className="text-gray-300">
                        Select Semester code <span className="text-blue-500">*</span>
                    </Label>
                    <Select onValueChange={setCode}>
                        <SelectTrigger id="registration-code" className="mt-1 w-auto min-w-[200px]">
                            <SelectValue placeholder="Select code" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="odd-sem-2025">ODD SEM 2025</SelectItem>
                            <SelectItem value="even-sem-2025">EVEN SEM 2025</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    type="submit"
                    disabled={!code}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                    <Save size={16} />
                    Submit
                </Button>
            </div>
        </form>
    )
}
