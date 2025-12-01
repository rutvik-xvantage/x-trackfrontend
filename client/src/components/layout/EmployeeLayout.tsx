import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '@/store/authStore';
import { Redirect } from 'wouter';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface EmployeeLayoutProps {
  children: ReactNode;
}

export function EmployeeLayout({ children }: EmployeeLayoutProps) {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated || user?.role !== 'employee') {
    return <Redirect to="/login" />;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="employee" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Employee Portal</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.position || 'Employee'}</p>
              </div>
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>EM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
