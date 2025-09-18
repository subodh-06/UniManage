"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

type Student = {
  id: number
  name: string
  rollNo: string
  branch: string
  year: string
  attendance: number
}

// Mock attendance records
const students: Student[] = [
  { id: 1, name: "Rahul Sharma", rollNo: "CSE2025-001", branch: "CSE", year: "2nd Year", attendance: 92 },
  { id: 2, name: "Priya Verma", rollNo: "ECE2025-014", branch: "ECE", year: "1st Year", attendance: 78 },
  { id: 3, name: "Amit Kumar", rollNo: "PHY2025-007", branch: "Physics", year: "3rd Year", attendance: 55 },
  { id: 4, name: "Sneha Das", rollNo: "MGT2025-022", branch: "Management", year: "2nd Year", attendance: 85 },
]

export default function AttendancePage() {
  const [records] = React.useState<Student[]>(students) // Removed setRecords

  const [filterBranch, setFilterBranch] = React.useState<string>("all")
  const [filterYear, setFilterYear] = React.useState<string>("all")
  const [filterStatus, setFilterStatus] = React.useState<string>("all")
  const [search, setSearch] = React.useState<string>("")

  const getStatus = (attendance: number) => {
    if (attendance >= 85) return "Good"
    if (attendance >= 60) return "Warning"
    return "Poor"
  }

  const handleWarning = (student: Student) => {
    toast.warning(`Warning sent to ${student.name} for low attendance`)
  }

  // Filtering + Search logic
  const filteredRecords = records.filter((s) => {
    const status = getStatus(s.attendance)
    const branchMatch = filterBranch === "all" || s.branch === filterBranch
    const yearMatch = filterYear === "all" || s.year === filterYear
    const statusMatch = filterStatus === "all" || status === filterStatus
    const searchMatch =
      search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase())
    return branchMatch && yearMatch && statusMatch && searchMatch
  })

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Attendance Monitoring</CardTitle>
            <div className="flex gap-4 flex-wrap items-center">
              {/* Branch Filter */}
              <Select onValueChange={setFilterBranch} defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="CSE">CSE</SelectItem>
                  <SelectItem value="ECE">ECE</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                </SelectContent>
              </Select>

              {/* Year Filter */}
              <Select onValueChange={setFilterYear} defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                </SelectContent>
              </Select>

              {/* Attendance Status Filter */}
              <Select onValueChange={setFilterStatus} defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Good">Good (≥85%)</SelectItem>
                  <SelectItem value="Warning">Warning (60–84%)</SelectItem>
                  <SelectItem value="Poor">Poor (&lt;60%)</SelectItem>
                </SelectContent>
              </Select>

              {/* Search Bar */}
              <Input
                placeholder="Search by name or roll no..."
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
                <TableHead>Branch</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Attendance %</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((student) => {
                const status = getStatus(student.attendance)
                return (
                  <TableRow key={student.id}>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.branch}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>{student.attendance}%</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          status === "Good"
                            ? "default"
                            : status === "Warning"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {status !== "Good" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleWarning(student)}
                        >
                          Send Warning
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
