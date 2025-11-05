import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Calendar, Clock, User, Phone, FileText, Home } from "lucide-react";
import { format } from "date-fns";

const Confirmation = () => {
  const location = useLocation();
  const { date, time, doctorName, patientName, patientPhone, reason } = location.state || {};

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-secondary/10">
                <CheckCircle2 className="h-16 w-16 text-secondary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground">Appointment Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Your appointment has been successfully scheduled
            </p>
          </div>

          <Card className="bg-gradient-card shadow-medium">
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b border-border">
                <User className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Doctor</p>
                  <p className="font-medium">{doctorName || "Dr. Sarah Johnson"}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 pb-3 border-b border-border">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {date ? format(new Date(date), "MMMM dd, yyyy") : "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3 border-b border-border">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{time || "Not specified"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3 border-b border-border">
                <User className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Patient Name</p>
                  <p className="font-medium">{patientName || "Not specified"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-3 border-b border-border">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Contact Number</p>
                  <p className="font-medium">{patientPhone || "Not specified"}</p>
                </div>
              </div>

              {reason && (
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Reason for Visit</p>
                    <p className="font-medium">{reason}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-accent/50 border-accent">
            <CardContent className="pt-6">
              <p className="text-sm text-accent-foreground">
                <strong>Important:</strong> You will receive a confirmation message on your registered phone number. 
                Please arrive 15 minutes before your scheduled appointment time. Bring your ID and any relevant medical records.
              </p>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button asChild variant="outline" className="flex-1">
              <Link to="/doctors">
                Book Another
              </Link>
            </Button>
            <Button asChild className="flex-1">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Confirmation;
