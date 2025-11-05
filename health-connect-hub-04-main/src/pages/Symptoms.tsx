import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const commonSymptoms = [
  "Fever", "Headache", "Cough", "Chest Pain", "Abdominal Pain",
  "Nausea", "Dizziness", "Fatigue", "Joint Pain", "Shortness of Breath"
];

const Symptoms = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please select or describe your symptoms",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Analyzing symptoms...",
      description: "Finding the best department for you",
    });
    
    setTimeout(() => {
      navigate("/departments", { state: { symptoms: selectedSymptoms } });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Symptom Checker</h1>
            <p className="text-lg text-muted-foreground">
              Select your symptoms below and we'll recommend the right medical department
            </p>
          </div>

          <Card className="bg-gradient-card shadow-medium">
            <CardHeader>
              <CardTitle>What are you experiencing?</CardTitle>
              <CardDescription>Select all symptoms that apply to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <Badge
                    key={symptom}
                    variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2 text-sm hover:shadow-soft transition-all"
                    onClick={() => toggleSymptom(symptom)}
                  >
                    {symptom}
                  </Badge>
                ))}
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/50 border border-accent">
                <AlertCircle className="h-5 w-5 text-accent-foreground mt-0.5" />
                <p className="text-sm text-accent-foreground">
                  <strong>Disclaimer:</strong> This tool provides general guidance only. For emergencies, call emergency services immediately. Always consult with qualified healthcare professionals for medical advice.
                </p>
              </div>

              <Button 
                onClick={handleAnalyze} 
                className="w-full" 
                size="lg"
                disabled={selectedSymptoms.length === 0 }
              >
                Analyze Symptoms
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Symptoms;
