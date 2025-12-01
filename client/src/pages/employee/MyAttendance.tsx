import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Clock, CalendarCheck, XCircle } from "lucide-react";

const attendanceHistory = [
  { date: '2023-10-26', checkIn: '09:00 AM', checkOut: '05:30 PM', hours: '8h 30m', status: 'On Time' },
  { date: '2023-10-25', checkIn: '09:05 AM', checkOut: '05:45 PM', hours: '8h 40m', status: 'On Time' },
  { date: '2023-10-24', checkIn: '09:15 AM', checkOut: '06:00 PM', hours: '8h 45m', status: 'Late' },
  { date: '2023-10-23', checkIn: '08:50 AM', checkOut: '05:00 PM', hours: '8h 10m', status: 'On Time' },
];

export default function MyAttendance() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Attendance</h2>
        <p className="text-muted-foreground mt-1">View your attendance history and work hours.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Present Days</span>
                </div>
                <span className="font-bold">18</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Late Arrivals</span>
                </div>
                <span className="font-bold">2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Absences</span>
                </div>
                <span className="font-bold">0</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Attendance Log</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Total Hours</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceHistory.map((record, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{record.date}</TableCell>
                      <TableCell>{record.checkIn}</TableCell>
                      <TableCell>{record.checkOut}</TableCell>
                      <TableCell>{record.hours}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            record.status === 'On Time' ? 'bg-green-50 text-green-700 border-green-200' :
                            'bg-yellow-50 text-yellow-700 border-yellow-200'
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
