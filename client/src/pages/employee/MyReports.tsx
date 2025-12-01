import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Plus, FileText, Clock, CheckCircle2 } from "lucide-react";

const myReports = [
  { id: 1, date: '2023-10-26', summary: 'Completed dashboard UI components', hours: 8, status: 'Submitted' },
  { id: 2, date: '2023-10-25', summary: 'Fixed authentication bugs', hours: 8.5, status: 'Approved' },
  { id: 3, date: '2023-10-24', summary: 'Team meeting and planning', hours: 7, status: 'Approved' },
];

export default function MyReports() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Daily Reports</h2>
          <p className="text-muted-foreground mt-1">Submit and track your daily work reports.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Submit Daily Report</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">Hours Worked</Label>
                  <Input id="hours" type="number" step="0.5" placeholder="8.0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Work Summary</Label>
                <Textarea 
                  id="summary" 
                  placeholder="List your tasks and achievements for today..." 
                  className="h-32"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blockers">Blockers (Optional)</Label>
                <Input id="blockers" placeholder="Any issues impeding your progress?" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Save Draft</Button>
              <Button onClick={() => setIsAddOpen(false)}>Submit Report</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {myReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-base font-medium">
                  {new Date(report.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <Clock className="h-3 w-3" />
                  {report.hours} hours
                </div>
              </div>
              <Badge 
                variant="outline"
                className={
                  report.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
                  'bg-blue-50 text-blue-700 border-blue-200'
                }
              >
                {report.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {report.summary}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-end">
                <Button variant="ghost" size="sm" className="text-xs h-8">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
