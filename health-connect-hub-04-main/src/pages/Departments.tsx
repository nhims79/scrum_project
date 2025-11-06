import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DepartmentCard from "@/components/DepartmentCard";
import { Activity, Brain, Heart, Baby, Eye, Bone, Thermometer, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getDoctorsByDepartment } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type DeptMatch = { deptId: number; deptName: string; matchedDiseases: number };

const iconMap: Record<string, any> = {
  Cardiology: Heart,
  Neurology: Brain,
  Orthopedics: Bone,
  Pediatrics: Baby,
  Ophthalmology: Eye,
  ENT: Activity,
  "Infectious Disease": Thermometer,
  default: Stethoscope,
};

export default function Departments() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const { departments, symptoms } = (location.state || {}) as {
    departments?: DeptMatch[];
    symptoms?: string[];
  };

  const handleViewDoctors = async (dept: DeptMatch) => {
    try {
      setLoadingId(dept.deptId);
      const doctors = await getDoctorsByDepartment(dept.deptId);
      // điều hướng sang trang Doctors, mang theo danh sách đã fetch
      navigate(`/doctors?deptId=${dept.deptId}`, {
        state: { deptId: dept.deptId, deptName: dept.deptName, symptoms, doctors },
      });
    } catch (e: any) {
      toast({ title: "Cannot load doctors", description: e.message, variant: "destructive" });
    } finally {
      setLoadingId(null);
    }
  };

  if (!departments || departments.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-10 text-center">
              <p className="text-lg text-muted-foreground">
                No departments to show. Please go back and select your symptoms first.
              </p>
              <button className="mt-6 underline text-primary" onClick={() => navigate("/symptoms")}>
                ← Choose symptoms
              </button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Recommended Departments</h1>
            {symptoms?.length ? (
              <p className="text-sm text-muted-foreground">
                Based on symptoms: <span className="italic">{symptoms.join(", ")}</span>
              </p>
            ) : null}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => {
              const Icon = iconMap[dept.deptName] ?? iconMap.default;
              return (
                <DepartmentCard
                  key={dept.deptId}
                  title={dept.deptName}
                  description={`Matched diseases: ${dept.matchedDiseases}`}
                  icon={Icon}
                  symptoms={[]}
                  onSelect={() => handleViewDoctors(dept)}
                // nếu component hỗ trợ label nút:
                // actionLabel={loadingId === dept.deptId ? "Loading..." : "View doctors"}
                // disabled={loadingId === dept.deptId}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
