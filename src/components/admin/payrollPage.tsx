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

type StaffRecord = {
  id: number
  name: string
  department: string
  role: string
  salary: number
  status: "Paid" | "Pending"
  lastPaid: string
}

// Mock staff payroll data
const payrollData: StaffRecord[] = [
  {
    id: 1,
    name: "Dr. Rakesh Singh",
    department: "CSE",
    role: "Professor",
    salary: 95000,
    status: "Paid",
    lastPaid: "2025-08-30",
  },
  {
    id: 2,
    name: "Anita Mehta",
    department: "ECE",
    role: "Assistant Professor",
    salary: 70000,
    status: "Pending",
    lastPaid: "2025-07-30",
  },
  {
    id: 3,
    name: "Suresh Kumar",
    department: "Physics",
    role: "Lecturer",
    salary: 50000,
    status: "Pending",
    lastPaid: "2025-06-30",
  },
]

export default function PayrollPage() {
  const [records, setRecords] = React.useState<StaffRecord[]>(payrollData)
  const [filterDept, setFilterDept] = React.useState<string>("all")
  const [filterRole, setFilterRole] = React.useState<string>("all")
  const [filterStatus, setFilterStatus] = React.useState<string>("all")
  const [search, setSearch] = React.useState<string>("")

  // Dialog state
  const [editStaff, setEditStaff] = React.useState<StaffRecord | null>(null)

  const handleMarkPaid = (id: number) => {
    setRecords((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: "Paid", lastPaid: new Date().toISOString().split("T")[0] }
          : s
      )
    )
    const staff = records.find((s) => s.id === id)
    toast.success(`Marked salary as Paid for ${staff?.name}`)
  }

  const handleEditSalary = (staff: StaffRecord) => {
    setEditStaff(staff)
  }

  const handleSaveSalary = () => {
    if (!editStaff) return
    setRecords((prev) =>
      prev.map((s) => (s.id === editStaff.id ? editStaff : s))
    )
    toast.success(`Updated salary for ${editStaff.name}`)
    setEditStaff(null)
  }

  const filteredRecords = records.filter((s) => {
    const deptMatch = filterDept === "all" || s.department === filterDept
    const roleMatch = filterRole === "all" || s.role === filterRole
    const statusMatch = filterStatus === "all" || s.status === filterStatus
    const searchMatch =
      search === "" || s.name.toLowerCase().includes(search.toLowerCase())
    return deptMatch && roleMatch && statusMatch && searchMatch
  })

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Staff Payroll Management</CardTitle>
            <div className="flex gap-4 flex-wrap items-center">
              {/* Department Filter */}
              <Select onValueChange={setFilterDept} value={filterDept}>
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
              <Select onValueChange={setFilterRole} value={filterRole}>
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
              <Select onValueChange={setFilterStatus} value={filterStatus}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
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
                <TableHead>Salary (₹)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Paid</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>₹{staff.salary.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={staff.status === "Paid" ? "default" : "destructive"}>
                      {staff.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{staff.lastPaid}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEditSalary(staff)}>
                          Edit Salary
                        </DropdownMenuItem>
                        {staff.status === "Pending" && (
                          <DropdownMenuItem onClick={() => handleMarkPaid(staff.id)}>
                            Mark as Paid
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Salary Dialog */}
      <Dialog open={!!editStaff} onOpenChange={() => setEditStaff(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Salary</DialogTitle>
          </DialogHeader>
          {editStaff && (
            <div className="space-y-4 py-2">
              <Input
                type="number"
                placeholder="Salary"
                value={editStaff.salary}
                onChange={(e) =>
                  setEditStaff({ ...editStaff, salary: Number(e.target.value) })
                }
              />
              <Select
                value={editStaff.status}
                onValueChange={(val: StaffRecord["status"]) =>
                  setEditStaff({ ...editStaff, status: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditStaff(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSalary}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
