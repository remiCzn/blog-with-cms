import { Link, Outlet, useNavigate } from "react-router";
import { authClient } from "../api/auth";
import { ArrowRight } from "lucide-react";

const Layout = () => {
  const nav = useNavigate();

  const logout = async () => {
    await authClient.signOut();
    nav("/admin");
  };

  const session = authClient.useSession();

  return (
    <div className="shadow-sm min-h-svh flex flex-col">
      <header className="w-full shadow-sm">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Back-Office</h1>
            <p className="text-sm">Admin console</p>
          </div>
          <nav className="flex flex-col items-end gap-2">
            {session.data?.session && (
              <>
                <Link
                  to="/admin"
                  className="text-sm font-medium flex flex-row items-center gap-1"
                >
                  Home <ArrowRight className="size-4" />
                </Link>
                <button
                  className="text-sm font-medium cursor-pointer flex flex-row items-center gap-1"
                  onClick={logout}
                >
                  Logout <ArrowRight className="size-4" />
                </button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
