import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [, setLocation] = useLocation();
  const login = useAuthStore((state) => state.login);
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (role: 'admin' | 'employee') => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock login logic
      if (email && password) {
        const mockUser = {
          id: role === 'admin' ? '1' : '2',
          name: role === 'admin' ? 'Alex Admin' : 'Sarah Employee',
          email: email,
          role: role,
          avatar: '',
          department: 'Engineering',
          position: role === 'admin' ? 'System Admin' : 'Frontend Developer'
        };
        
        login(mockUser, 'mock-jwt-token');
        
        toast({
          title: "Welcome back!",
          description: `Logged in as ${role}`,
        });

        setLocation(role === 'admin' ? '/admin/dashboard' : '/employee/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please enter email and password",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-1/2 -left-20 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
      
      <Card className="w-full max-w-md border-none shadow-2xl bg-card/80 backdrop-blur-sm relative z-10">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <span className="text-2xl font-bold">X</span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your Xtrack account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="employee" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="employee">Employee</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    placeholder="name@company.com" 
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">Remember me for 30 days</Label>
              </div>
            </div>

            <TabsContent value="employee">
              <Button 
                className="w-full mt-6 h-11 text-base" 
                onClick={() => handleLogin('employee')}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign in as Employee
              </Button>
            </TabsContent>
            
            <TabsContent value="admin">
              <Button 
                className="w-full mt-6 h-11 text-base" 
                onClick={() => handleLogin('admin')}
                disabled={isLoading}
              >
                 {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign in as Admin
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center text-sm text-muted-foreground pb-8">
          <p>Don't have an account? <a href="#" className="text-primary font-medium hover:underline">Contact HR</a></p>
          <div className="text-xs text-muted-foreground/60">
            <p>Demo Credentials:</p>
            <p>Any email + password works</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
