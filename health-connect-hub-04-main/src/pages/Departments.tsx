import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DepartmentCard from "@/components/DepartmentCard";
import { Activity, Brain, Heart, Baby, Eye, Bone, Thermometer, Stethoscope } from "lucide-react";

const departments = [
  {
    id: "cardiology",
    title: "Cardiology",
    description: "Heart and cardiovascular system specialists",
    icon: Heart,
    symptoms: ["Chest pain", "Irregular heartbeat", "Shortness of breath"]
  },
  {
    id: "neurology",
    title: "Neurology",
    description: "Brain and nervous system specialists",
    icon: Brain,
    symptoms: ["Headache", "Dizziness", "Memory issues", "Seizures"]
  },
  {
    id: "orthopedics",
    title: "Orthopedics",
    description: "Bone, joint, and muscle specialists",
    icon: Bone,
    symptoms: ["Joint pain", "Back pain", "Fractures", "Sports injuries"]
  },
  {
    id: "general",
    title: "General Medicine",
    description: "General health concerns and check-ups",
    icon: Stethoscope,
    symptoms: ["Fever", "Fatigue", "General wellness", "Preventive care"]
  },
  {
    id: "pediatrics",
    title: "Pediatrics",
    description: "Child and adolescent healthcare",
    icon: Baby,
    symptoms: ["Child fever", "Growth concerns", "Vaccinations"]
  },
  {
    id: "ophthalmology",
    title: "Ophthalmology",
    description: "Eye care and vision specialists",
    icon: Eye,
    symptoms: ["Vision problems", "Eye pain", "Eye infections"]
  },
  {
    id: "ent",
    title: "ENT",
    description: "Ear, Nose, and Throat specialists",
    icon: Activity,
    symptoms: ["Sore throat", "Ear pain", "Sinus issues", "Hearing loss"]
  },
  {
    id: "infectious",
    title: "Infectious Disease",
    description: "Infection and immunity specialists",
    icon: Thermometer,
    symptoms: ["Persistent fever", "Infections", "Travel-related illness"]
  }
];

const Departments = () => {
  const navigate = useNavigate();

  const handleSelectDepartment = (departmentId: string) => {
    navigate(`/doctors?department=${departmentId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Medical Departments</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our specialized departments and find the right doctor for your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <DepartmentCard
                key={dept.id}
                title={dept.title}
                description={dept.description}
                icon={dept.icon}
                symptoms={dept.symptoms}
                onSelect={() => handleSelectDepartment(dept.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Departments;
