import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Symptoms from "./pages/Symptoms";
import Departments from "./pages/Departments";
import BookAppointment from "./pages/BookAppointment";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Doctors from "./pages/Doctors";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/book/:doctorId" element={<BookAppointment />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/doctors" element={<Doctors />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
