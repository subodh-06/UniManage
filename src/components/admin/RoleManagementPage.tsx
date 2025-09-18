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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"

// ✅ Define type for role
type Role = {
  id: number
  name: string
  description: string
  status: "Active" | "Inactive"
}

// Mock role data
const initialRoles: Role[] = [
  { id: 1, name: "Admin", description: "Full system access", status: "Active" },
  { id: 2, name: "Staff", description: "Faculty & staff access", status: "Active" },
  { id: 3, name: "Student", description: "Student portal access", status: "Active" },
  { id: 4, name: "Parent", description: "Parents access", status: "Active" },
  { id: 5, name: "Accountant", description: "Manage finances", status: "Inactive" },
  { id: 6, name: "Librarian", description: "Library management", status: "Active" },
]

export default function RoleManagementPage() {
  const [roles, setRoles] = React.useState<Role[]>(initialRoles)
  const [search, setSearch] = React.useState("")
  const [openAdd, setOpenAdd] = React.useState(false)
  const [editRole, setEditRole] = React.useState<Role | null>(null) // ✅ fixed

  const [newRole, setNewRole] = React.useState<Omit<Role, "id">>({
    name: "",
    description: "",
    status: "Active",
  })

  // Add role
  const handleAddRole = () => {
    if (!newRole.name.trim()) {
      toast.error("Role name is required", { position: "top-center" })
      return
    }
    const newEntry: Role = { id: Date.now(), ...newRole }
    setRoles([newEntry, ...roles])
    setNewRole({ name: "", description: "", status: "Active" })
    setOpenAdd(false)
    toast.success("Role added successfully", { position: "top-center" })
  }

  // Edit save
  const handleEditSave = () => {
    if (!editRole) return
    setRoles((prev) =>
      prev.map((r) => (r.id === editRole.id ? editRole : r))
    )
    setEditRole(null)
    toast.success("Role updated successfully", { position: "top-center" })
  }

  // Delete role
  const handleDelete = (id: number) => {
    setRoles((prev) => prev.filter((r) => r.id !== id))
    toast("Role deleted", {
      description: "The selected role has been removed.",
      position: "top-center",
    })
  }

  // Search filter
  const filteredRoles = roles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">Role Management</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search roles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[250px]"
          />
          <Button onClick={() => setOpenAdd(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Role
          </Button>
        </div>
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Roles</CardTitle>
          <CardDescription>Manage system roles and access</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant={role.status === "Active" ? "default" : "destructive"}
                    >
                      {role.status}
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
                        <DropdownMenuItem onClick={() => setEditRole(role)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(role.id)}>
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

      {/* Add Role Dialog */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              placeholder="Role Name"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={newRole.description}
              onChange={(e) =>
                setNewRole({ ...newRole, description: e.target.value })
              }
            />
            <Select
              value={newRole.status}
              onValueChange={(val: "Active" | "Inactive") =>
                setNewRole({ ...newRole, status: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpenAdd(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRole}>Add Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={!!editRole} onOpenChange={() => setEditRole(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
          </DialogHeader>
          {editRole && (
            <div className="space-y-4 py-2">
              <Input
                placeholder="Role Name"
                value={editRole.name}
                onChange={(e) => setEditRole({ ...editRole, name: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={editRole.description}
                onChange={(e) =>
                  setEditRole({ ...editRole, description: e.target.value })
                }
              />
              <Select
                value={editRole.status}
                onValueChange={(val: "Active" | "Inactive") =>
                  setEditRole({ ...editRole, status: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setEditRole(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
