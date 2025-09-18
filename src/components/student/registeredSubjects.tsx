"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"

interface Subject {
  code: string
  name: string
  credits: number
  type: string // e.g., Core, Elective
}

const subjects: Subject[] = [
  { code: "CSE301", name: "Operating Systems", credits: 4, type: "Core" },
  { code: "CSE305", name: "Database Management Systems", credits: 3, type: "Core" },
  { code: "CSE310", name: "Machine Learning", credits: 3, type: "Elective" },
  { code: "MTH201", name: "Discrete Mathematics", credits: 4, type: "Core" },
]

export default function RegisteredSubjects() {
  return (
    <div className="w-full p-6 border rounded-lg shadow-sm space-y-6">
      <Label className="text-lg font-semibold text-gray-300">
        Registered Subjects
      </Label>

      {/* Table for desktop, stacked for mobile */}
      <div className="overflow-x-auto">
        <div className="hidden md:grid grid-cols-12 font-medium text-gray-500 border-b pb-2">
          <span className="col-span-2">Code</span>
          <span className="col-span-6">Subject Name</span>
          <span className="col-span-2">Credits</span>
          <span className="col-span-2">Type</span>
        </div>

        {/* Subject rows */}
        {/* Subject rows */}
        <div className="space-y-4 md:space-y-0">
          {subjects.map((subj, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 md:items-center gap-1 md:gap-4 py-2 border-b last:border-none"
            >
              {/* Code */}
              <div className="flex md:block md:col-span-2">
                <Label className="md:hidden w-28 text-gray-100">Code</Label>
                <span className="border-b md:border-0 flex-1 py-1">{subj.code}</span>
              </div>

              {/* Name */}
              <div className="flex md:block md:col-span-6">
                <Label className="md:hidden w-28 text-gray-300">Name</Label>
                <span className="border-b md:border-0 flex-1 py-1">{subj.name}</span>
              </div>

              {/* Credits */}
              <div className="flex md:block md:col-span-2">
                <Label className="md:hidden w-28 text-gray-300">Credits</Label>
                <span className="border-b md:border-0 flex-1 py-1">{subj.credits}</span>
              </div>

              {/* Type */}
              <div className="flex md:block md:col-span-2">
                <Label className="md:hidden w-28 text-gray-300">Type</Label>
                <span className="border-b md:border-0 flex-1 py-1">{subj.type}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
