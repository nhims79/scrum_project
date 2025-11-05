import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

interface DepartmentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  symptoms: string[];
  onSelect: () => void;
}

const DepartmentCard = ({ title, description, icon: Icon, symptoms, onSelect }: DepartmentCardProps) => {
  return (
    <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer group bg-gradient-card border-border/50">
      <CardHeader>
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Common symptoms:</p>
          <div className="flex flex-wrap gap-2">
            {symptoms.map((symptom, index) => (
              <span 
                key={index} 
                className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground"
              >
                {symptom}
              </span>
            ))}
          </div>
        </div>
        <Button 
          onClick={onSelect}
          variant="default" 
          className="w-full group-hover:bg-primary/90 transition-colors"
        >
          View Doctors
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default DepartmentCard;
