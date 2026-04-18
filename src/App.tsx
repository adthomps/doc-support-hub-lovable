import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Developers from "./pages/Developers";
import Customers from "./pages/Customers";
import Resellers from "./pages/Resellers";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/developers" element={<Layout><Developers /></Layout>} />
          <Route path="/customers" element={<Layout><Customers /></Layout>} />
          <Route path="/resellers" element={<Layout><Resellers /></Layout>} />
          <Route path="/getting-started" element={<Layout><ComingSoon eyebrow="Resources" title="Getting started" description="Your first steps with the platform." /></Layout>} />
          <Route path="/api" element={<Layout><ComingSoon eyebrow="Resources" title="API reference" description="Complete reference for all endpoints." /></Layout>} />
          <Route path="/changelog" element={<Layout><ComingSoon eyebrow="Resources" title="Changelog" description="Recent platform updates and releases." /></Layout>} />
          <Route path="/faq" element={<Layout><ComingSoon eyebrow="Support" title="Frequently asked questions" description="Answers to common questions." /></Layout>} />
          <Route path="/support" element={<Layout><ComingSoon eyebrow="Support" title="Contact support" description="Reach our support team for help." /></Layout>} />
          <Route path="/status" element={<Layout><ComingSoon eyebrow="Support" title="System status" description="Live status of platform services." /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
