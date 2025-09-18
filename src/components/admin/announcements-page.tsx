"use client"

import * as React from "react"
import { PlusCircle, MoreHorizontal} from "lucide-react"
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

type Announcement = {
  id: number
  title: string
  description: string
  target: string
  date: string
  status: "Active" | "Expired" | string
}
// Mock initial announcements
const initialAnnouncements = [
  {
    id: 1,
    title: "Mid-sem Exams",
    description: "Mid-semester exams will start from 15th October.",
    target: "Students",
    date: "2025-09-12",
    status: "Active",
  },
  {
    id: 2,
    title: "Staff Meeting",
    description: "Monthly staff meeting scheduled on 20th September.",
    target: "Staff",
    date: "2025-09-10",
    status: "Expired",
  },
]

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = React.useState<Announcement[]>(initialAnnouncements)

  // Dialogs
  const [openDialog, setOpenDialog] = React.useState(false)
 const [viewAnnouncement, setViewAnnouncement] = React.useState<Announcement | null>(null)
const [editAnnouncement, setEditAnnouncement] = React.useState<Announcement | null>(null)

  // New Announcement State
 const [newAnnouncement, setNewAnnouncement] = React.useState<Omit<Announcement, "id" | "status">>({
  title: "",
  description: "",
  target: "All",
  date: "",
})

  // Add new
  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.description) {
      toast.error("Please fill all fields")
      return
    }

    const newEntry = {
      id: Date.now(),
      ...newAnnouncement,
      status: "Active",
    }

    setAnnouncements([newEntry, ...announcements])
    setNewAnnouncement({ title: "", description: "", target: "All", date: "" })
    setOpenDialog(false)
    toast.success("Announcement added successfully", { position: "top-center" })
  }

  // Delete
  const handleDelete = (id: number) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id))
    toast("Announcement deleted", {
      description: "The selected announcement has been removed.",
      position: "top-center",
    })
  }

  // Status Update
  const handleStatusChange = (id: number, status: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    )
    toast.success(`Status updated to ${status}`, { position: "top-center" })
  }

  // Edit Save
  const handleEditSave = () => {
    if (!editAnnouncement) return
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === editAnnouncement.id ? editAnnouncement : a))
    )
    setEditAnnouncement(null)
    toast.success("Announcement updated successfully", { position: "top-center" })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <Button onClick={() => setOpenDialog(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {/* Announcements Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Announcements</CardTitle>
          <CardDescription>Manage and view announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map((a) => (
                <TableRow key={a.id}>
                  <TableCell
                    className="font-medium cursor-pointer hover:underline"
                    onClick={() => setViewAnnouncement(a)}
                  >
                    {a.title}
                  </TableCell>
                  <TableCell>{a.target}</TableCell>
                  <TableCell>{a.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        a.status === "Active"
                          ? "default"
                          : a.status === "Expired"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {a.status}
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
                              a.id,
                              a.status === "Active" ? "Expired" : "Active"
                            )
                          }
                        >
                          {a.status === "Active"
                            ? "Mark as Expired"
                            : "Mark as Active"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditAnnouncement(a)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(a.id)}>
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

      {/* Add Announcement Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Announcement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              placeholder="Title"
              value={newAnnouncement.title}
              onChange={(e) =>
                setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
              }
            />
            <Textarea
              placeholder="Description"
              value={newAnnouncement.description}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  description: e.target.value,
                })
              }
            />
            <Select
              value={newAnnouncement.target}
              onValueChange={(val) =>
                setNewAnnouncement({ ...newAnnouncement, target: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Target Audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Students">Students</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
                <SelectItem value="CSE">CSE Department</SelectItem>
                <SelectItem value="ECE">ECE Department</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={newAnnouncement.date}
              onChange={(e) =>
                setNewAnnouncement({ ...newAnnouncement, date: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAnnouncement}>Add Announcement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Announcement Dialog */}
      <Dialog open={!!viewAnnouncement} onOpenChange={() => setViewAnnouncement(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewAnnouncement?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Target:</strong> {viewAnnouncement?.target}
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Date:</strong> {viewAnnouncement?.date}
            </p>
            <p className="mt-2">{viewAnnouncement?.description}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewAnnouncement(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Announcement Dialog */}
      <Dialog open={!!editAnnouncement} onOpenChange={() => setEditAnnouncement(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
          </DialogHeader>
          {editAnnouncement && (
            <div className="space-y-4 py-2">
              <Input
                placeholder="Title"
                value={editAnnouncement.title}
                onChange={(e) =>
                  setEditAnnouncement({ ...editAnnouncement, title: e.target.value })
                }
              />
              <Textarea
                placeholder="Description"
                value={editAnnouncement.description}
                onChange={(e) =>
                  setEditAnnouncement({
                    ...editAnnouncement,
                    description: e.target.value,
                  })
                }
              />
              <Input
                type="date"
                value={editAnnouncement.date}
                onChange={(e) =>
                  setEditAnnouncement({ ...editAnnouncement, date: e.target.value })
                }
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditAnnouncement(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}