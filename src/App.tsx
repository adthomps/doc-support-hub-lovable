import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Developers from "./pages/Developers";
import Businesses from "./pages/Businesses";
import Resellers from "./pages/Resellers";
import GettingStarted from "./pages/GettingStarted";
import ApiReference from "./pages/ApiReference";
import Changelog from "./pages/Changelog";
import Faq from "./pages/Faq";
import Support from "./pages/Support";
import Status from "./pages/Status";
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
          <Route path="/businesses" element={<Layout><Businesses /></Layout>} />
          <Route path="/customers" element={<Navigate to="/businesses" replace />} />
          <Route path="/resellers" element={<Layout><Resellers /></Layout>} />
          <Route path="/getting-started" element={<Layout><GettingStarted /></Layout>} />
          <Route path="/api" element={<Layout><ApiReference /></Layout>} />
          <Route path="/changelog" element={<Layout><Changelog /></Layout>} />
          <Route path="/faq" element={<Layout><Faq /></Layout>} />
          <Route path="/support" element={<Layout><Support /></Layout>} />
          <Route path="/status" element={<Layout><Status /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
