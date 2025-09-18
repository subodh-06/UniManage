"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

// Permission data
const modules = [
  "Dashboard",
  "Students",
  "Staff",
  "Finance",
  "Library",
  "Hostel",
  "Exams",
  "Results",
  "Reports",
] as const

const actions = ["View", "Create", "Edit", "Delete", "Approve"] as const
const roles = ["Admin", "Staff", "Student", "Parent", "Accountant", "Librarian"] as const

type Module = (typeof modules)[number]
type Action = (typeof actions)[number]

type Permissions = Record<Module, Record<Action, boolean>>

export default function PermissionsPage() {
  const [selectedRole, setSelectedRole] = React.useState<typeof roles[number]>("Admin")

  const [permissions, setPermissions] = React.useState<Permissions>(() => {
    const initial = {} as Permissions
    modules.forEach((mod) => {
      initial[mod] = {} as Record<Action, boolean>
      actions.forEach((act) => {
        initial[mod][act] = selectedRole === "Admin"
      })
    })
    return initial
  })

  const togglePermission = (module: Module, action: Action) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action],
      },
    }))
  }

  const handleSave = () => {
    toast.success(`Permissions updated for ${selectedRole}`, { position: "top-center" })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">Permissions Management</h1>
        <Select
          value={selectedRole}
          onValueChange={(val) => setSelectedRole(val as typeof roles[number])}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Permissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Permissions for {selectedRole}</CardTitle>
          <CardDescription>
            Grant or revoke permissions by module and action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  {actions.map((act) => (
                    <TableHead key={act} className="text-center">
                      {act}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {modules.map((mod) => (
                  <TableRow key={mod}>
                    <TableCell className="font-medium">{mod}</TableCell>
                    {actions.map((act) => (
                      <TableCell key={act} className="text-center">
                        <Checkbox
                          checked={permissions[mod][act]}
                          onCheckedChange={(checked) => {
                            if (typeof checked === "boolean") togglePermission(mod, act)
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
