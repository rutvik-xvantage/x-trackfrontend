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
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download, Filter, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const attendanceData = [
  { id: 1, name: 'Sarah Johnson', date: '2023-10-26', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'On Time', total: '8h 30m' },
  { id: 2, name: 'Michael Chen', date: '2023-10-26', checkIn: '09:15 AM', checkOut: '06:00 PM', status: 'Late', total: '8h 45m' },
  { id: 3, name: 'James Wilson', date: '2023-10-26', checkIn: '08:45 AM', checkOut: '05:00 PM', status: 'On Time', total: '8h 15m' },
  { id: 4, name: 'Emma Davis', date: '2023-10-26', checkIn: '-', checkOut: '-', status: 'Absent', total: '-' },
  { id: 5, name: 'Lisa Anderson', date: '2023-10-26', checkIn: '09:00 AM', checkOut: '01:00 PM', status: 'Half Day', total: '4h 00m' },
];

export default function AttendanceList() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Attendance</h2>
          <p className="text-muted-foreground mt-1">Track employee check-ins and work hours.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export Report
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-lg border">
        <div className="flex-1">
           <Input placeholder="Search employee..." className="max-w-sm" />
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Total Hours</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.name}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.checkIn}</TableCell>
                <TableCell>{record.checkOut}</TableCell>
                <TableCell>{record.total}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      record.status === 'On Time' && "bg-green-50 text-green-700 border-green-200",
                      record.status === 'Late' && "bg-yellow-50 text-yellow-700 border-yellow-200",
                      record.status === 'Absent' && "bg-red-50 text-red-700 border-red-200",
                      record.status === 'Half Day' && "bg-blue-50 text-blue-700 border-blue-200",
                    )}
                  >
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
