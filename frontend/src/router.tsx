import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/Home";

const AdminRouter = React.lazy(() => import("./admin"));

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="admin/*" element={<AdminRouter />} />
    </Routes>
  );
}

export default App;
