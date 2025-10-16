import { useQuery } from "@tanstack/react-query";
import { queries } from "../../../api/api";
import CreateModelModal from "./create-model-modal";

const ModelList = () => {
  const query = useQuery(queries.models.all);

  if (query.data) {
    return (
      <div className="space-y-10">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Existing models</h2>
            <p className="text-sm">{query.data.length} total</p>
          </div>
          <div className="overflow-hidden rounded-xl border card">
            <ul className="divide-y">
              {query.data.map((m) => (
                <li className="flex flex-row items-center justify-between px-4 py-3">
                  <div>
                    <a
                      href={`/admin/${m.id}`}
                      className="text-base font-medium card-title"
                    >
                      {m.name}
                    </a>
                    <p className="text-xs uppercase tracking-wide">{m.slug}</p>
                  </div>
                  <a
                    href={`/admin/${m.id}`}
                    className="text-sm font-medium card-actions"
                  >
                    Manage →
                  </a>
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
