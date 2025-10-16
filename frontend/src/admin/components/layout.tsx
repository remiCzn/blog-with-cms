import { Link, Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="shadow-sm">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold">Back-Office</h1>
          <p className="text-sm">Admin console</p>
        </div>
        <nav>
          <Link to="/admin" className="text-sm font-medium">
            Home
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
