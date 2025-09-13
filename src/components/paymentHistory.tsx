"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Download } from "lucide-react"

export default function PaymentHistoryPage() {
  const paymentHistory = [
    {
      id: 1,
      paymentId: "TXN12345",
      date: "2024-05-12",
      mode: "UPI",
      amount: "₹ 1,000.00",
      status: "Success",
    },
    {
      id: 2,
      paymentId: "TXN12346",
      date: "2024-08-01",
      mode: "Credit Card",
      amount: "₹ 500.00",
      status: "Pending",
    },
    {
      id: 3,
      paymentId: "TXN12347",
      date: "2024-09-05",
      mode: "Net Banking",
      amount: "₹ 2,000.00",
      status: "Success",
    },
  ]

  const handleDownloadReceipt = (id: string) => {
    // TODO: Replace with API call / file download logic
    alert(`Downloading receipt for Payment ID: ${id}`)
  }

  return (
    <div className="w-full p-6 border rounded-lg shadow-sm space-y-8">
      {/* Student Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <Label className="text-muted-foreground">Program</Label>
          <p className="font-semibold border-b border-gray-300 py-1">Economics Major: Term 2</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Academic Year</Label>
          <p className="font-semibold border-b border-gray-300 py-1">2019-20</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Student Category</Label>
          <p className="font-semibold border-b border-gray-300 py-1">General Category</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Enrollment No.</Label>
          <p className="font-semibold border-b border-gray-300 py-1">2341014152</p>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border text-sm">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              <th className="p-3 border text-left">#</th>
              <th className="p-3 border text-left">Payment ID</th>
              <th className="p-3 border text-left">Date</th>
              <th className="p-3 border text-left">Mode</th>
              <th className="p-3 border text-right">Amount</th>
              <th className="p-3 border text-left">Status</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment) => (
              <tr
                key={payment.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="p-3 border">{payment.id}</td>
                <td className="p-3 border font-mono">{payment.paymentId}</td>
                <td className="p-3 border">{payment.date}</td>
                <td className="p-3 border">{payment.mode}</td>
                <td className="p-3 border font-bold text-right">
                  {payment.amount}
                </td>
                <td
                  className={`p-3 border font-medium ${
                    payment.status === "Success"
                      ? "text-green-600 dark:text-green-400"
                      : "text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {payment.status}
                </td>
                <td className="p-3 border text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadReceipt(payment.paymentId)}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Receipt
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
