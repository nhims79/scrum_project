import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchSymptoms, matchDepartmentsBySymptoms } from "@/lib/api";

type Symptom = { id: number; name: string };

const Symptoms = () => {
  const [allSymptoms, setAllSymptoms] = useState<Symptom[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // load symptoms từ backend khi mở trang
  useEffect(() => {
    (async () => {
      try {
        const list = await fetchSymptoms();
        setAllSymptoms(list);
      } catch (e: any) {
        toast({ title: "Cannot load symptoms", description: e.message, variant: "destructive" });
      }
    })();
  }, []);

  const toggleSymptom = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectedNames = useMemo(
    () => allSymptoms.filter(s => selectedIds.includes(s.id)).map(s => s.name),
    [allSymptoms, selectedIds]
  );

  const handleAnalyze = async () => {
    if (selectedIds.length === 0) {
      toast({ title: "No symptoms selected", description: "Please select or describe your symptoms", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const matches = await matchDepartmentsBySymptoms(selectedIds);
      // chuyển sang trang departments, mang theo: triệu chứng đã chọn + danh sách khoa gợi ý
      navigate("/departments", {
        state: {
          symptoms: selectedNames,
          departments: matches, // [{deptId, deptName, matchedDiseases}, ...]
        },
      });
    } catch (e: any) {
      toast({ title: "Analyze failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
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
                {allSymptoms.map((s) => (
                  <Badge
                    key={s.id}
                    variant={selectedIds.includes(s.id) ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2 text-sm hover:shadow-soft transition-all"
                    onClick={() => toggleSymptom(s.id)}
                  >
                    {s.name}
                  </Badge>
                ))}
                {allSymptoms.length === 0 && (
                  <span className="text-sm text-muted-foreground">Loading symptoms…</span>
                )}
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/50 border border-accent">
                <AlertCircle className="h-5 w-5 text-accent-foreground mt-0.5" />
                <p className="text-sm text-accent-foreground">
                  <strong>Disclaimer:</strong> This tool provides general guidance only. For emergencies, call emergency services immediately. Always consult with qualified healthcare professionals for medical advice.
                </p>
              </div>

              <Button onClick={handleAnalyze} className="w-full" size="lg" disabled={loading || selectedIds.length === 0}>
                {loading ? "Analyzing…" : "Analyze Symptoms"}
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
