import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import DownloadPage from "./pages/Download";
import PricingPage from "./pages/Prices";
import PrivacyPage from "./pages/Privacy";

export function App() {
  return (
    <main className="min-h-screen">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
