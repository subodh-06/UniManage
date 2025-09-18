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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

// ✅ Types
type Room = {
  id: number
  hostel: string
  roomNo: string
  type: "Single" | "Double"
  capacity: number
  allocated: number
  students: string[]
}

type Student = {
  id: string
  name: string
  branch: string
}

// Mock rooms data
const roomsData: Room[] = [
  {
    id: 1,
    hostel: "Hostel A",
    roomNo: "A-101",
    type: "Single",
    capacity: 1,
    allocated: 1,
    students: ["Amit Sharma (CSE2101)"],
  },
  {
    id: 2,
    hostel: "Hostel A",
    roomNo: "A-102",
    type: "Double",
    capacity: 2,
    allocated: 1,
    students: ["Riya Verma (ECE2105)"],
  },
  {
    id: 3,
    hostel: "Hostel B",
    roomNo: "B-201",
    type: "Double",
    capacity: 2,
    allocated: 0,
    students: [],
  },
]

// Mock students waiting for allocation
const pendingStudents: Student[] = [
  { id: "ME2109", name: "Rahul Das", branch: "ME" },
  { id: "CSE2110", name: "Sneha Patnaik", branch: "CSE" },
  { id: "ECE2107", name: "Ankur Mehta", branch: "ECE" },
]

export default function RoomAllocationPage() {
  const [rooms, setRooms] = React.useState<Room[]>(roomsData)
  const [filterHostel, setFilterHostel] = React.useState<string>("all")
  const [filterType, setFilterType] = React.useState<string>("all")
  const [search, setSearch] = React.useState<string>("")

  // Dialog states
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null) // ✅ fixed
  const [selectedStudent, setSelectedStudent] = React.useState<string>("")

  const handleOpenAllocation = (room: Room) => { // ✅ fixed
    setSelectedRoom(room)
    setSelectedStudent("")
  }

  const handleAllocation = () => {
    if (!selectedRoom || !selectedStudent) return

    setRooms((prev) =>
      prev.map((r) =>
        r.id === selectedRoom.id
          ? {
              ...r,
              allocated: r.allocated + 1,
              students: [...r.students, selectedStudent],
            }
          : r
      )
    )

    toast.success("Room allocated successfully", {
      description: `${selectedStudent} assigned to ${selectedRoom.roomNo}`,
      position: "top-center",
    })

    setSelectedRoom(null)
    setSelectedStudent("")
  }

  // Filtering logic
  const filteredRooms = rooms.filter((r) => {
    const hostelMatch = filterHostel === "all" || r.hostel === filterHostel
    const typeMatch = filterType === "all" || r.type === filterType
    const searchMatch =
      search === "" || r.roomNo.toLowerCase().includes(search.toLowerCase())
    return hostelMatch && typeMatch && searchMatch
  })

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Room Allocation</CardTitle>
            <div className="flex gap-4 flex-wrap items-center">
              {/* Hostel Filter */}
              <Select onValueChange={setFilterHostel} defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Hostel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hostels</SelectItem>
                  <SelectItem value="Hostel A">Hostel A</SelectItem>
                  <SelectItem value="Hostel B">Hostel B</SelectItem>
                  <SelectItem value="Hostel C">Hostel C</SelectItem>
                </SelectContent>
              </Select>

              {/* Room Type Filter */}
              <Select onValueChange={setFilterType} defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Double">Double</SelectItem>
                </SelectContent>
              </Select>

              {/* Search Bar */}
              <Input
                placeholder="Search room no..."
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
                <TableHead>Hostel</TableHead>
                <TableHead>Room No</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Allocated</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => {
                const available = room.capacity - room.allocated
                return (
                  <TableRow key={room.id}>
                    <TableCell>{room.hostel}</TableCell>
                    <TableCell>{room.roomNo}</TableCell>
                    <TableCell>{room.type}</TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell>{room.allocated}</TableCell>
                    <TableCell>
                      {room.students.length > 0 ? room.students.join(", ") : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={available > 0 ? "default" : "destructive"}
                      >
                        {available > 0 ? `${available} Available` : "Full"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {available > 0 && (
                        <Button size="sm" onClick={() => handleOpenAllocation(room)}>
                          Allocate
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

      {/* Allocation Dialog */}
      <Dialog open={!!selectedRoom} onOpenChange={() => setSelectedRoom(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Allocate Room</DialogTitle>
          </DialogHeader>
          {selectedRoom && (
            <div className="space-y-4 py-2">
              <p>
                <strong>{selectedRoom.roomNo}</strong> - {selectedRoom.hostel} <br />
                Capacity: {selectedRoom.capacity}, Allocated: {selectedRoom.allocated} <br />
                Available: {selectedRoom.capacity - selectedRoom.allocated}
              </p>

              <Select onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {pendingStudents.map((s) => (
                    <SelectItem
                      key={s.id}
                      value={`${s.name} (${s.id})`}
                    >
                      {s.name} - {s.branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setSelectedRoom(null)}>
              Cancel
            </Button>
            <Button onClick={handleAllocation}>Confirm Allocation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
