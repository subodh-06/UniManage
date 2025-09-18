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
import { toast } from "sonner"
import { BookOpen, AlertCircle, CheckCircle2, IndianRupee } from "lucide-react"

// Mock book issue data
const issuedBooks = [
  {
    id: 1,
    name: "Amit Sharma",
    rollNo: "CSE2101",
    branch: "CSE",
    book: "Data Structures in C",
    issueDate: "2025-08-01",
    dueDate: "2025-08-15",
    returned: false,
    fine: 200,
  },
  {
    id: 2,
    name: "Riya Verma",
    rollNo: "ECE2105",
    branch: "ECE",
    book: "Digital Logic Design",
    issueDate: "2025-07-20",
    dueDate: "2025-08-05",
    returned: true,
    fine: 0,
  },
  {
    id: 3,
    name: "Rahul Das",
    rollNo: "ME2109",
    branch: "ME",
    book: "Thermodynamics",
    issueDate: "2025-08-10",
    dueDate: "2025-08-25",
    returned: false,
    fine: 0,
  },
]

export default function LibraryManagementPage() {
  const [records, setRecords] = React.useState(issuedBooks)
  const [filterBranch, setFilterBranch] = React.useState("all")
  const [filterStatus, setFilterStatus] = React.useState("all")
  const [filterFee, setFilterFee] = React.useState("all")
  const [search, setSearch] = React.useState("")

  const handleMarkReturned = (id: number) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, returned: true, fine: 0 } : r
      )
    )
    const student = records.find((r) => r.id === id)
    toast.success("Book marked as returned", {
      description: `${student?.name} has returned the book.`,
      position: "top-center",
    })
  }

  const handleFeePayment = (id: number) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, fine: 0 } : r
      )
    )
    const student = records.find((r) => r.id === id)
    toast.success("Fee payment recorded", {
      description: `Cleared dues for ${student?.name}.`,
      position: "top-center",
    })
  }

  // Filtering + Search logic
  const filteredRecords = records.filter((r) => {
    const status = r.returned ? "Returned" : "Pending"
    const feeStatus = r.fine > 0 ? "Unpaid" : "Clear"

    const branchMatch = filterBranch === "all" || r.branch === filterBranch
    const statusMatch = filterStatus === "all" || status === filterStatus
    const feeMatch = filterFee === "all" || feeStatus === filterFee
    const searchMatch =
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      r.book.toLowerCase().includes(search.toLowerCase())

    return branchMatch && statusMatch && feeMatch && searchMatch
  })

  // Overview stats
  const totalIssued = records.length
  const pendingReturns = records.filter((r) => !r.returned).length
  const collectedFees = issuedBooks.reduce((sum, r) => sum + (r.returned ? 0 : 0), 0) // static mock
  const pendingFees = records.reduce((sum, r) => sum + r.fine, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Total Issued Books</CardTitle>
            <BookOpen className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIssued}</div>
            <p className="text-sm text-muted-foreground">Current issued count</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Pending Returns</CardTitle>
            <AlertCircle className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReturns}</div>
            <p className="text-sm text-muted-foreground">Overdue & not returned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Collected Fees</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{collectedFees.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">From library fines</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Pending Fees</CardTitle>
            <IndianRupee className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{pendingFees.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">To be collected</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Issued Books</CardTitle>
            <div className="flex gap-4 flex-wrap items-center">
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
                  <SelectItem value="Civil">Civil</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select onValueChange={setFilterStatus} defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Returned">Returned</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              {/* Fee Filter */}
              <Select onValueChange={setFilterFee} defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Fee Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Clear">Clear</SelectItem>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>

              {/* Search */}
              <Input
                placeholder="Search student or book..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[220px]"
              />
            </div>
          </div>
        </CardHeader>

        {/* Issued Books Table */}
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fine</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((r) => {
                const status = r.returned ? "Returned" : "Pending"
                const feeStatus = r.fine > 0 ? "Unpaid" : "Clear"
                return (
                  <TableRow key={r.id}>
                    <TableCell>{r.rollNo}</TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.branch}</TableCell>
                    <TableCell>{r.book}</TableCell>
                    <TableCell>{r.issueDate}</TableCell>
                    <TableCell>{r.dueDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          status === "Returned" ? "default" : "destructive"
                        }
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          feeStatus === "Unpaid" ? "destructive" : "secondary"
                        }
                      >
                        {r.fine > 0 ? `₹${r.fine}` : "Clear"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {!r.returned && (
                        <Button size="sm" onClick={() => handleMarkReturned(r.id)}>
                          Mark Returned
                        </Button>
                      )}
                      {r.fine > 0 && (
                        <Button size="sm" variant="outline" onClick={() => handleFeePayment(r.id)}>
                          Record Fee
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