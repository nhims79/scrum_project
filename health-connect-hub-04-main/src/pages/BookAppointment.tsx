import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getOpenSlotsByDateGrouped } from "@/lib/api";

// Danh sách khung giờ hiển thị (12h-format)
const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function toAmPmLabel(hhmmss: string) {
  const [H, M] = hhmmss.split(":").map(Number);
  const h12 = ((H + 11) % 12) + 1;
  const ampm = H < 12 ? "AM" : "PM";
  const mm = String(M).padStart(2, "0");
  return `${String(h12).padStart(2, "0")}:${mm} ${ampm}`;
}

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [reason, setReason] = useState("");

  const [loadingSlots, setLoadingSlots] = useState(false);
  // map label "hh:mm AM/PM" -> scheduleId
  const [labelToSchedule, setLabelToSchedule] = useState<Map<string, number>>(new Map());

  const getErrorMessage = (e: unknown) =>
  e instanceof Error ? e.message : String(e);

  // Gọi API mỗi khi đổi ngày / doctorId
  useEffect(() => {
  (async () => {
    if (!doctorId || !date) return;
    try {
      setLoadingSlots(true);
      const iso = toISODate(date);
      const grouped = await getOpenSlotsByDateGrouped(Number(doctorId), iso, iso);

      // Tìm block đúng ngày
      const day = grouped.find((g: { workDate: string }) => g.workDate === iso);

      const m = new Map<string, number>();
      day?.slots.forEach((s: { startTime: string; scheduleId: number }) => {
        const label = toAmPmLabel(s.startTime);
        m.set(label, s.scheduleId);
      });
      setLabelToSchedule(m);

      // Nếu đang chọn slot nhưng không còn open → bỏ chọn
      if (selectedTime && !m.has(selectedTime)) {
        setSelectedTime("");
      }
    } catch (e: unknown) {
      setLabelToSchedule(new Map());
      toast({
        title: "Cannot load slots",
        description: getErrorMessage(e),
        variant: "destructive",
      });
    } finally {
      setLoadingSlots(false);
    }
  })();
  // thêm selectedTime vào deps vì bạn dùng nó trong effect
}, [doctorId, date, selectedTime]);
  const openSet = useMemo(() => new Set(labelToSchedule.keys()), [labelToSchedule]);

  const handleBooking = () => {
    if (!date || !selectedTime || !patientName || !patientPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    // Ở bước này bạn có thể dùng labelToSchedule.get(selectedTime) để lấy scheduleId và gọi POST /api/appointments
    toast({
      title: "Appointment Ready",
      description: `Selected ${toISODate(date)} - ${selectedTime}`,
    });
    navigate("/confirmation", {
      state: { date, time: selectedTime, doctorName: `Doctor #${doctorId}`, patientName, patientPhone, reason }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Book Your Appointment</h1>
            <p className="text-lg text-muted-foreground">Select your preferred date and time</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar bác sĩ (demo) */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-card shadow-medium sticky top-24">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">DR</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Doctor #{doctorId}</CardTitle>
                      <CardDescription className="text-base">Department</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Clinic / Hospital</span>
                  </div>
                  <div className="pt-2">
                    <Badge variant="secondary">Experience info</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Nội dung đặt lịch */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-gradient-card shadow-medium">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    <CardTitle>Select Date</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date(new Date().toDateString())}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-medium">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <CardTitle>Select Time Slot</CardTitle>
                  </div>
                  {loadingSlots && (
                    <CardDescription>Loading available slots…</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots.map((time) => {
                      const isOpen = openSet.has(time);
                      const isSelected = selectedTime === time;
                      return (
                        <Button
                          key={time}
                          variant={isSelected ? "default" : (isOpen ? "outline" : "secondary")}
                          onClick={() => isOpen && setSelectedTime(time)}
                          className={
                            "w-full " + (isOpen ? "" : "opacity-70 pointer-events-none bg-black text-white dark:bg-black")
                          }
                          disabled={!isOpen}
                          title={isOpen ? "Available" : "Fully booked"}
                        >
                          {time}
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-medium">
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Visit (Optional)</Label>
                    <Textarea
                      id="reason"
                      placeholder="Briefly describe your symptoms or reason for visit"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="min-h-24"
                    />
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleBooking}
                size="lg"
                className="w-full"
                disabled={!date || !selectedTime || !patientName || !patientPhone}
              >
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Confirm Appointment
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookAppointment;
