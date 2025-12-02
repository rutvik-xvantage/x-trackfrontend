import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Eye, Search } from "lucide-react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDailyReportsApi,
  approveDailyReportApi,
  rejectDailyReportApi,
} from "@/api/dailyReports.api";
import { useToast } from "@/hooks/use-toast";

export default function ReportsManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["daily-reports"],
    queryFn: async () => (await getDailyReportsApi()).data.data,
  });

  const approveMutation = useMutation({
    mutationFn: (id: number) => approveDailyReportApi(id),
    onSuccess: () => {
      toast({ title: "Report approved" });
      queryClient.invalidateQueries(["daily-reports"]);
    },
  });
  const formatMinutesToHM = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

  const rejectMutation = useMutation({
    mutationFn: (id: number) => rejectDailyReportApi(id),
    onSuccess: () => {
      toast({ title: "Report rejected" });
      queryClient.invalidateQueries(["daily-reports"]);
    },
  });

  const reports = data || [];
  const filteredReports = reports.filter((r: any) => {
  const tasks = r.tasks || "";
  return tasks.toLowerCase().includes(search.toLowerCase());
});


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Daily Reports</h2>
          <p className="text-muted-foreground mt-1">
            Review daily work reports from employees.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-lg border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by tasks..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        {isLoading ? (
          <div className="p-5 text-center text-muted-foreground">
            Loading reports...
          </div>
        ) : (
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
              {filteredReports.map((report: any) => {
                const date = new Date(report.date).toLocaleDateString();
                const status = report.status;

                return (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      User #{report.userId}
                    </TableCell>

                    <TableCell>{date}</TableCell>

                    <TableCell className="truncate max-w-[400px]">
                      {report.tasks}
                    </TableCell>

                    <TableCell>{formatMinutesToHM(report.hoursWorked)}</TableCell>


                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          status === "approved"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : status === "rejected"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }
                      >
                        {status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right flex gap-2 justify-end">
                      {/* <Button variant="ghost" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" /> View
                      </Button> */}

                      {status !== "approved" && (
                        <Button
                          size="sm"
                          onClick={() => approveMutation.mutate(report.id)}
                        >
                          Approve
                        </Button>
                      )}

                      {status !== "rejected" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => rejectMutation.mutate(report.id)}
                        >
                          Reject
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
