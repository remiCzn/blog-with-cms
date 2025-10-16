import React from "react";
import { Route, Routes } from "react-router";
const AdminRouter = React.lazy(() => import("./admin"));

function App() {
  return (
    <Routes>
      <Route index element={<div>Home Page</div>} />
      <Route path="admin/*" element={<AdminRouter />} />
    </Routes>
  );
}

export default App;
