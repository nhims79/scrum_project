import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Stethoscope, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-doctors.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Find the Right Doctor for Your Symptoms
            </h1>
            <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-xl mx-auto lg:mx-0">
              Our intelligent system helps you identify the right medical department and book appointments with qualified doctors instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link to="/symptoms">
                <Button size="lg" variant="secondary" className="group shadow-medium hover:shadow-strong transition-all">
                  Check Your Symptoms
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <Stethoscope className="h-8 w-8 mx-auto mb-2 text-primary-foreground" />
                <p className="text-sm text-primary-foreground/80">Expert Doctors</p>
              </div>
              <div className="text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-primary-foreground" />
                <p className="text-sm text-primary-foreground/80">Easy Booking</p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary-foreground" />
                <p className="text-sm text-primary-foreground/80">Save Time</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <img 
              src={heroImage} 
              alt="Professional healthcare team" 
              className="rounded-2xl shadow-strong w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
