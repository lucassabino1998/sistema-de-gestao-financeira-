import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Usuariopage from "../pages/Usuariopage";
import PainelFinanceiro from "../pages/PainelFinanceiro";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

function PrivateRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/usuario" replace />;
  }

  return <>{children}</>;
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/usuario" element={<Usuariopage />} />

        <Route path="/" element={<Navigate to="/usuario" replace />} />

        <Route
          path="/geral"
          element={
            <PrivateRoute>
              <PainelFinanceiro />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/usuario" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;