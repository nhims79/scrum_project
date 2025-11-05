import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Shield, Users, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose HealthConnect?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make healthcare accessible, efficient, and personalized for every patient
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-2">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Save Time</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Skip the guesswork. Our intelligent system directs you to the right specialist immediately.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Expert Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Access a network of qualified, experienced healthcare professionals across all specialties.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-2">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Your health information is protected with industry-leading security standards.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-2">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Rated Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Read reviews and ratings from real patients to make informed decisions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
