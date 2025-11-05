import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  location: string;
  availableSlots: number;
  image?: string;
}

const DoctorCard = ({ id, name, specialty, rating, experience, location, availableSlots, image }: DoctorCardProps) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return (
    <Card className="hover:shadow-medium transition-all duration-300 bg-gradient-card border-border/50">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl mb-1">{name}</CardTitle>
            <CardDescription className="text-base">{specialty}</CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="text-sm font-medium">{rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{experience} years exp.</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium">
              {availableSlots} slots available
            </span>
          </div>
          {availableSlots > 0 && (
            <Badge variant="secondary" className="bg-secondary/10">Available Today</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/book/${id}`} className="w-full">
          <Button className="w-full" size="lg">
            Book Appointment
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
