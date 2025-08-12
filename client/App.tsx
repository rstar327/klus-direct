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
<div>
  <h2>Registreer je account</h2>
  <input type="email" id="email" placeholder="E-mail" required />
  <input type="password" id="password" placeholder="Wachtwoord" required />
  <select id="package">
    <option value="basic">Basic Account - 15% commissie</option>
    <option value="professional">Professional Account - 7,5% commissie</option>
    <option value="elite">Elite Account - 5% commissie</option>
  </select>
  <button id="registerBtn">Registreer</button>
  <p id="message"></p>
</div>

<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

  const supabaseUrl = 'https://bpcnxmmgfidhmiiskpar.supabase.co'
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwY254bW1nZmlkaG1paXNrcGFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NzkzODIsImV4cCI6MjA3MDU1NTM4Mn0.54uqMJfbtEjH_-zbXVK0SD3szF6iLnA4eir5Bwe8Y4w'

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  document.getElementById('registerBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const packageSelected = document.getElementById('package').value
    const messageEl = document.getElementById('message')

    if (!email || !password) {
      messageEl.textContent = 'Vul e-mail en wachtwoord in!'
      messageEl.style.color = 'red'
      return
    }

    // Maak gebruiker aan in Supabase Auth
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      messageEl.textContent = 'Fout bij registratie: ' + error.message
      messageEl.style.color = 'red'
      return
    }

    // Sla pakket keuze op in een aparte tabel "profiles" (moet je in Supabase aanmaken)
    const { data, error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: user.id, package: packageSelected }])

    if (profileError) {
      messageEl.textContent = 'Fout bij opslaan pakket: ' + profileError.message
      messageEl.style.color = 'red'
      return
    }

    messageEl.textContent = 'Registratie succesvol! Check je e-mail om te bevestigen.'
    messageEl.style.color = 'green'
  })
</script>
