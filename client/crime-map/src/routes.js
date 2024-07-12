import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterForm from "./components/forms/RegisterForm";
import LoginForm from "./components/forms/LoginForm";
import AuthoritiesPage from "./pages/AuthoritiesPage";
import SearchesPage from "./pages/SearchesPage";
import Force from "./pages/ForceDetails";
import CrimePreventionResources from "./pages/CrimePreventionResources"

const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/authorities" element={<AuthoritiesPage />} />
      <Route path="/authorities/:id" element={<Force />} />
      <Route path="/search-history" element={<SearchesPage />} />
      <Route path="/resources" element={<CrimePreventionResources />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default RoutesPage;
