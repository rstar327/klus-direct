import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomerRegister from "./pages/CustomerRegister";
import CraftsmanRegister from "./pages/CraftsmanRegister";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerQuoteDashboard from "./pages/CustomerQuoteDashboard";
import CraftsmanDashboard from "./pages/CraftsmanDashboard";
import JobDetails from "./pages/JobDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/customer/register" element={<CustomerRegister />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/quotes" element={<CustomerQuoteDashboard />} />
          <Route path="/craftsman/register" element={<CraftsmanRegister />} />
          <Route path="/craftsman/dashboard" element={<CraftsmanDashboard />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Prevent multiple createRoot calls during hot reload
const rootElement = document.getElementById("root")!;
let root = (rootElement as any)._reactRoot;

if (!root) {
  root = createRoot(rootElement);
  (rootElement as any)._reactRoot = root;
}

root.render(<App />);
