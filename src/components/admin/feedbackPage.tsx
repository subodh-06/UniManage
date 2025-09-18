"use client"

import * as React from "react"
import { MoreHorizontal, TrendingUp } from "lucide-react"
import { toast } from "sonner"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type Feedback = {
  id: number
  user: string
  role: "Student" | "Staff" | "Parent"
  subject: string
  message: string
  rating: number
  date: string
  status: "Pending" | "Resolved"
}


// Mock feedback data
const initialFeedback: Feedback[] = [
  {
    id: 1,
    user: "John Doe",
    role: "Student",
    subject: "Library Facilities",
    message: "Library needs more latest books on AI/ML.",
    rating: 4,
    date: "2025-09-10",
    status: "Pending",
  },
  {
    id: 2,
    user: "Priya Sharma",
    role: "Parent",
    subject: "Fee Transparency",
    message: "Please provide detailed fee structure online.",
    rating: 3,
    date: "2025-09-11",
    status: "Pending",
  },
  {
    id: 3,
    user: "Dr. Suresh",
    role: "Staff",
    subject: "Classroom Equipment",
    message: "Projectors in classrooms need urgent maintenance.",
    rating: 5,
    date: "2025-09-09",
    status: "Pending",
  },
  {
    id: 4,
    user: "Seema Verma",
    role: "Student",
    subject: "Classroom Equipment",
    message: "A/C needs servicing.",
    rating: 3,
    date: "2025-09-09",
    status: "Pending",
  },
  {
    id: 5,
    user: "Anil Kapoor",
    role: "Parent",
    subject: "Transport Services",
    message: "Bus timings are not convenient.",
    rating: 2,
    date: "2025-09-09",
    status: "Pending",
  },
  {
    id: 6,
    user: "Rhaul Jain",
    role: "Student",
    subject: "Transport Services",
    message: "Bus timings are not convenient.",
    rating: 2,
    date: "2025-09-09",
    status: "Pending",
  },
]

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = React.useState<Feedback[]>(initialFeedback)
  const [search, setSearch] = React.useState("")
  const [filterRole, setFilterRole] = React.useState("All")
  const [viewFeedback, setViewFeedback] = React.useState<Feedback | null>(null)
  const [replyMessage, setReplyMessage] = React.useState("")

  // Filter + Search
  const filteredFeedback = feedbacks.filter((f) => {
    const roleMatch = filterRole === "All" || f.role === filterRole
    const searchMatch =
      search === "" ||
      f.subject.toLowerCase().includes(search.toLowerCase()) ||
      f.user.toLowerCase().includes(search.toLowerCase())
    return roleMatch && searchMatch
  })

  // Count feedback by role
  const chartData = ["Student", "Staff", "Parent"].map((role) => ({
    role,
    count: feedbacks.filter((f) => f.role === role).length,
  }))

  const chartConfig = {
    count: {
      label: "Feedback Count",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig

  // Status change
  const handleStatusChange = (id: number, status: Feedback["status"]) => {
  setFeedbacks((prev) =>
    prev.map((f) => (f.id === id ? { ...f, status } : f))
  )
  toast.success(`Feedback marked as ${status}`, { position: "top-center" })
}


  // Delete
  const handleDelete = (id: number) => {
    setFeedbacks((prev) => prev.filter((f) => f.id !== id))
    toast("Feedback deleted", {
      description: "The selected feedback has been removed.",
      position: "top-center",
    })
  }

  // Reply
  const handleReply = () => {
    if (!replyMessage.trim()) {
      toast.error("Reply cannot be empty", { position: "top-center" })
      return
    }
    toast.success("Reply sent successfully!", { position: "top-center" })
    setReplyMessage("")
    setViewFeedback(null)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Feedback Summary Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback Overview</CardTitle>
          <CardDescription>Feedback count by role</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
            <div className="h-[250px] w-full max-w-xl">
                <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="role" tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={6} />
                </BarChart>
                </ChartContainer>
            </div>
        </CardContent>

        <div className="flex gap-2 text-sm text-muted-foreground px-6 pb-4">
          Feedback activity is stable <TrendingUp className="h-4 w-4" />
        </div>
      </Card>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">Feedback Management</h1>
        <div className="flex gap-4 flex-wrap">
          <Input
            placeholder="Search by user or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[250px]"
          />
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
              <SelectItem value="Parent">Parent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Feedback Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Feedback</CardTitle>
          <CardDescription>Manage feedback from users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeedback.map((f) => (
                <TableRow key={f.id}>
                  <TableCell
                    className="cursor-pointer hover:underline"
                    onClick={() => setViewFeedback(f)}
                  >
                    {f.user}
                  </TableCell>
                  <TableCell>{f.role}</TableCell>
                  <TableCell>{f.subject}</TableCell>
                  <TableCell>{"⭐".repeat(f.rating)}</TableCell>
                  <TableCell>{f.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        f.status === "Resolved" ? "default" : "destructive"
                      }
                    >
                      {f.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(
                              f.id,
                              f.status === "Pending" ? "Resolved" : "Pending"
                            )
                          }
                        >
                          {f.status === "Pending"
                            ? "Mark as Resolved"
                            : "Mark as Pending"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(f.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Feedback Dialog */}
      <Dialog open={!!viewFeedback} onOpenChange={() => setViewFeedback(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewFeedback?.subject}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p>
              <strong>User:</strong> {viewFeedback?.user} ({viewFeedback?.role})
            </p>
            <p>
              <strong>Date:</strong> {viewFeedback?.date}
            </p>
            <p>
              <strong>Rating:</strong> {"⭐".repeat(viewFeedback?.rating || 0)}
            </p>
            <p className="mt-2">{viewFeedback?.message}</p>
          </div>
          <div className="space-y-2 mt-4">
            <Textarea
              placeholder="Write a reply..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setViewFeedback(null)}>
              Close
            </Button>
            <Button onClick={handleReply}>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}