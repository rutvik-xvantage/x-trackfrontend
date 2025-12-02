import { useEffect, useState } from 'react';
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
import { Plus, Clock } from "lucide-react";

import {
  getMyReportsApi,
  createReportApi
} from "@/api/dailyReports.api";
import { getMyAttendanceApi } from "@/api/attendance.api";

import { toast } from "@/hooks/use-toast";

export default function MyReports() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [reports, setReports] = useState([]);

  const [summary, setSummary] = useState("");
  const [blockers, setBlockers] = useState("");

  const todayDate = new Date().toISOString().split("T")[0];
  const [todayHours, setTodayHours] = useState<number | null>(null);

  // Convert decimal hours → "Hh MMm"
  const formatHoursUI = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

  // -------------------------------------
  // LOAD TODAY ATTENDANCE
  // -------------------------------------
  const loadTodayAttendance = async () => {
    try {
      const res = await getMyAttendanceApi();
      const records = res.data.data;

      const todayRecord = records.find((r: any) =>
        r.date.startsWith(todayDate)
      );

      if (!todayRecord || !todayRecord.checkIn || !todayRecord.checkOut) {
        setTodayHours(null);
        return;
      }

      // totalHours comes as decimal from DB (e.g. 0.50 = 30 min)
      const decimalHours = Number(todayRecord.totalHours);

      setTodayHours(decimalHours);
    } catch (err) {
      console.error("Failed loading attendance", err);
    }
  };

  // -------------------------------------
  // LOAD REPORTS
  // -------------------------------------
  const loadReports = async () => {
    try {
      const res = await getMyReportsApi();
      setReports(res.data.data);
    } catch (err) {
      toast({ title: "Failed to load reports", variant: "destructive" });
    }
  };

  // -------------------------------------
  // SUBMIT REPORT
  // -------------------------------------
  const submitReport = async () => {
    if (todayHours === null) {
      toast({
        title: "Please check-out before submitting a report",
        variant: "destructive"
      });
      return;
    }

    if (!summary) {
      toast({
        title: "Summary is required",
        variant: "destructive"
      });
      return;
    }

    try {
      await createReportApi({
        date: todayDate,
hoursWorked: Math.round(todayHours * 60),  // convert hours → minutes
        tasks: summary,
        blockers: blockers || null
      });

      toast({ title: "Report submitted successfully" });
      setIsAddOpen(false);

      loadReports(); // refresh list

      // reset form
      setSummary("");
      setBlockers("");

    } catch (err) {
      console.error(err);
      toast({ title: "Failed to submit report", variant: "destructive" });
    }
  };

  useEffect(() => {
    loadReports();
    loadTodayAttendance();
  }, []);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Daily Reports</h2>
          <p className="text-muted-foreground mt-1">
            Submit and track your daily work reports.
          </p>
        </div>

        {/* NEW REPORT DIALOG */}
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

              {/* AUTO HOURS */}
              <div className="space-y-2">
                <Label>Today's Work Hours</Label>
                <Input
                  disabled
                  className="bg-muted"
                  value={
                    todayHours !== null
                      ? formatHoursUI(todayHours)
                      : "Check-out required"
                  }
                />
              </div>

              {/* SUMMARY */}
              <div className="space-y-2">
                <Label>Work Summary</Label>
                <Textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="h-32"
                />
              </div>

              {/* BLOCKERS */}
              <div className="space-y-2">
                <Label>Blockers (Optional)</Label>
                <Input
                  value={blockers}
                  onChange={e => setBlockers(e.target.value)}
                  placeholder="Any issues?"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitReport}>Submit Report</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* REPORT CARDS */}
      <div className="grid gap-6 md:grid-cols-3">
        {reports.map((report: any) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex justify-between pb-2">
              <div>
                <CardTitle className="text-base font-medium">
                  {new Date(report.date).toLocaleDateString()}
                </CardTitle>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatHoursUI(report.hoursWorked)}
                </div>
              </div>

              <Badge
                variant="outline"
                className={
                  report.status === "approved"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : report.status === "rejected"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }
              >
                {report.status}
              </Badge>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {report.tasks}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
