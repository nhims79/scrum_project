import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DoctorCard from "@/components/DoctorCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const mockDoctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    rating: 4.8,
    experience: 15,
    location: "City General Hospital",
    availableSlots: 5,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    rating: 4.9,
    experience: 12,
    location: "Medical Center Downtown",
    availableSlots: 3,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    rating: 4.7,
    experience: 8,
    location: "Children's Hospital",
    availableSlots: 7,
  },
  {
    id: "4",
    name: "Dr. James Williams",
    specialty: "Orthopedics",
    rating: 4.6,
    experience: 20,
    location: "Orthopedic Clinic",
    availableSlots: 2,
  },
  {
    id: "5",
    name: "Dr. Lisa Anderson",
    specialty: "General Medicine",
    rating: 4.8,
    experience: 10,
    location: "Community Health Center",
    availableSlots: 6,
  },
  {
    id: "6",
    name: "Dr. David Kim",
    specialty: "Ophthalmology",
    rating: 4.9,
    experience: 14,
    location: "Eye Care Institute",
    availableSlots: 4,
  },
];

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const department = searchParams.get("department");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(department || "all");

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || 
                            doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Find Your Doctor</h1>
            <p className="text-lg text-muted-foreground">
              Search and book appointments with qualified healthcare professionals
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                <SelectItem value="general medicine">General Medicine</SelectItem>
                <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No doctors found matching your criteria
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Doctors;
