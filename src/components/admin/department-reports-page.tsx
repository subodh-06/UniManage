"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { FileDown } from "lucide-react"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Mock department summary data
const departmentData = [
  { id: 1, name: "Computer Science", code: "CSE", students: 420, avgCgpa: 7.8, dropoutRisk: "Low", staff: 35 },
  { id: 2, name: "Electronics & Comm.", code: "ECE", students: 310, avgCgpa: 7.2, dropoutRisk: "Medium", staff: 28 },
  { id: 3, name: "Mechanical Engg.", code: "ME", students: 290, avgCgpa: 6.9, dropoutRisk: "High", staff: 25 },
  { id: 4, name: "Civil Engg.", code: "CE", students: 180, avgCgpa: 7.1, dropoutRisk: "Medium", staff: 18 },
]

// Mock performance trend data
const performanceTrends = [
  { semester: "1st", CSE: 7.5, ECE: 7.0, ME: 6.8, CE: 7.1 },
  { semester: "2nd", CSE: 7.7, ECE: 7.1, ME: 6.7, CE: 7.0 },
  { semester: "3rd", CSE: 7.8, ECE: 7.2, ME: 6.9, CE: 7.1 },
  { semester: "4th", CSE: 8.0, ECE: 7.3, ME: 7.0, CE: 7.2 },
]

// Mock dropout trends
const dropoutTrends = [
  { semester: "1st", CSE: 15, ECE: 10, ME: 20, CE: 8 },
  { semester: "2nd", CSE: 12, ECE: 11, ME: 18, CE: 9 },
  { semester: "3rd", CSE: 10, ECE: 9, ME: 22, CE: 7 },
  { semester: "4th", CSE: 8, ECE: 7, ME: 19, CE: 6 },
]

// Chart configs for styling
const studentConfig = {
  students: { label: "Students", color: "var(--chart-1)" },
  avgCgpa: { label: "Avg CGPA", color: "var(--chart-2)" },
} satisfies ChartConfig

const performanceConfig = {
  CSE: { label: "CSE", color: "var(--chart-1)" },
  ECE: { label: "ECE", color: "var(--chart-2)" },
  ME: { label: "ME", color: "var(--chart-3)" },
  CE: { label: "CE", color: "var(--chart-4)" },
} satisfies ChartConfig

export default function DepartmentReportsPage() {
  const [records] = React.useState(departmentData)

  const handleExport = () => {
    toast.success("Department report exported", { position: "top-center" })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Department Summary Table */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Department Reports</CardTitle>
          <Button onClick={handleExport}>
            <FileDown className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dept. Code</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Avg. CGPA</TableHead>
                <TableHead>Dropout Risk</TableHead>
                <TableHead>Staff</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>{d.code}</TableCell>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.students}</TableCell>
                  <TableCell>{d.avgCgpa}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        d.dropoutRisk === "High"
                          ? "destructive"
                          : d.dropoutRisk === "Medium"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {d.dropoutRisk}
                    </Badge>
                  </TableCell>
                  <TableCell>{d.staff}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Department Strength Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Department Strength & Avg CGPA</CardTitle>
          <CardDescription>Comparing students and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={studentConfig}>
            <BarChart accessibilityLayer data={records}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="code" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="students" fill="var(--color-students)" radius={6} />
              <Bar dataKey="avgCgpa" fill="var(--color-avgCgpa)" radius={6} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex gap-2 text-sm text-muted-foreground">
          Trending up by 5.2% this semester <TrendingUp className="h-4 w-4" />
        </CardFooter>
      </Card>

      {/* Performance Trend Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>Avg CGPA per semester</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={performanceConfig}>
            <LineChart accessibilityLayer data={performanceTrends}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="semester" />
              <YAxis domain={[6, 9]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="CSE" stroke="var(--color-CSE)" strokeWidth={2} />
              <Line dataKey="ECE" stroke="var(--color-ECE)" strokeWidth={2} />
              <Line dataKey="ME" stroke="var(--color-ME)" strokeWidth={2} />
              <Line dataKey="CE" stroke="var(--color-CE)" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Dropout Trend Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Dropout Trends</CardTitle>
          <CardDescription>High risk students across semesters</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={performanceConfig}>
            <LineChart accessibilityLayer data={dropoutTrends}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="semester" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="CSE" stroke="var(--color-CSE)" strokeWidth={2} />
              <Line dataKey="ECE" stroke="var(--color-ECE)" strokeWidth={2} />
              <Line dataKey="ME" stroke="var(--color-ME)" strokeWidth={2} />
              <Line dataKey="CE" stroke="var(--color-CE)" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}