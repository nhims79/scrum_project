import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { loginApi, registerApi } from "@/lib/api";


const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
  fullName: z.string().trim().min(1, { message: "Full name is required" }).max(100),
  cccd: z.string().trim().length(12, { message: "CCCD must be exactly 12 digits" }),
  phone: z.string().trim().min(10, { message: "Phone number must be at least 10 digits" }).max(20),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      cccd: "",
      phone: "",
    },
  });

  // const onLogin = async (values: LoginFormValues) => {
  //   setIsLoading(true);
  //   try {
  //     const { error } = await supabase.auth.signInWithPassword({
  //       email: values.email,
  //       password: values.password,
  //     });

  //     if (error) {
  //       toast({
  //         title: "Login failed",
  //         description: error.message,
  //         variant: "destructive",
  //       });
  //       return;
  //     }

  //     toast({
  //       title: "Success!",
  //       description: "You have been logged in successfully.",
  //     });
  //     navigate("/");
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "An unexpected error occurred. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const onLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const user = await loginApi(values.email, values.password);
      toast({
        title: "Success!",
        description: "You have been logged in successfully.",
      });
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  // const onSignup = async (values: SignupFormValues) => {
  //   setIsLoading(true);
  //   try {
  //     const { error } = await supabase.auth.signUp({
  //       email: values.email,
  //       password: values.password,
  //       options: {
  //         emailRedirectTo: `${window.location.origin}/`,
  //         data: {
  //           full_name: values.fullName,
  //           cccd: values.cccd,
  //           phone: values.phone,
  //           role: "patient",
  //         },
  //       },
  //     });

  //     if (error) {
  //       toast({
  //         title: "Signup failed",
  //         description: error.message,
  //         variant: "destructive",
  //       });
  //       return;
  //     }

  //     toast({
  //       title: "Success!",
  //       description: "Your account has been created successfully.",
  //     });
  //     navigate("/");
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "An unexpected error occurred. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const onSignup = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      await registerApi({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        cccd: values.cccd,
        phone: values.phone,
        role: "patient",
      });

      toast({
        title: "Success!",
        description: "Your account has been created successfully.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8 group">
          <Heart className="h-8 w-8 text-primary-foreground group-hover:text-secondary transition-colors" />
          <span className="text-2xl font-bold text-primary-foreground">HealthConnect</span>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="signup">
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                    <FormField
                      control={signupForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="cccd"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CCCD (ID Card)</FormLabel>
                          <FormControl>
                            <Input placeholder="123456789012" maxLength={12} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+84 xxx xxx xxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
