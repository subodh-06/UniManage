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
import { MoreHorizontal, Plus } from "lucide-react"
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

type StaffRecord = {
  id: number
  name: string
  email: string
  department: "CSE" | "ECE" | "Physics" | "Management" | ""
  role: "Professor" | "Assistant Professor" | "Lecturer" | ""
  status: "Active" | "Inactive"
}

// Mock staff data
const staffList: StaffRecord[] = [
  {
    id: 1,
    name: "Dr. Rakesh Singh",
    email: "rakesh.singh@example.com",
    department: "CSE",
    role: "Professor",
    status: "Active",
  },
  {
    id: 2,
    name: "Anita Mehta",
    email: "anita.mehta@example.com",
    department: "ECE",
    role: "Assistant Professor",
    status: "Active",
  },
  {
    id: 3,
    name: "Suresh Kumar",
    email: "suresh.kumar@example.com",
    department: "Physics",
    role: "Lecturer",
    status: "Inactive",
  },
]

export default function StaffPage() {
  const [records, setRecords] = React.useState<StaffRecord[]>(staffList)

  type DeptFilter = "all" | StaffRecord["department"]
  type RoleFilter = "all" | StaffRecord["role"]
  type StatusFilter = "all" | StaffRecord["status"]

  // Filters
  const [filterDept, setFilterDept] = React.useState<DeptFilter>("all")
  const [filterRole, setFilterRole] = React.useState<RoleFilter>("all")
  const [filterStatus, setFilterStatus] = React.useState<StatusFilter>("all")
  const [search, setSearch] = React.useState("")

  // Dialog state
  const [editStaff, setEditStaff] = React.useState<StaffRecord | null>(null)
  const [isAdding, setIsAdding] = React.useState(false)

  const handleRemove = (id: number) => {
    const removed = records.find((s) => s.id === id)
    setRecords((prev) => prev.filter((s) => s.id !== id))
    toast.error(`${removed?.name} has been removed`)
  }

  const handleView = (staff: StaffRecord) => {
    toast.info(`Viewing profile of ${staff.name}`)
  }

  const handleEdit = (staff: StaffRecord) => {
    setIsAdding(false)
    setEditStaff(staff)
  }

  const handleAddNew = () => {
    setIsAdding(true)
    setEditStaff({
      id: Date.now(),
      name: "",
      email: "",
      department: "",
      role: "",
      status: "Active",
    })
  }

  const handleSaveEdit = () => {
    if (!editStaff) return

    if (isAdding) {
      setRecords((prev) => [...prev, editStaff])
      toast.success(`New staff ${editStaff.name} added`)
    } else {
      setRecords((prev) =>
        prev.map((s) => (s.id === editStaff.id ? editStaff : s))
      )
      toast.success(`${editStaff.name}'s details updated`)
    }

    setEditStaff(null)
    setIsAdding(false)
  }

  // Filtering + Search logic
  const filteredRecords = records.filter((s) => {
    const deptMatch = filterDept === "all" || s.department === filterDept
    const roleMatch = filterRole === "all" || s.role === filterRole
    const statusMatch = filterStatus === "all" || s.status === filterStatus
    const searchMatch =
      search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
    return deptMatch && roleMatch && statusMatch && searchMatch
  })

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Staff Records</CardTitle>
            <div className="flex gap-4 flex-wrap items-center">
              {/* Department Filter */}
              <Select
                onValueChange={(val) => setFilterDept(val as DeptFilter)}
                value={filterDept}
              >
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
              <Select
                onValueChange={(val) => setFilterRole(val as RoleFilter)}
                value={filterRole}
              >
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

              {/* Status Filter */}
              <Select
                onValueChange={(val) => setFilterStatus(val as StatusFilter)}
                value={filterStatus}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* Search Bar */}
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[220px]"
              />

              {/* Add New Staff Button */}
              <Button onClick={handleAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                Add Staff
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>
                    <Badge variant={staff.status === "Active" ? "default" : "secondary"}>
                      {staff.status}
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
                        <DropdownMenuItem onClick={() => handleView(staff)}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(staff)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleRemove(staff.id)}
                        >
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Staff Dialog */}
      <Dialog open={!!editStaff} onOpenChange={() => setEditStaff(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isAdding ? "Add New Staff" : "Edit Staff"}</DialogTitle>
          </DialogHeader>
          {editStaff && (
            <div className="space-y-4 py-2">
              <Input
                placeholder="Name"
                value={editStaff.name}
                onChange={(e) => setEditStaff({ ...editStaff, name: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={editStaff.email}
                onChange={(e) => setEditStaff({ ...editStaff, email: e.target.value })}
              />
              <Select
                onValueChange={(val) => setEditStaff({ ...editStaff, department: val as StaffRecord["department"] })}
                value={editStaff.department}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSE">CSE</SelectItem>
                  <SelectItem value="ECE">ECE</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(val) => setEditStaff({ ...editStaff, role: val as StaffRecord["role"] })}
                value={editStaff.role}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                  <SelectItem value="Lecturer">Lecturer</SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(val) => setEditStaff({ ...editStaff, status: val as StaffRecord["status"] })}
                value={editStaff.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditStaff(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              {isAdding ? "Add Staff" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
