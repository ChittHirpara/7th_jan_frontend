import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AnalysisPage from "./pages/AnalysisPage";
import HistoryPage from "./pages/HistoryPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analyze"
        element={
          <ProtectedRoute>
            <AnalysisPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
