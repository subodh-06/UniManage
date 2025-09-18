"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

// ✅ Define staff type
type StaffRecord = {
  id: number
  name: string
  department: string
  role: string
  courses: string[]
  workload: number
}

// Mock workload data
const workloadData: StaffRecord[] = [
  {
    id: 1,
    name: "Dr. Rakesh Singh",
    department: "CSE",
    role: "Professor",
    courses: ["AI", "ML"],
    workload: 16,
  },
  {
    id: 2,
    name: "Anita Mehta",
    department: "ECE",
    role: "Assistant Professor",
    courses: ["VLSI Design"],
    workload: 12,
  },
  {
    id: 3,
    name: "Suresh Kumar",
    department: "Physics",
    role: "Lecturer",
    courses: ["Quantum Mechanics", "Optics"],
    workload: 20,
  },
]

export default function WorkloadPage() {
  const [records, setRecords] = React.useState<StaffRecord[]>(workloadData)
  const [filterDept, setFilterDept] = React.useState<string>("all")
  const [filterRole, setFilterRole] = React.useState<string>("all")
  const [search, setSearch] = React.useState<string>("")

  // Dialog states
  const [editStaff, setEditStaff] = React.useState<StaffRecord | null>(null)
  const [previousStaff, setPreviousStaff] = React.useState<StaffRecord | null>(null)

  const handleEdit = (staff: StaffRecord) => {
    setPreviousStaff({ ...staff }) // store old state for undo
    setEditStaff({ ...staff }) // clone to edit
  }

  const handleSave = () => {
    if (!editStaff) return
    setRecords((prev) =>
      prev.map((s) => (s.id === editStaff.id ? editStaff : s))
    )

    toast.success("Workload updated", {
      description: `${editStaff.name}'s workload has been saved.`,
      position: "top-center",
      action: {
        label: "Undo",
        onClick: () => {
          if (previousStaff) {
            setRecords((prev) =>
              prev.map((s) =>
                s.id === previousStaff.id ? previousStaff : s
              )
            )
            toast.info("Undo successful — restored previous workload", {
              position: "top-center",
            })
          }
        },
      },
    })

    setEditStaff(null)
  }

  // Filtering + Search logic
  const filteredRecords = records.filter((s) => {
    const deptMatch = filterDept === "all" || s.department === filterDept
    const roleMatch = filterRole === "all" || s.role === filterRole
    const searchMatch =
      search === "" || s.name.toLowerCase().includes(search.toLowerCase())
    return deptMatch && roleMatch && searchMatch
  })

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Staff Workload Management</CardTitle>
            <div className="flex gap-4 flex-wrap items-center">
              {/* Department Filter */}
              <Select onValueChange={setFilterDept} defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="CSE">CSE</SelectItem>
                  <SelectItem value="ECE">ECE</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                </SelectContent>
              </Select>

              {/* Role Filter */}
              <Select onValueChange={setFilterRole} defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                  <SelectItem value="Lecturer">Lecturer</SelectItem>
                </SelectContent>
              </Select>

              {/* Search Bar */}
              <Input
                placeholder="Search by staff name..."
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
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Workload (hrs/week)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((staff) => {
                const status = staff.workload > 18 ? "High" : "Normal"
                return (
                  <TableRow key={staff.id}>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.department}</TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>{staff.courses.join(", ")}</TableCell>
                    <TableCell>{staff.workload}</TableCell>
                    <TableCell>
                      <Badge
                        variant={status === "Normal" ? "default" : "destructive"}
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(staff)}>
                            Edit Workload
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Workload Dialog */}
      <Dialog open={!!editStaff} onOpenChange={() => setEditStaff(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Workload</DialogTitle>
          </DialogHeader>
          {editStaff && (
            <div className="space-y-4 py-2">
              <Input
                placeholder="Courses (comma separated)"
                value={editStaff.courses.join(", ")}
                onChange={(e) =>
                  setEditStaff({
                    ...editStaff,
                    courses: e.target.value.split(",").map((c) => c.trim()),
                  })
                }
              />
              <Input
                type="number"
                placeholder="Workload (hours/week)"
                value={editStaff.workload}
                onChange={(e) =>
                  setEditStaff({
                    ...editStaff,
                    workload: Number(e.target.value),
                  })
                }
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditStaff(null)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
