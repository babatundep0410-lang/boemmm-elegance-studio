import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { Layout } from "@/components/Layout";
import { CartDrawer } from "@/components/CartDrawer";

// Pages
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import ProductPage from "./pages/ProductPage";
import ARExperience from "./pages/ARExperience";
import About from "./pages/About";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CurrencyProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Home - Special layout without header/footer */}
            <Route path="/" element={<><Home /><CartDrawer /></>} />
            
            {/* All other pages use Layout with header/footer */}
            <Route element={<Layout />}>
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:collectionSlug" element={<CollectionDetail />} />
              <Route path="/collections/:collectionSlug/:categorySlug" element={<ProductPage />} />
              <Route path="/ar-experience" element={<ARExperience />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/articles" element={<Articles />} />
              <Route path="/about/articles/:articleSlug" element={<ArticleDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            
            {/* Checkout */}
            <Route path="/checkout" element={<><Checkout /><CartDrawer /></>} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            
            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
      </CurrencyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
