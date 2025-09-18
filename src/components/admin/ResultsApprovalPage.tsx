"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock results data
const resultsData = [
  {
    id: 1,
    name: "Amit Sharma",
    rollNo: "CSE2101",
    branch: "CSE",
    semester: "3rd",
    subject: "Data Structures",
    marks: 82,
    status: "Pending",
  },
  {
    id: 2,
    name: "Riya Verma",
    rollNo: "ECE2105",
    branch: "ECE",
    semester: "4th",
    subject: "Digital Electronics",
    marks: 74,
    status: "Pending",
  },
  {
    id: 3,
    name: "Rahul Das",
    rollNo: "ME2109",
    branch: "ME",
    semester: "2nd",
    subject: "Thermodynamics",
    marks: 69,
    status: "Pending",
  },
]

export default function ResultsApprovalPage() {
  const [records, setRecords] = React.useState(resultsData)
  const [filterBranch, setFilterBranch] = React.useState("all")
  const [filterSem, setFilterSem] = React.useState("all")
  const [search, setSearch] = React.useState("")

  const handleApprove = (id: number) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Approved" } : r
      )
    )
    toast.success("Result Approved", { position: "top-center" })
  }

  const handleReject = (id: number) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Rejected" } : r
      )
    )
    toast.error("Result Rejected", { position: "top-center" })
  }

  // Filtering logic
  const filteredRecords = records.filter((r) => {
    const branchMatch = filterBranch === "all" || r.branch === filterBranch
    const semMatch = filterSem === "all" || r.semester === filterSem
    const searchMatch =
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(search.toLowerCase())
    return branchMatch && semMatch && searchMatch
  })

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Results Approval</CardTitle>
          <div className="flex gap-3 flex-wrap items-center">
            {/* Branch Filter */}
            <Select onValueChange={setFilterBranch} defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="ECE">ECE</SelectItem>
                <SelectItem value="ME">ME</SelectItem>
                <SelectItem value="Civil">Civil</SelectItem>
              </SelectContent>
            </Select>

            {/* Semester Filter */}
            <Select onValueChange={setFilterSem} defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="1st">1st</SelectItem>
                <SelectItem value="2nd">2nd</SelectItem>
                <SelectItem value="3rd">3rd</SelectItem>
                <SelectItem value="4th">4th</SelectItem>
                <SelectItem value="5th">5th</SelectItem>
                <SelectItem value="6th">6th</SelectItem>
                <SelectItem value="7th">7th</SelectItem>
                <SelectItem value="8th">8th</SelectItem>
              </SelectContent>
            </Select>

            {/* Search */}
            <Input
              placeholder="Search by name or roll no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[220px]"
            />
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
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                        r.status === "Approved"
                          ? "default"
                          : r.status === "Rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {r.status === "Pending" && (
                      <>
                        <Button size="sm" onClick={() => handleApprove(r.id)}>
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(r.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}