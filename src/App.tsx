
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { recordVisit } from "./utils/visitTracker";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import SeoAnalysis from "./pages/SeoAnalysis";
import SolusiPage from "./pages/Catalog";  // Renamed import
import CatalogDetail from "./pages/CatalogDetail";
import CatalogEdit from "./pages/CatalogEdit";
import Cart from "./pages/Cart";
import ServiceAdd from "./pages/ServiceAdd";
import ServiceEdit from "./pages/ServiceEdit";
import CategoryManagement from "./pages/CategoryManagement";
import ServiceManagement from "./pages/ServiceManagement";
import EliteVALanding from "./pages/EliteVALanding";
import Pricing from "./pages/Pricing";
import About from "./pages/About";

// Create the query client outside of the component
const queryClient = new QueryClient();

// Define App as a proper function component
const App = () => {
  // Use the useEffect hook inside the function component
  useEffect(() => {
    // Record visit when app loads
    recordVisit();
  }, []);

  // Check if user is master admin
  const isMasterAdmin = () => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'master admin';
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/elite-va" replace />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/services" element={<ServiceManagement />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/seo-analysis" element={<SeoAnalysis />} />
          
          {/* Protected routes - only accessible to master admin */}
          <Route 
            path="/solusi" 
            element={isMasterAdmin() ? <SolusiPage /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/solusi/:id" 
            element={isMasterAdmin() ? <CatalogDetail /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/solusi/edit/:id" 
            element={isMasterAdmin() ? <CatalogEdit /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/cart" 
            element={isMasterAdmin() ? <Cart /> : <Navigate to="/" replace />} 
          />
          <Route path="/admin/solusi/add" element={<ServiceAdd />} />
          <Route path="/service/edit/:id" element={<ServiceEdit />} />
          <Route path="/admin/categories" element={<CategoryManagement />} />
          <Route path="/elite-va" element={<EliteVALanding />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
