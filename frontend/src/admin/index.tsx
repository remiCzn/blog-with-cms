import { Route, Routes } from "react-router";
import Layout from "./components/layout";
import ModelList from "./pages/model-list";
import ModelDetails from "./pages/model";
import { useSession } from "./api/auth";
import SignUpPage from "./pages/auth/sign-up";
import { Loader2 } from "lucide-react";
import SignInPage from "./pages/auth/sign-in";

const AdminRouter = () => {
  const session = useSession();

  if (session.isPending) {
    return (
      <div className="h-svh w-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <Routes>
      <Route element={<Layout />}>
        {session?.data ? (
          <>
            <Route index element={<ModelList />} />
            <Route path=":modelId" element={<ModelDetails />} />
            <Route path="dashboard" element={<div>Admin Dashboard</div>} />
          </>
        ) : (
          <>
            <Route index element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
          </>
        )}
      </Route>
    </Routes>
  );
};

export default AdminRouter;
