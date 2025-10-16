import { useQuery } from "@tanstack/react-query";
import { queries } from "../../../api/api";
import CreateModelModal from "./create-model-modal";
import { Link } from "react-router";

const ModelList = () => {
  const query = useQuery(queries.models.all);

  if (query.data) {
    return (
      <div className="space-y-10">
        <title>Admin - Models</title>
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Existing models</h2>
            <p className="text-sm">{query.data.length} models</p>
          </div>
          <div className="overflow-hidden rounded-xl card">
            <ul className="divide-y bg-base-200 divide-base-300">
              {query.data.map((m) => (
                <li className="flex flex-row items-center justify-between px-4 py-3">
                  <div>
                    <Link
                      to={`/admin/${m.id}`}
                      className="text-base font-medium card-title"
                    >
                      {m.name}
                    </Link>
                    <p className="text-xs uppercase tracking-wide">{m.slug}</p>
                  </div>
                  <Link
                    to={`/admin/${m.id}`}
                    className="text-sm font-medium card-actions"
                  >
                    Manage →
                  </Link>
                </li>
              ))}
              {query.data.length === 0 && (
                <li className="px-4 py-6 text-center text-sm">
                  No models yet. Create the first one below.
                </li>
              )}
            </ul>
          </div>
        </section>
        <CreateModelModal />
      </div>
    );
  }
};

export default ModelList;
