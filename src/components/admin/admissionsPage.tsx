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

// Mock student applications with 10th & 12th grades + Branch
const applications = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    course: "B.Tech",
    branch: "CSE",
    status: "Pending",
    appliedOn: "2025-09-10",
    grade10: "85%",
    grade12: "88%",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya.verma@example.com",
    course: "MBA",
    branch: "Management",
    status: "Pending",
    appliedOn: "2025-09-11",
    grade10: "92%",
    grade12: "90%",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    course: "B.Sc",
    branch: "Physics",
    status: "Pending",
    appliedOn: "2025-09-12",
    grade10: "75%",
    grade12: "80%",
  },
  {
    id: 4,
    name: "Sneha Das",
    email: "sneha.das@example.com",
    course: "B.Tech",
    branch: "ECE",
    status: "Pending",
    appliedOn: "2025-09-12",
    grade10: "89%",
    grade12: "85%",
  },
]

export default function AdmissionsPage() {
  const [apps, setApps] = React.useState(applications)
  const [filter10, setFilter10] = React.useState<string>("all")
  const [filter12, setFilter12] = React.useState<string>("all")
  const [filterBranch, setFilterBranch] = React.useState<string>("all")

  const handleAction = (id: number, newStatus: string) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    )
  }

  // Filtering logic
  const filteredApps = apps.filter((app) => {
    const grade10Match =
      filter10 === "all" || parseInt(app.grade10) >= parseInt(filter10)
    const grade12Match =
      filter12 === "all" || parseInt(app.grade12) >= parseInt(filter12)
    const branchMatch =
      filterBranch === "all" || app.branch === filterBranch

    return grade10Match && grade12Match && branchMatch
  })

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Student Applications</CardTitle>
            <div className="flex gap-4 flex-wrap">
              {/* 10th Grade Filter */}
              <Select onValueChange={setFilter10} defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by 10th Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="60">Above 60%</SelectItem>
                  <SelectItem value="70">Above 70%</SelectItem>
                  <SelectItem value="80">Above 80%</SelectItem>
                  <SelectItem value="90">Above 90%</SelectItem>
                </SelectContent>
              </Select>

              {/* 12th Grade Filter */}
              <Select onValueChange={setFilter12} defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by 12th Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="60">Above 60%</SelectItem>
                  <SelectItem value="70">Above 70%</SelectItem>
                  <SelectItem value="80">Above 80%</SelectItem>
                  <SelectItem value="90">Above 90%</SelectItem>
                </SelectContent>
              </Select>

              {/* Branch Filter */}
              <Select onValueChange={setFilterBranch} defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="CSE">CSE</SelectItem>
                  <SelectItem value="ECE">ECE</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>10th Grade</TableHead>
                <TableHead>12th Grade</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApps.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.name}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app.course}</TableCell>
                  <TableCell>{app.branch}</TableCell>
                  <TableCell>{app.grade10}</TableCell>
                  <TableCell>{app.grade12}</TableCell>
                  <TableCell>{app.appliedOn}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        app.status === "Pending"
                          ? "secondary"
                          : app.status === "Confirmed"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleAction(app.id, "Confirmed")}
                      disabled={app.status !== "Pending"}
                    >
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleAction(app.id, "Rejected")}
                      disabled={app.status !== "Pending"}
                    >
                      Reject
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