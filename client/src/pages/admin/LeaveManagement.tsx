import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, FileText } from "lucide-react";

const leaveRequests = [
  { id: 1, name: 'Sarah Johnson', type: 'Sick Leave', from: '2023-10-26', to: '2023-10-27', days: 2, reason: 'Flu fever', status: 'Pending' },
  { id: 2, name: 'Michael Chen', type: 'Vacation', from: '2023-11-01', to: '2023-11-05', days: 5, reason: 'Family trip', status: 'Pending' },
  { id: 3, name: 'James Wilson', type: 'Personal', from: '2023-10-30', to: '2023-10-30', days: 1, reason: 'Personal errands', status: 'Approved' },
  { id: 4, name: 'Emma Davis', type: 'Sick Leave', from: '2023-10-20', to: '2023-10-21', days: 2, reason: 'Migraine', status: 'Rejected' },
];

export default function LeaveManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Leave Management</h2>
        <p className="text-muted-foreground mt-1">Review and manage employee leave requests.</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-4">
          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.filter(r => r.status === 'Pending').map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{request.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{request.from} - {request.to}</div>
                      <div className="text-xs text-muted-foreground">{request.days} days</div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate" title={request.reason}>
                      {request.reason}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                          <X className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50">
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {leaveRequests.filter(r => r.status === 'Pending').length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No pending requests.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.filter(r => r.status !== 'Pending').map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>{request.from} - {request.to}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={request.status === 'Approved' ? 'default' : 'destructive'}
                        className={request.status === 'Approved' ? 'bg-green-500' : ''}
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
