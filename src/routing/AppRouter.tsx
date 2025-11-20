import { Routes, Route } from "react-router-dom";
import CatFactsPage from "../pages/CatFacts/CatFactsPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<h1>Bienvenido a PracticaAPI</h1>} />
      <Route path="/cat-facts" element={<CatFactsPage />} />
    </Routes>
  );
}
