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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"

type Student = {
  id: number
  name: string
  rollNo: string
  branch: string
  year: string
  totalFees: number
  paid: number
}

// Mock fee data
const feeData: Student[] = [
  { id: 1, name: "Amit Sharma", rollNo: "CSE2101", branch: "CSE", year: "2nd Year", totalFees: 100000, paid: 60000 },
  { id: 2, name: "Riya Verma", rollNo: "ECE2105", branch: "ECE", year: "3rd Year", totalFees: 95000, paid: 95000 },
  { id: 3, name: "Rahul Das", rollNo: "ME2109", branch: "ME", year: "1st Year", totalFees: 85000, paid: 40000 },
]

export default function FeeCollectionPage() {
const [records, setRecords] = React.useState<Student[]>(feeData)
  const [filterBranch, setFilterBranch] = React.useState<string>("all")
  const [filterYear, setFilterYear] = React.useState<string>("all")
  const [filterStatus, setFilterStatus] = React.useState<string>("all")
  const [search, setSearch] = React.useState<string>("")

  // Dialog states
const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null)
  const [paymentAmount, setPaymentAmount] = React.useState<number>(0)

  const handleOpenPayment = (student: Student) => {
    setSelectedStudent(student)
    setPaymentAmount(0)
  }

  const handlePayment = () => {
    if (!selectedStudent || paymentAmount <= 0) return

    setRecords((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...s,
              paid: Math.min(s.paid + paymentAmount, s.totalFees),
            }
          : s
      )
    )

    toast.success("Payment recorded successfully", {
      description: `${paymentAmount} added for ${selectedStudent.name}`,
      position: "top-center",
    })

    setSelectedStudent(null)
    setPaymentAmount(0)
  }

  // Filtering + Search logic
  const filteredRecords = records.filter((s) => {
    const balance = s.totalFees - s.paid
    const status = balance === 0 ? "Paid" : "Pending"

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
            <CardTitle>Fee Collection Management</CardTitle>
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

              {/* Year Filter */}
              <Select onValueChange={setFilterYear} defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select onValueChange={setFilterStatus} defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
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
                <TableHead>Branch</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Total Fees (₹)</TableHead>
                <TableHead>Paid (₹)</TableHead>
                <TableHead>Balance (₹)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((student) => {
                const balance = student.totalFees - student.paid
                const status = balance === 0 ? "Paid" : "Pending"
                return (
                  <TableRow key={student.id}>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.branch}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>₹{student.totalFees.toLocaleString()}</TableCell>
                    <TableCell>₹{student.paid.toLocaleString()}</TableCell>
                    <TableCell>₹{balance.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={status === "Paid" ? "default" : "destructive"}
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {status === "Pending" && (
                        <Button size="sm" onClick={() => handleOpenPayment(student)}>
                          Record Payment
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

      {/* Payment Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4 py-2">
              <p>
                <strong>{selectedStudent.name}</strong> ({selectedStudent.rollNo}) <br />
                Total Fees: ₹{selectedStudent.totalFees.toLocaleString()} <br />
                Paid: ₹{selectedStudent.paid.toLocaleString()} <br />
                Balance: ₹
                {(selectedStudent.totalFees - selectedStudent.paid).toLocaleString()}
              </p>
              <Input
                type="number"
                placeholder="Enter amount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setSelectedStudent(null)}>
              Cancel
            </Button>
            <Button onClick={handlePayment}>Confirm Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}