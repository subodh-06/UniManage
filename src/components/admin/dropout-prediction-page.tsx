"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock dropout risk data
const dropoutData = [
  { id: 1, name: "Amit Sharma", rollNo: "CSE2101", branch: "CSE", semester: "3rd", attendance: 62, cgpa: 5.4, feesPaid: false, risk: "High" },
  { id: 2, name: "Riya Verma", rollNo: "ECE2105", branch: "ECE", semester: "4th", attendance: 78, cgpa: 6.8, feesPaid: true, risk: "Medium" },
  { id: 3, name: "Rahul Das", rollNo: "ME2109", branch: "ME", semester: "2nd", attendance: 90, cgpa: 8.1, feesPaid: true, risk: "Low" },
  { id: 4, name: "Neha Gupta", rollNo: "CSE2110", branch: "CSE", semester: "3rd", attendance: 55, cgpa: 4.9, feesPaid: false, risk: "High" },
]

export default function DropoutPredictionPage() {
  const [records] = React.useState(dropoutData)
  const [filterBranch, setFilterBranch] = React.useState("all")
  const [filterRisk, setFilterRisk] = React.useState("all")
  const [search, setSearch] = React.useState("")

  // Filtering logic
  const filteredRecords = records.filter((r) => {
    const branchMatch = filterBranch === "all" || r.branch === filterBranch
    const riskMatch = filterRisk === "all" || r.risk === filterRisk
    const searchMatch =
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(search.toLowerCase())
    return branchMatch && riskMatch && searchMatch
  })

  const handleExport = () => {
    toast.success("Dropout report exported", { position: "top-center" })
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Dropout Prediction</CardTitle>
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

            {/* Risk Filter */}
            <Select onValueChange={setFilterRisk} defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Search */}
            <Input
              placeholder="Search by name/roll no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[220px]"
            />

            <Button onClick={handleExport}>Export Report</Button>
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
                <TableHead>Attendance %</TableHead>
                <TableHead>CGPA</TableHead>
                <TableHead>Fees Status</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.rollNo}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.branch}</TableCell>
                  <TableCell>{r.semester}</TableCell>
                  <TableCell>{r.attendance}%</TableCell>
                  <TableCell>{r.cgpa}</TableCell>
                  <TableCell>
                    <Badge variant={r.feesPaid ? "default" : "destructive"}>
                      {r.feesPaid ? "Paid" : "Not Paid"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        r.risk === "High"
                          ? "destructive"
                          : r.risk === "Medium"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {r.risk}
                    </Badge>
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