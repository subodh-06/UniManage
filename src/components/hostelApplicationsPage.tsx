"use client"

import * as React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function HostelApplicationsPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("Application submitted successfully ✅")
    }, 1500)
  }

  return (
    <div className="w-full p-6 border rounded-lg shadow-sm space-y-10">
      {/* Hostel Change Application */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Hostel Change Application</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label>Current Hostel</Label>
            <Input placeholder="Enter current hostel" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Current Room No.</Label>
            <Input placeholder="Enter room no." required />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Requested Hostel</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select hostel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aryabhatta">Aryabhatta Hostel</SelectItem>
                <SelectItem value="ramanujan">Ramanujan Hostel</SelectItem>
                <SelectItem value="gargi">Gargi Hostel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Requested Room No. (Optional)</Label>
            <Input placeholder="Enter preferred room" />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2">
            <Label>Reason for Change</Label>
            <Textarea placeholder="Write your reason..." required />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </div>

      <hr className="my-8" />

      {/* Hostel Leave Application */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Hostel Leave Application</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label>Hostel Name</Label>
            <Input placeholder="Enter hostel name" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Room No.</Label>
            <Input placeholder="Enter room no." required />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Leave From</Label>
            <Input type="date" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Leave To</Label>
            <Input type="date" required />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-2">
            <Label>Reason for Leave</Label>
            <Textarea placeholder="Write your reason..." required />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
