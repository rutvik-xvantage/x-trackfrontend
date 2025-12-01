import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { CalendarDays, Plus } from "lucide-react";

const leaveRequests = [
  { id: 1, type: 'Vacation', from: '2023-12-24', to: '2023-12-31', days: 6, status: 'Pending', reason: 'Year end holiday' },
  { id: 2, type: 'Sick Leave', from: '2023-10-15', to: '2023-10-16', days: 2, status: 'Approved', reason: 'Fever' },
  { id: 3, type: 'Personal', from: '2023-09-20', to: '2023-09-20', days: 1, status: 'Approved', reason: 'Car service' },
];

export default function MyLeaves() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Leaves</h2>
          <p className="text-muted-foreground mt-1">Manage your leave requests and view balance.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Request Leave
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Request Leave</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="type">Leave Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                    <SelectItem value="urgent">Urgent Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From Date</Label>
                  <Input id="from" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To Date</Label>
                  <Input id="to" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea id="reason" placeholder="Why are you taking leave?" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddOpen(false)}>Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-blue-50 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-700 text-sm font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">12 Days</div>
            <p className="text-xs text-blue-600 mt-1">Remaining for 2023</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-700 text-sm font-medium">Used Leaves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">8 Days</div>
            <p className="text-xs text-green-600 mt-1">Approved leaves this year</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-yellow-700 text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900">6 Days</div>
            <p className="text-xs text-yellow-600 mt-1">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
          <CardDescription>A list of your recent leave requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mt-1 sm:mt-0">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{request.type}</h4>
                      <Badge 
                        variant="outline" 
                        className={
                          request.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
                          'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(request.from).toLocaleDateString()} - {new Date(request.to).toLocaleDateString()} • {request.days} days
                    </p>
                    <p className="text-sm mt-1">{request.reason}</p>
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-center">
                  {request.status === 'Pending' && (
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                      Cancel Request
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
