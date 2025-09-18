"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

type HostelStatus = "Approved" | "Pending" | "Rejected"
type BedType = "Single" | "Double"

type HostelRecord = {
  id: number
  name: string
  rollNo: string
  hostel: string
  roomNo: string
  bedType: BedType
  status: HostelStatus
}

// Mock hostel data
const hostelData : HostelRecord[] = [
  {
    id: 1,
    name: "Amit Sharma",
    rollNo: "CSE2101",
    hostel: "Hostel A",
    roomNo: "A-101",
    bedType: "Single",
    status: "Approved",
  },
  {
    id: 2,
    name: "Riya Verma",
    rollNo: "ECE2105",
    hostel: "Hostel B",
    roomNo: "B-203",
    bedType: "Double",
    status: "Pending",
  },
  {
    id: 3,
    name: "Rahul Das",
    rollNo: "ME2109",
    hostel: "Hostel A",
    roomNo: "A-104",
    bedType: "Double",
    status: "Rejected",
  },
]

export default function HostelManagementPage() {
 const [records, setRecords] = React.useState<HostelRecord[]>(hostelData)
 const [filterHostel, setFilterHostel] = React.useState<string>("all")
const [filterType, setFilterType] = React.useState<string>("all")
const [filterStatus, setFilterStatus] = React.useState<string>("all")
 const [search, setSearch] = React.useState<string>("")

  // Dialog states
  const [selectedStudent, setSelectedStudent] = React.useState<HostelRecord | null>(null)
 const [actionType, setActionType] = React.useState<"approve" | "reject" | "">("")

const handleAction = (student: HostelRecord, action: "approve" | "reject") => {
  setSelectedStudent(student)
  setActionType(action)
}

  const confirmAction = () => {
  if (!selectedStudent) return

  const updatedStatus: HostelStatus =
    actionType === "approve"
      ? "Approved"
      : actionType === "reject"
      ? "Rejected"
      : selectedStudent.status

  setRecords((prev) =>
    prev.map((s) =>
      s.id === selectedStudent.id ? { ...s, status: updatedStatus } : s
    )
  )

  toast.success(`Application ${updatedStatus}`, {
    description: `${selectedStudent.name} (${selectedStudent.rollNo})`,
    position: "top-center",
  })

  setSelectedStudent(null)
  setActionType("")
}

  // Filtering logic
  const filteredRecords = records.filter((s) => {
    const hostelMatch = filterHostel === "all" || s.hostel === filterHostel
    const typeMatch = filterType === "all" || s.bedType === filterType
    const statusMatch = filterStatus === "all" || s.status === filterStatus
    const searchMatch =
      search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase())
    return hostelMatch && typeMatch && statusMatch && searchMatch
  })

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Hostel Management</CardTitle>
            <div className="flex gap-4 flex-wrap items-center">
              {/* Hostel Filter */}
              <Select onValueChange={setFilterHostel} defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Hostel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hostels</SelectItem>
                  <SelectItem value="Hostel A">Hostel A</SelectItem>
                  <SelectItem value="Hostel B">Hostel B</SelectItem>
                  <SelectItem value="Hostel C">Hostel C</SelectItem>
                </SelectContent>
              </Select>

              {/* Room Type Filter */}
              <Select onValueChange={setFilterType} defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Double">Double</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select onValueChange={setFilterStatus} defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              {/* Search Bar */}
              <Input
                placeholder="Search name or roll no..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[220px]"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Hostel</TableHead>
                <TableHead>Room No</TableHead>
                <TableHead>Bed Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.hostel}</TableCell>
                  <TableCell>{student.roomNo}</TableCell>
                  <TableCell>{student.bedType}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.status === "Approved"
                          ? "default"
                          : student.status === "Pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {student.status === "Pending" && (
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" onClick={() => handleAction(student, "approve")}>
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleAction(student, "reject")}>
                          Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <p>
              Are you sure you want to{" "}
              <strong>
                {actionType === "approve" ? "approve" : "reject"}
              </strong>{" "}
              the application of {selectedStudent.name} ({selectedStudent.rollNo})?
            </p>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setSelectedStudent(null)}>
              Cancel
            </Button>
            <Button onClick={confirmAction}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}