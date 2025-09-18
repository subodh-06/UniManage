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
import { FileDown } from "lucide-react"

// Payment record type
type PaymentRecord = {
  id: number
  name: string
  rollNo: string
  branch: string
  year: string
  type: string
  amount: number
  date: string
  transactionId: string
}

// Mock payment data
const paymentData: PaymentRecord[] = [
  {
    id: 1,
    name: "Amit Sharma",
    rollNo: "CSE2101",
    branch: "CSE",
    year: "2nd Year",
    type: "Tuition Fees",
    amount: 50000,
    date: "2025-08-05",
    transactionId: "TXN12345",
  },
  {
    id: 2,
    name: "Riya Verma",
    rollNo: "ECE2105",
    branch: "ECE",
    year: "3rd Year",
    type: "Hostel Fees",
    amount: 30000,
    date: "2025-07-30",
    transactionId: "TXN12346",
  },
  {
    id: 3,
    name: "Rahul Das",
    rollNo: "ME2109",
    branch: "ME",
    year: "1st Year",
    type: "Library Fees",
    amount: 2000,
    date: "2025-08-10",
    transactionId: "TXN12347",
  },
]

export default function ReceiptsPage() {
  const [records] = React.useState<PaymentRecord[]>(paymentData)
  const [filterBranch, setFilterBranch] = React.useState<string>("all")
  const [filterYear, setFilterYear] = React.useState<string>("all")
  const [filterType, setFilterType] = React.useState<string>("all")
  const [search, setSearch] = React.useState<string>("")

  const handleDownload = (record: PaymentRecord) => {
    toast.success("Receipt downloaded", {
      description: `${record.name} - ₹${record.amount.toLocaleString()} (${record.type})`,
      position: "top-center",
    })
  }

  // Filtering + Search logic
  const filteredRecords = records.filter((r) => {
    const branchMatch = filterBranch === "all" || r.branch === filterBranch
    const yearMatch = filterYear === "all" || r.year === filterYear
    const typeMatch = filterType === "all" || r.type === filterType
    const searchMatch =
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      r.transactionId.toLowerCase().includes(search.toLowerCase())

    return branchMatch && yearMatch && typeMatch && searchMatch
  })

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Payment Receipts</CardTitle>
            <div className="flex gap-4 flex-wrap items-center">
              {/* Branch Filter */}
              <Select onValueChange={(val) => setFilterBranch(val)} value={filterBranch}>
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
              <Select onValueChange={(val) => setFilterYear(val)} value={filterYear}>
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

              {/* Type Filter */}
              <Select onValueChange={(val) => setFilterType(val)} value={filterType}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Payment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Tuition Fees">Tuition Fees</SelectItem>
                  <SelectItem value="Hostel Fees">Hostel Fees</SelectItem>
                  <SelectItem value="Library Fees">Library Fees</SelectItem>
                  <SelectItem value="Exam Fees">Exam Fees</SelectItem>
                </SelectContent>
              </Select>

              {/* Search */}
              <Input
                placeholder="Search name, roll no, txn..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[220px]"
              />
            </div>
          </div>
        </CardHeader>

        {/* Receipts Table */}
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.transactionId}</TableCell>
                  <TableCell>{r.rollNo}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.branch}</TableCell>
                  <TableCell>{r.year}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{r.type}</Badge>
                  </TableCell>
                  <TableCell>₹{r.amount.toLocaleString()}</TableCell>
                  <TableCell>{r.date}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(r)}
                    >
                      <FileDown className="h-4 w-4 mr-2" />
                      Download
                    </Button>
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
