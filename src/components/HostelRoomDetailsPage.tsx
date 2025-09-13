"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"

export default function HostelRoomDetailsPage() {
  const hostelDetails = {
    hostelName: "Boys Hostel - 1",
    roomNo: "125",
    block: "Block B",
    floor: "1st Floor",
    bedNo: "12",
    warden: "Mr. John Doe",
    contact: "+91 9876543210",
    mess: "Veg & Non-Veg",
  }

  return (
    <div className="w-full p-6 border rounded-lg shadow-sm space-y-8">
      {/* Hostel Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <Label className="text-muted-foreground">Hostel Name</Label>
          <p className="font-semibold">{hostelDetails.hostelName}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Room No.</Label>
          <p className="font-semibold">{hostelDetails.roomNo}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Block</Label>
          <p className="font-semibold">{hostelDetails.block}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Floor</Label>
          <p className="font-semibold">{hostelDetails.floor}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Bed No.</Label>
          <p className="font-semibold">{hostelDetails.bedNo}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Warden</Label>
          <p className="font-semibold">{hostelDetails.warden}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Contact</Label>
          <p className="font-semibold">{hostelDetails.contact}</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Mess Facility</Label>
          <p className="font-semibold">{hostelDetails.mess}</p>
        </div>
      </div>

      {/* Rules / Notes */}
      <div className="mt-6 p-4 border rounded-lg bg-muted/30 dark:bg-muted/20">
        <h3 className="font-semibold mb-2">Important Notes</h3>
        <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
          <li>Hostel gate closes at 10:00 PM.</li>
          <li>Visitors are not allowed inside hostel rooms.</li>
          <li>Mess timings must be strictly followed.</li>
          <li>For any issues, contact the warden immediately.</li>
        </ul>
      </div>
    </div>
  )
}
