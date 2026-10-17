import "./index.css";
import { MotionConfig } from "motion/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PageShell } from "@/components/layout/page-shell";
import DownloadPage from "@/pages/Download";
import HomePage from "@/pages/Home";
import NotFoundPage from "@/pages/NotFound";
import PrivacyPage from "@/pages/Privacy";

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <PageShell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            {/* Pricing was retired when DataCia became free; keep old links working. */}
            <Route path="/pricing" element={<Navigate to="/download" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageShell>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
