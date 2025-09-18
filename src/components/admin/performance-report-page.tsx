"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { FileDown } from "lucide-react"

// Mock performance data
const performanceData = [
  { id: 1, name: "Amit Sharma", rollNo: "CSE2101", branch: "CSE", semester: "3rd", subject: "Data Structures", marks: 82, grade: "A" },
  { id: 2, name: "Riya Verma", rollNo: "CSE2105", branch: "CSE", semester: "3rd", subject: "Data Structures", marks: 65, grade: "B" },
  { id: 3, name: "Rahul Das", rollNo: "ECE2109", branch: "ECE", semester: "4th", subject: "Digital Electronics", marks: 72, grade: "B+" },
  { id: 4, name: "Neha Gupta", rollNo: "ME2110", branch: "ME", semester: "2nd", subject: "Thermodynamics", marks: 90, grade: "A+" },
  { id: 5, name: "Karan Singh", rollNo: "CSE2111", branch: "CSE", semester: "3rd", subject: "Data Structures", marks: 55, grade: "C" },
]

export default function PerformanceReportsPage() {
  const [records] = React.useState(performanceData)
  const [filterBranch, setFilterBranch] = React.useState("all")
  const [filterSem, setFilterSem] = React.useState("all")
  const [filterSubject, setFilterSubject] = React.useState("all")
  const [search, setSearch] = React.useState("")

  // Filtering logic
  const filteredRecords = records.filter((r) => {
    const branchMatch = filterBranch === "all" || r.branch === filterBranch
    const semMatch = filterSem === "all" || r.semester === filterSem
    const subjectMatch = filterSubject === "all" || r.subject === filterSubject
    const searchMatch =
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(search.toLowerCase())
    return branchMatch && semMatch && subjectMatch && searchMatch
  })

  // Grade distribution for chart
  const gradeCounts = filteredRecords.reduce((acc: Record<string, number>, curr) => {
    acc[curr.grade] = (acc[curr.grade] || 0) + 1
    return acc
  }, {})

  const gradeData = Object.keys(gradeCounts).map((grade) => ({
    grade,
    count: gradeCounts[grade],
  }))

  const handleExport = () => {
    toast.success("Performance report exported", { position: "top-center" })
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Performance Reports</CardTitle>
          <div className="flex gap-3 flex-wrap items-center">
            {/* Branch Filter */}
            <Select onValueChange={setFilterBranch} defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="ECE">ECE</SelectItem>
                <SelectItem value="ME">ME</SelectItem>
              </SelectContent>
            </Select>

            {/* Semester Filter */}
            <Select onValueChange={setFilterSem} defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="2nd">2nd</SelectItem>
                <SelectItem value="3rd">3rd</SelectItem>
                <SelectItem value="4th">4th</SelectItem>
              </SelectContent>
            </Select>

            {/* Subject Filter */}
            <Select onValueChange={setFilterSubject} defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Data Structures">Data Structures</SelectItem>
                <SelectItem value="Digital Electronics">Digital Electronics</SelectItem>
                <SelectItem value="Thermodynamics">Thermodynamics</SelectItem>
              </SelectContent>
            </Select>

            {/* Search */}
            <Input
              placeholder="Search by name/roll no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[220px]"
            />

            <Button onClick={handleExport}>
              <FileDown className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>

        {/* Table */}
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.rollNo}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.branch}</TableCell>
                  <TableCell>{r.semester}</TableCell>
                  <TableCell>{r.subject}</TableCell>
                  <TableCell>{r.marks}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        r.grade === "A+" || r.grade === "A"
                          ? "default"
                          : r.grade === "B" || r.grade === "B+"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {r.grade}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>Grade Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {gradeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground">No data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}