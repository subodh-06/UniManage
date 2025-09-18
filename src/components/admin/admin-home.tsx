"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, Building2, Bed, Wallet, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Students */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Students</CardTitle>
          <GraduationCap className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,430</div>
          <p className="text-sm text-muted-foreground">Enrolled across all years</p>
          <Button variant="outline" size="sm" className="mt-3 w-full">
            View Students
          </Button>
        </CardContent>
      </Card>

      {/* Staffs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Staffs</CardTitle>
          <Users className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">320</div>
          <p className="text-sm text-muted-foreground">Teaching & non-teaching</p>
          <Button variant="outline" size="sm" className="mt-3 w-full">
            View Staffs
          </Button>
        </CardContent>
      </Card>

      {/* Hostels */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Hostels</CardTitle>
          <Building2 className="h-5 w-5 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5</div>
          <p className="text-sm text-muted-foreground">Boys & Girls hostels</p>
          <Button variant="outline" size="sm" className="mt-3 w-full">
            Manage Hostels
          </Button>
        </CardContent>
      </Card>

      {/* Rooms Occupied */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Rooms Occupied</CardTitle>
          <Bed className="h-5 w-5 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">420 / 500</div>
          <p className="text-sm text-muted-foreground">84% occupancy</p>
          <Badge variant="secondary">16% Vacant</Badge>
        </CardContent>
      </Card>

      {/* Fees Collected */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Fees Collected</CardTitle>
          <Wallet className="h-5 w-5 text-teal-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹8.5 Cr</div>
          <p className="text-sm text-muted-foreground">This academic year</p>
          <Button variant="outline" size="sm" className="mt-3 w-full">
            View Payments
          </Button>
        </CardContent>
      </Card>

      {/* Pending Fees */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Pending Fees</CardTitle>
          <AlertCircle className="h-5 w-5 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹1.2 Cr</div>
          <p className="text-sm text-muted-foreground">Needs urgent follow-up</p>
          <Button variant="destructive" size="sm" className="mt-3 w-full">
            Send Reminders
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}