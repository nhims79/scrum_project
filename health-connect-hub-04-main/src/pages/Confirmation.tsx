import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Calendar, Clock, User, Phone, FileText, Home, History } from "lucide-react";
import { format } from "date-fns";
// ⚠️ Đảm bảo đường dẫn đúng: nếu bạn đặt file là lib/appointments.ts (số nhiều) thì sửa lại import cho khớp
import { saveAppointment, type Appointment } from "@/lib/appointment";
import { toast } from "sonner";

// ---- Khai báo kiểu dữ liệu state nhận từ trang trước (KHÔNG dùng any)
type ConfirmState = {
  date?: string;                 // ISO date string (yyyy-mm-dd hoặc full ISO)
  time?: string;                 // "HH:mm"
  doctorName?: string;
  doctorSpecialization?: string;
  departmentName?: string;
  symptomName?: string;
  patientName?: string;
  patientPhone?: string;
  reason?: string;
};

// ---- Type guard để kiểm tra runtime và gỡ cảnh báo any/unknown
function isConfirmState(val: unknown): val is ConfirmState {
  if (val === null || typeof val !== "object") return false;
  const v = val as Record<string, unknown>;
  const isStrOrUndef = (x: unknown) => typeof x === "string" || typeof x === "undefined";
  return (
    isStrOrUndef(v.date) &&
    isStrOrUndef(v.time) &&
    isStrOrUndef(v.doctorName) &&
    isStrOrUndef(v.doctorSpecialization) &&
    isStrOrUndef(v.departmentName) &&
    isStrOrUndef(v.symptomName) &&
    isStrOrUndef(v.patientName) &&
    isStrOrUndef(v.patientPhone) &&
    isStrOrUndef(v.reason)
  );
}

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy state và ép kiểu an toàn (không any)
  const state: ConfirmState = isConfirmState(location.state) ? location.state : {};

  const {
    date,
    time,
    doctorName,
    doctorSpecialization,
    departmentName,
    symptomName,
    patientName,
    patientPhone,
    reason,
  } = state;

  // Đảm bảo chỉ lưu 1 lần khi vào trang (tránh lưu trùng khi refresh)
  const savedOnceRef = useRef(false);

  useEffect(() => {
    if (savedOnceRef.current) return;
    savedOnceRef.current = true;

    // Tạo object appointment đúng kiểu để lưu localStorage
    const appt: Appointment = {
      id: Date.now().toString(),
      appointment_date: date || new Date().toISOString().slice(0, 10), // yyyy-mm-dd fallback
      appointment_time: time || "09:00",
      status: "confirmed",
      doctors: {
        name: doctorName || "Dr. Sarah Johnson",
        specialization: doctorSpecialization || "General",
      },
      departments: { name: departmentName || "General" },
      symptoms: { name: symptomName || reason || "N/A" },
    };

    try {
      saveAppointment(appt);
      toast.success("Appointment saved to history");
    } catch (e) {
      // e là unknown; chỉ log ra mà không dùng as any
      console.error(e);
      toast.error("Failed to save appointment");
    }
  }, [date, time, doctorName, doctorSpecialization, departmentName, symptomName, reason]);

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

              {(reason || symptomName) && (
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Reason for Visit</p>
                    <p className="font-medium">{reason || symptomName}</p>
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
              <Link to="/doctors">Book Another</Link>
            </Button>

            <Button className="flex-1" onClick={() => navigate("/history")}>
              <History className="mr-2 h-4 w-4" />
              View History
            </Button>

            <Button asChild variant="secondary" className="flex-1">
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
