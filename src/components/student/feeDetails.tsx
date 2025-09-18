"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function FeesDetailsPage() {
  const [selectedFees, setSelectedFees] = React.useState<number[]>([])

  const feesData = [
    {
      id: 1,
      category: "Tuition Fee",
      description: "Lectures and Teaching Service",
      amount: "₹ 1,00,000.00",
    },
    {
      id: 2,
      category: "Books",
      description: "Educational Study Material",
      amount: "₹ 100.00",
    },
    {
      id: 3,
      category: "Bus Fee",
      description: "Transportation from home to school",
      amount: "₹ 10,000.00",
    },
    {
      id: 4,
      category: "Hostel Fee",
      description: "Accommodation and Meals",
      amount: "₹ 90,000.00",
    },
  ]

  const toggleFee = (id: number) => {
    setSelectedFees((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  return (
    <div className="w-full p-6 border rounded-lg shadow-sm space-y-8">
      {/* Student/Program Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <Label className="text-muted-foreground">Program</Label>
          <p className="font-semibold border-b border-gray-300 py-1">Economics Major: Term 2</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Academic Term</Label>
          <p className="font-semibold border-b border-gray-300 py-1">2019-20 (Semester 2)</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Student Category</Label>
          <p className="font-semibold border-b border-gray-300 py-1">General Category</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Academic Year</Label>
          <p className="font-semibold border-b border-gray-300 py-1">2019-20</p>
        </div>
      </div>

      {/* Fee Components Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border text-sm">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              <th className="p-3 border text-left">
                <Checkbox
                  className="border border-gray-400 dark:border-gray-600"
                  checked={
                    selectedFees.length === feesData.length &&
                    feesData.length > 0
                  }
                  onCheckedChange={(checked) =>
                    setSelectedFees(checked ? feesData.map((f) => f.id) : [])
                  }
                />
              </th>
              <th className="p-3 border text-left">#</th>
              <th className="p-3 border text-left">Fees Category</th>
              <th className="p-3 border text-left">Description</th>
              <th className="p-3 border text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {feesData.map((fee) => (
              <tr
                key={fee.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="p-3 border">
                  <Checkbox
                    className="border border-gray-400 dark:border-gray-600"
                    checked={selectedFees.includes(fee.id)}
                    onCheckedChange={() => toggleFee(fee.id)}
                  />
                </td>
                <td className="p-3 border">{fee.id}</td>
                <td className="p-3 border font-semibold">{fee.category}</td>
                <td className="p-3 border">{fee.description}</td>
                <td className="p-3 border font-bold text-right">{fee.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={selectedFees.length === 0}
        >
          Pay Selected
        </Button>
      </div>
    </div>
  )
}
