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
import { Input } from "@/components/ui/input";
import { Eye, Download, Search } from "lucide-react";

const reports = [
  { id: 1, name: 'Sarah Johnson', date: '2023-10-26', tasks: 'Frontend implementation of Dashboard', hours: 8, status: 'Submitted' },
  { id: 2, name: 'Michael Chen', date: '2023-10-26', tasks: 'API integration for Auth', hours: 7.5, status: 'Approved' },
  { id: 3, name: 'James Wilson', date: '2023-10-26', tasks: 'Client meeting and requirements gathering', hours: 6, status: 'Rejected' },
  { id: 4, name: 'Emma Davis', date: '2023-10-26', tasks: 'HR policy updates', hours: 8, status: 'Submitted' },
];

export default function ReportsManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Daily Reports</h2>
          <p className="text-muted-foreground mt-1">Review daily work reports from employees.</p>
        </div>
        <Button variant="outline">Export All</Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border">
         <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by employee..." className="pl-9" />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[400px]">Tasks</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell className="truncate max-w-[400px]">{report.tasks}</TableCell>
                <TableCell>{report.hours}h</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={
                      report.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
                      report.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }
                  >
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" /> View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
