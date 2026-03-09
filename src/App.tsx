import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import DownloadPage from "./pages/Download";
import PricingPage from "./pages/Prices";

export function App() {
  return (
    <main className="min-h-screen">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/download_not_launched" element={<DownloadPage />} />
          <Route path="/pricing_not_launched" element={<PricingPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
