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
import Article from "./pages/Article";
import CategoryIndex from "./pages/CategoryIndex";
import NotFound from "./pages/NotFound";
import ApiOverview from "./pages/ApiOverview";
import RestResources from "./pages/RestResources";
import RpcMethods from "./pages/RpcMethods";
import Events from "./pages/Events";
import WebhooksGuide from "./pages/WebhooksGuide";
import AiTools from "./pages/AiTools";
import ErrorCatalog from "./pages/ErrorCatalog";
import Compatibility from "./pages/Compatibility";
import Adrs from "./pages/Adrs";
import AdrDetail from "./pages/AdrDetail";
import SecurityModel from "./pages/SecurityModel";
import Idempotency from "./pages/Idempotency";
import Versioning from "./pages/Versioning";
import Boundaries from "./pages/Boundaries";

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
          <Route path="/:audience/articles/:slug" element={<Layout><Article /></Layout>} />
          <Route path="/:audience/category/:categorySlug" element={<Layout><CategoryIndex /></Layout>} />
          <Route path="/getting-started" element={<Layout><GettingStarted /></Layout>} />

          {/* API surfaces */}
          <Route path="/api" element={<Layout><ApiOverview /></Layout>} />
          <Route path="/api/reference" element={<Layout><ApiReference /></Layout>} />
          <Route path="/api/rest" element={<Layout><RestResources /></Layout>} />
          <Route path="/api/rpc" element={<Layout><RpcMethods /></Layout>} />
          <Route path="/api/events" element={<Layout><Events /></Layout>} />
          <Route path="/api/webhooks" element={<Layout><WebhooksGuide /></Layout>} />
          <Route path="/api/ai-tools" element={<Layout><AiTools /></Layout>} />
          <Route path="/api/errors" element={<Layout><ErrorCatalog /></Layout>} />
          <Route path="/api/compatibility" element={<Layout><Compatibility /></Layout>} />

          {/* Architecture */}
          <Route path="/architecture/adrs" element={<Layout><Adrs /></Layout>} />
          <Route path="/architecture/adrs/:id" element={<Layout><AdrDetail /></Layout>} />
          <Route path="/architecture/security" element={<Layout><SecurityModel /></Layout>} />
          <Route path="/architecture/idempotency" element={<Layout><Idempotency /></Layout>} />
          <Route path="/architecture/versioning" element={<Layout><Versioning /></Layout>} />
          <Route path="/architecture/boundaries" element={<Layout><Boundaries /></Layout>} />

          <Route path="/changelog" element={<Layout><Changelog /></Layout>} />
          <Route path="/faq" element={<Layout><Faq /></Layout>} />
          <Route path="/support" element={<Layout><Support /></Layout>} />
          <Route path="/status" element={<Layout><Status /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
