import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  CalendarCheck, 
  FileText, 
  Coffee,
  Play,
  Square,
  CheckCircle2
} from "lucide-react";
import { format } from 'date-fns';

export default function EmployeeDashboard() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCheckedIn && checkInTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - checkInTime.getTime()) / 1000);
        setElapsedTime(diff);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn, checkInTime]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setCheckInTime(new Date());
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setCheckInTime(null);
    setElapsedTime(0);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, Sarah!</h2>
          <p className="text-muted-foreground mt-1">
            {format(new Date(), "EEEE, MMMM do yyyy")}
          </p>
        </div>
        
        <Card className="w-full md:w-auto bg-primary text-primary-foreground border-none shadow-lg">
          <CardContent className="p-4 flex items-center gap-6">
            <div>
              <p className="text-sm font-medium text-primary-foreground/80">Current Session</p>
              <div className="text-3xl font-mono font-bold tracking-wider mt-1">
                {formatTime(elapsedTime)}
              </div>
            </div>
            <div className="h-12 w-px bg-primary-foreground/20" />
            {isCheckedIn ? (
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold shadow-sm"
                onClick={handleCheckOut}
              >
                <Square className="mr-2 h-4 w-4 fill-current" /> Check Out
              </Button>
            ) : (
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold shadow-sm"
                onClick={handleCheckIn}
              >
                <Play className="mr-2 h-4 w-4 fill-current" /> Check In
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Work Hours Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4h 12m</div>
            <Progress value={55} className="mt-3 h-2" />
            <p className="text-xs text-muted-foreground mt-2">Target: 8h 00m</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Days</div>
            <div className="flex gap-1 mt-2">
              <div className="h-2 w-full bg-primary rounded-full" />
              <div className="h-2 w-1/3 bg-muted rounded-full" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">8 Casual, 4 Sick</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground mt-1 text-green-600 font-medium">
              Excellent attendance!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <Button variant="link" className="px-0 h-auto text-xs text-primary underline">
              Complete now
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Holidays</CardTitle>
            <CardDescription>Upcoming public holidays and company events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Thanksgiving Day', date: 'Nov 23, 2023', day: 'Thursday', type: 'Public Holiday' },
                { name: 'Christmas Eve', date: 'Dec 24, 2023', day: 'Sunday', type: 'Optional Holiday' },
                { name: 'Christmas Day', date: 'Dec 25, 2023', day: 'Monday', type: 'Public Holiday' },
              ].map((holiday, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-card/50 hover:bg-accent/50 transition-colors">
                  <div className="flex gap-4 items-center">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-primary">
                      <span className="text-xs font-bold uppercase">{holiday.date.split(' ')[0]}</span>
                      <span className="text-lg font-bold">{holiday.date.split(' ')[1].replace(',', '')}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{holiday.name}</h4>
                      <p className="text-sm text-muted-foreground">{holiday.day}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    holiday.type === 'Public Holiday' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {holiday.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative border-l border-muted ml-2 space-y-6 pb-2">
              {[
                { title: 'Checked Out', time: 'Yesterday, 6:00 PM', icon: LogOutIcon },
                { title: 'Daily Report Submitted', time: 'Yesterday, 5:45 PM', icon: FileText },
                { title: 'Checked In', time: 'Yesterday, 9:00 AM', icon: LogInIcon },
                { title: 'Leave Approved', time: 'Oct 20, 2:30 PM', icon: CheckCircle2 },
              ].map((activity, i) => {
                 const Icon = activity.icon;
                 return (
                  <div key={i} className="ml-6 relative">
                    <span className="absolute -left-[2.4rem] mt-1 h-8 w-8 rounded-full border bg-background flex items-center justify-center">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </span>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                 )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LogInIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  )
}

function LogOutIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}
