"use client"

import * as React from "react"
import { PlusCircle, MoreHorizontal } from "lucide-react"
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

// ✅ Define Notification type
type Notification = {
  id: number
  title: string
  description: string
  category: "General" | "Academic" | "Fee Due" | "Disciplinary"
  recipient: string
  date: string
  status: "Active" | "Sent" | "Deleted"
}

// Mock notifications
const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Fee Reminder",
    description: "Your ward’s tuition fee for Semester 5 is due on 20th Sept.",
    category: "Fee Due",
    recipient: "All Parents",
    date: "2025-09-10",
    status: "Active",
  },
  {
    id: 2,
    title: "PTM Meeting",
    description: "Parent-Teacher meeting scheduled for 25th Sept.",
    category: "Academic",
    recipient: "CSE Dept",
    date: "2025-09-08",
    status: "Sent",
  },
]

export default function ParentNotificationsPage() {
  const [notifications, setNotifications] = React.useState<Notification[]>(initialNotifications)

  // Dialog states
  const [openDialog, setOpenDialog] = React.useState(false)
  const [viewNotification, setViewNotification] = React.useState<Notification | null>(null)
  const [editNotification, setEditNotification] = React.useState<Notification | null>(null)

  // Form state
  const [newNotification, setNewNotification] = React.useState<Omit<Notification, "id" | "status">>({
    title: "",
    description: "",
    category: "General",
    recipient: "All Parents",
    date: "",
  })

  // Add
  const handleAddNotification = () => {
    if (!newNotification.title || !newNotification.description) {
      toast.error("Please fill all fields", { position: "top-center" })
      return
    }

    const newEntry: Notification = {
      id: Date.now(),
      ...newNotification,
      status: "Active",
    }

    setNotifications([newEntry, ...notifications])
    setNewNotification({
      title: "",
      description: "",
      category: "General",
      recipient: "All Parents",
      date: "",
    })
    setOpenDialog(false)
    toast.success("Notification sent to parents", { position: "top-center" })
  }

  // Delete
  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    toast("Notification deleted", {
      description: "The selected parent notification has been removed.",
      position: "top-center",
    })
  }

  // Status Change
  const handleStatusChange = (id: number, status: Notification["status"]) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status } : n))
    )
    toast.success(`Status updated to ${status}`, { position: "top-center" })
  }

  // Save Edit
  const handleEditSave = () => {
    if (!editNotification) return
    setNotifications((prev) =>
      prev.map((n) => (n.id === editNotification.id ? editNotification : n))
    )
    setEditNotification(null)
    toast.success("Notification updated successfully", { position: "top-center" })
  }

  return (
     <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Parent Notifications</h1>
        <Button onClick={() => setOpenDialog(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Notification
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>Manage parent notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((n) => (
                <TableRow key={n.id}>
                  <TableCell
                    className="cursor-pointer font-medium hover:underline"
                    onClick={() => setViewNotification(n)}
                  >
                    {n.title}
                  </TableCell>
                  <TableCell>{n.category}</TableCell>
                  <TableCell>{n.recipient}</TableCell>
                  <TableCell>{n.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        n.status === "Active"
                          ? "default"
                          : n.status === "Sent"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {n.status}
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
                              n.id,
                              n.status === "Active" ? "Sent" : "Active"
                            )
                          }
                        >
                          {n.status === "Active"
                            ? "Mark as Sent"
                            : "Mark as Active"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditNotification(n)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(n.id)}>
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

      {/* Add Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Notification</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              placeholder="Title"
              value={newNotification.title}
              onChange={(e) =>
                setNewNotification({ ...newNotification, title: e.target.value })
              }
            />
            <Textarea
              placeholder="Description"
              value={newNotification.description}
              onChange={(e) =>
                setNewNotification({
                  ...newNotification,
                  description: e.target.value,
                })
              }
            />
<Select
  value={newNotification.category}
  onValueChange={(val) =>
    setNewNotification({ ...newNotification, category: val as Notification["category"] })
  }
>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Academic">Academic</SelectItem>
                <SelectItem value="Fee Due">Fee Due</SelectItem>
                <SelectItem value="Disciplinary">Disciplinary</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={newNotification.recipient}
              onValueChange={(val) =>
                setNewNotification({ ...newNotification, recipient: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Recipient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Parents">All Parents</SelectItem>
                <SelectItem value="CSE Dept">CSE Dept</SelectItem>
                <SelectItem value="ECE Dept">ECE Dept</SelectItem>
                <SelectItem value="ME Dept">ME Dept</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={newNotification.date}
              onChange={(e) =>
                setNewNotification({ ...newNotification, date: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNotification}>Send Notification</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog
        open={!!viewNotification}
        onOpenChange={() => setViewNotification(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewNotification?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p><strong>Category:</strong> {viewNotification?.category}</p>
            <p><strong>Recipient:</strong> {viewNotification?.recipient}</p>
            <p><strong>Date:</strong> {viewNotification?.date}</p>
            <p className="mt-2">{viewNotification?.description}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewNotification(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editNotification}
        onOpenChange={() => setEditNotification(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Notification</DialogTitle>
          </DialogHeader>
          {editNotification && (
            <div className="space-y-4 py-2">
              <Input
                placeholder="Title"
                value={editNotification.title}
                onChange={(e) =>
                  setEditNotification({ ...editNotification, title: e.target.value })
                }
              />
              <Textarea
                placeholder="Description"
                value={editNotification.description}
                onChange={(e) =>
                  setEditNotification({
                    ...editNotification,
                    description: e.target.value,
                  })
                }
              />
              <Input
                type="date"
                value={editNotification.date}
                onChange={(e) =>
                  setEditNotification({ ...editNotification, date: e.target.value })
                }
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditNotification(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
