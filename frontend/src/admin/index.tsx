import { Route, Routes } from "react-router";
import Layout from "./components/layout";
import ModelList from "./pages/model-list";
import ModelDetails from "./pages/model";

const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ModelList />} />
        <Route path=":modelId" element={<ModelDetails />} />
        <Route path="dashboard" element={<div>Admin Dashboard</div>} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
