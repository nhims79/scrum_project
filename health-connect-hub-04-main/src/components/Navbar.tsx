import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Heart className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
            <span className="text-xl font-bold text-foreground">HealthConnect</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/symptoms" className="text-foreground/80 hover:text-foreground transition-colors">
              Symptom Checker
            </Link>
            <Link to="/departments" className="text-foreground/80 hover:text-foreground transition-colors">
              Departments
            </Link>
            <Button asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link to="/symptoms" className="block py-2 text-foreground/80 hover:text-foreground transition-colors">
              Symptom Checker
            </Link>
            <Link to="/departments" className="block py-2 text-foreground/80 hover:text-foreground transition-colors">
              Departments
            </Link>
            <Button asChild className="w-full">
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
