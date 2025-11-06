import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, Users, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hinhanh.png";
import { CalendarDays, Phone, Mail, MapPin } from "lucide-react"; // ✅ Đã thêm các icon bị thiếu
import Navbar from "@/components/Navbar";  // Đảm bảo đường dẫn đúng với cấu trúc của bạn
import { useNavigate } from "react-router-dom";


const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra nếu người dùng đã đăng nhập
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);  // Đã đăng nhập
    }
  }, []);

  const features = [
    { icon: Calendar, title: "Easy Booking", description: "Book appointments with your preferred doctors in just a few clicks." },
    { icon: Clock, title: "24/7 Availability", description: "Access our platform anytime, anywhere to manage your healthcare." },
    { icon: Users, title: "Expert Doctors", description: "Connect with certified healthcare professionals across specialties." },
    { icon: Shield, title: "Secure & Private", description: "Your health data is protected with enterprise-grade security." },
  ];

  const steps = [
    { number: "01", title: "Start", description: "Describe symptoms or pick a department" },
    { number: "02", title: "Choose Doctor", description: "Browse specialists and select your preferred doctor" },
    { number: "03", title: "Book Appointment", description: "Pick a convenient date and time for your visit" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e6f3ff] via-[#cfe8ff] to-[#e6f3ff]">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-[#0b3d91] leading-tight">
                  Your Health,
                  <br />
                  <span className="text-[#14b8a6]">Our Priority</span>
                </h1>

                <p className="text-lg text-[#2c3e50] md:text-xl">
                  Book appointments with top healthcare professionals instantly. Simple, secure, and available 24/7.
                </p>
              </div>

              {/* Hiển thị nút Book Appointment nếu người dùng đã đăng nhập */}
              {isLoggedIn && (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link to="/symptoms">
                    <Button
                      size="lg"
                variant="outline"
                onClick={() => navigate("/symptoms")}
                className="text-lg px-8"
                    >
                      Book Appointment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-[#2c3e50]">
                  <CheckCircle2 className="h-5 w-5 text-[#14b8a6]" />
                  <span className="text-sm">No waiting time</span>
                </div>
                <div className="flex items-center gap-2 text-[#2c3e50]">
                  <CheckCircle2 className="h-5 w-5 text-[#14b8a6]" />
                  <span className="text-sm">Instant confirmation</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-large bg-white">
                <img
                  src={heroImage}
                  alt="Modern hospital"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why Choose HealthConnect?</h2>
            <p className="text-lg text-muted-foreground">Experience healthcare management like never before</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Card key={i} className="border-2 transition-all hover:-translate-y-1 hover:shadow-medium">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                    <f.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="text-lg text-muted-foreground">Get started in three simple steps</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <Card className="h-full border-2 transition-all hover:shadow-medium">
                  <CardHeader>
                    <div className="mb-4 text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {s.number}
                    </div>
                    <CardTitle className="text-xl">{s.title}</CardTitle>
                    <CardDescription className="text-base">{s.description}</CardDescription>
                  </CardHeader>
                </Card>
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 text-primary md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <CalendarDays className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-semibold text-foreground">HealthBook</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                Your trusted partner in healthcare appointment management.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
                <li><Link to="/departments" className="text-muted-foreground hover:text-primary">Book Appointment</Link></li>
                <li><Link to="/auth" className="text-muted-foreground hover:text-primary">Login</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-foreground">Services</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><span className="text-muted-foreground hover:text-primary">General Practice</span></li>
                <li><span className="text-muted-foreground hover:text-primary">Specialist Consultations</span></li>
                <li><span className="text-muted-foreground hover:text-primary">Emergency Care</span></li>
                <li><span className="text-muted-foreground hover:text-primary">Diagnostic Services</span></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-foreground">Contact</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" /> +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" /> info@healthbook.com
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" /> 123 Medical Plaza, City
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px w-full bg-border" />

          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} HealthBook. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
