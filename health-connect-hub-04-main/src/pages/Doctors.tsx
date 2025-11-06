import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DoctorCard from "@/components/DoctorCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { getDoctorsByDepartment } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

type Doctor = {
  doctorId: number;
  fullName: string;
  degree: string | null;
  experienceYears: number | null;
  departmentName: string;
  available: boolean | null;
};

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const deptId = Number(searchParams.get("deptId"));
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // gọi API khi deptId thay đổi
  useEffect(() => {
    if (!deptId) return;
    (async () => {
      try {
        setLoading(true);
        const data = await getDoctorsByDepartment(deptId);
        setDoctors(data);
      } catch (err: any) {
        toast({
          title: "Failed to load doctors",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [deptId]);

  const filteredDoctors = doctors.filter((d) => {
    const search = searchTerm.toLowerCase();
    return (
      d.fullName.toLowerCase().includes(search) ||
      (d.degree ?? "").toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Doctors in Department
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse and book appointments with available doctors
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by doctor name or degree..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading doctors...
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No doctors found for this department.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.doctorId}
                  id={String(doctor.doctorId)}
                  name={doctor.fullName}
                  specialty={doctor.degree || "—"}
                  experience={doctor.experienceYears || 0}
                  location={doctor.departmentName}
                  availableSlots={doctor.available ? 3 : 0} // có thể hiển thị “Full” nếu false
                />
              ))}
            </div>
          )}

          <div className="text-center pt-8">
            <button
              onClick={() => navigate("/departments")}
              className="underline text-primary"
            >
              ← Back to Departments
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Doctors;
