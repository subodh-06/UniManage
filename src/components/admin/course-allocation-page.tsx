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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

type Staff = {
  id: number
  name: string
  department: string
  role: string
  courses: string[]
}


// Mock staff data
const staffData: Staff[] = [
  { id: 1, name: "Dr. Rakesh Singh", department: "CSE", role: "Professor", courses: ["AI", "Machine Learning"] },
  { id: 2, name: "Anita Mehta", department: "ECE", role: "Assistant Professor", courses: ["VLSI Design"] },
  { id: 3, name: "Suresh Kumar", department: "ME", role: "Lecturer", courses: ["Thermodynamics", "Heat Transfer"] },
]

export default function CourseAllocationPage() {
  const [records, setRecords] = React.useState<Staff[]>(staffData)
  const [filterDept, setFilterDept] = React.useState("all")
  const [filterRole, setFilterRole] = React.useState("all")
  const [search, setSearch] = React.useState("")

  // Dialog states
  const [selectedStaff, setSelectedStaff] = React.useState<Staff | null>(null)
  const [newCourse, setNewCourse] = React.useState("")

const handleOpen = (staff: Staff) => {
  setSelectedStaff(staff)
  setNewCourse("")
}

  const handleAddCourse = () => {
    if (!selectedStaff || newCourse.trim() === "") return
    setRecords((prev) =>
      prev.map((s) =>
        s.id === selectedStaff.id
          ? { ...s, courses: [...s.courses, newCourse.trim()] }
          : s
      )
    )
    toast.success("Course added successfully", {
      description: `${newCourse} assigned to ${selectedStaff.name}`,
      position: "top-center",
    })
    setNewCourse("")
  }

  const handleRemoveCourse = (course: string) => {
    if (!selectedStaff) return
    setRecords((prev) =>
      prev.map((s) =>
        s.id === selectedStaff.id
          ? { ...s, courses: s.courses.filter((c) => c !== course) }
          : s
      )
    )
    toast.success("Course removed", {
      description: `${course} removed from ${selectedStaff.name}`,
      position: "top-center",
    })
  }

  // Filtering logic
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
            <CardTitle>Course Allocation</CardTitle>
            <div className="flex gap-4 flex-wrap items-center">
              {/* Department Filter */}
              <Select onValueChange={setFilterDept} defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="CSE">CSE</SelectItem>
                  <SelectItem value="ECE">ECE</SelectItem>
                  <SelectItem value="ME">ME</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                </SelectContent>
              </Select>

              {/* Role Filter */}
              <Select onValueChange={setFilterRole} defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Role" />
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
                placeholder="Search staff..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[220px]"
              />
            </div>
          </div>
        </CardHeader>

        {/* Staff Table */}
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>
                    {staff.courses.length > 0 ? (
                      staff.courses.map((c) => (
                        <Badge key={c} variant="secondary" className="mr-1">
                          {c}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">No courses</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" onClick={() => handleOpen(staff)}>
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Manage Courses Dialog */}
      <Dialog open={!!selectedStaff} onOpenChange={() => setSelectedStaff(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Manage Courses - {selectedStaff?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedStaff && (
            <div className="space-y-4 py-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter new course"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                />
                <Button onClick={handleAddCourse}>Add</Button>
              </div>

              <div>
                <p className="font-medium mb-2">Assigned Courses:</p>
                {selectedStaff.courses.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedStaff.courses.map((c) => (
                      <Badge
                        key={c}
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={() => handleRemoveCourse(c)}
                      >
                        {c} ✕
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No courses assigned</p>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setSelectedStaff(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}