"use client"

import * as React from "react"
import { toast } from "sonner"
import { Download, Trash2 } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock logs
const initialLogs = [
  {
    id: 1,
    timestamp: "2025-09-12 14:30",
    user: "Admin",
    action: "Updated permissions for Staff",
    module: "Permissions",
    status: "Success",
    severity: "Info",
  },
  {
    id: 2,
    timestamp: "2025-09-12 13:15",
    user: "System",
    action: "Failed login attempt",
    module: "Auth",
    status: "Failed",
    severity: "Warning",
  },
  {
    id: 3,
    timestamp: "2025-09-12 12:10",
    user: "Admin",
    action: "Deleted role Accountant",
    module: "Roles",
    status: "Success",
    severity: "Critical",
  },
]

export default function SystemLogsPage() {
  const [logs, setLogs] = React.useState(initialLogs)
  const [search, setSearch] = React.useState("")
  const [filterSeverity, setFilterSeverity] = React.useState("all")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      search === "" ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.module.toLowerCase().includes(search.toLowerCase())
    const matchesSeverity =
      filterSeverity === "all" || log.severity === filterSeverity
    return matchesSearch && matchesSeverity
  })

  const handleClearLogs = () => {
    setLogs([])
    toast("Logs cleared", {
      description: "All system logs have been removed.",
      action: {
        label: "Undo",
        onClick: () => setLogs(initialLogs),
      },
      position: "top-center",
    })
  }

  const handleExport = () => {
    toast.success("Logs exported as CSV", { position: "top-center" })
    // Later: implement real CSV/PDF export
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">System Logs</h1>
        <div className="flex flex-wrap gap-4">
          <Input
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[250px]"
          />
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Info">Info</SelectItem>
              <SelectItem value="Warning">Warning</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="destructive" onClick={handleClearLogs}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Logs
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>System-wide logs of important actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.module}</TableCell>
                    <TableCell>{log.status}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.severity === "Info"
                            ? "default"
                            : log.severity === "Warning"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {log.severity}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No logs available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}