import { useParams } from "react-router";

const ModelDetails = () => {
  const { modelId } = useParams();

  const model = {
    id: modelId,
    name: "Articles",
    slug: "articles",
    fields: [
      {
        id: "field-1",
        name: "title",
        label: "Title",
        type: "TEXT",
        required: true,
      },
      {
        id: "field-2",
        name: "content",
        label: "Content",
        type: "TEXT",
        required: false,
      },
    ],
  };

  const rows = [];
  return (
    <div className="space-y-4">
      <title>Admin - {model.name}</title>

      <div role="alert" className="alert alert-error">
        <span>xx</span>
      </div>
      <div role="alert" className="alert alert-success">
        <span>ee</span>
      </div>

      <section className="card bg-base-200 shadow-sm">
        <div className="flex flex-row items-center justify-between card-body">
          <div>
            <h2 className="text-xl font-semibold">{model.name}</h2>
            <p className="text-sm">slug : {model.slug}</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
            <div className="badge badge-info badge-sm px-3 py-1">
              {model.fields.length} champs
            </div>
            <div className="badge badge-info badge-sm px-3 py-1">
              {rows.length} entrées
            </div>
          </div>
        </div>
      </section>

      {/* <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3>Entrées</h3>
          {rows.length > 0 && (
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Dernière mise à jour :{" "}
              {new Date(rows[0].createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          {rows.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {model.fields.map((field: any) => (
                      <th className="px-4 py-3 text-left font-medium text-slate-600">
                        {field.label}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-left font-medium text-slate-600">
                      Créé le
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {rows.map((row) => {
                    const valueMap = new Map(
                      row.RowValue.map((rv: any) => [rv.field, rv.value])
                    );
                    return (
                      <tr>
                        {model.fields.map((field: any) => (
                          <td className="px-4 py-3 text-slate-700">
                            {formatValue(field, valueMap.get(field.id))}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-xs text-slate-500">
                          {new Date(row.createdAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <a
                              href={`/admin/${model.slug}/rows/${row.id}/edit`}
                              className="inline-flex items-center rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                            >
                              Modifier
                            </a>
                            <form
                              method="post"
                              action={`/admin/${model.slug}/rows/${row.id}/delete`}
                            >
                              <button
                                type="submit"
                                className="inline-flex items-center rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:border-red-300 hover:bg-red-50"
                              >
                                Supprimer
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="px-4 py-8 text-center text-sm text-slate-500">
              Aucune entrée pour le moment.
            </p>
          )}
        </div>
      </section> */}

      {/* <section className="space-y-4">
        <H3>Ajouter une entrée</H3>
        {model.fields.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-8 text-sm text-slate-500">
            Ajoutez au moins un champ avant de créer des entrées.
          </p>
        ) : (
          <form
            method="post"
            action={`/admin/${model.slug}/rows`}
            className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            {model.fields.map((field: any) => (
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  {field.label}
                  {field.type === "TEXT" && (
                    <input
                      name={`field-${field.id}`}
                      type="text"
                      className="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                      required={field.required}
                    />
                  )}
                  {field.type === "NUMBER" && (
                    <input
                      name={`field-${field.id}`}
                      type="number"
                      className="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                      required={field.required}
                    />
                  )}
                  {field.type === "BOOLEAN" && (
                    <span className="mt-2 flex items-center gap-2">
                      <input
                        name={`field-${field.id}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-sm text-slate-600">
                        {field.required
                          ? "Doit être coché"
                          : "Cocher pour valeur vraie"}
                      </span>
                    </span>
                  )}
                </label>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                  {field.name} · {field.type}
                  {field.required ? " · Obligatoire" : ""}
                </p>
              </div>
            ))}

            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Créer l’entrée
            </button>
          </form>
        )}
      </section> */}

      <section className="space-y-2">
        <h3 className="text-lg font-semibold">Champs</h3>
        <div className="rounded-xl shadow-sm bg-base-200">
          <ul className="divide-y divide-base-300">
            {model.fields.map((f) => (
              <li className="flex items-center justify-between px-4 py-4">
                <div>
                  <p className="text-base font-medium">{f.label}</p>
                  <p className="text-sm text-slate-500">
                    {f.name} · {f.type}
                    {f.required ? " · required" : ""}
                  </p>
                </div>
                <form
                  method="post"
                  action={`/admin/${model.slug}/fields/${f.id}/delete`}
                >
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Supprimer
                  </button>
                </form>
              </li>
            ))}
            {model.fields.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-slate-500">
                Aucun champ défini pour ce modèle.
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* <section className="space-y-4">
        <H3>Ajouter un champ</H3>
        <form
          method="post"
          action={`/admin/${model.slug}/fields`}
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Nom interne
              <input
                name="name"
                type="text"
                required
                className="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
              />
            </label>
            <p className="mt-1 text-xs text-slate-500">
              Utilisez snake_case ou kebab-case pour rester compatible avec
              l’API.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Libellé
              <input
                name="label"
                type="text"
                required
                className="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Type
              <select
                name="type"
                className="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
              >
                {fieldTypes.map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              name="required"
              type="checkbox"
              id="required"
              className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <label
              for="required"
              className="text-sm font-medium text-slate-700"
            >
              Obligatoire
            </label>
          </div>
          <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Créer le champ
          </button>
        </form>
      </section> */}
    </div>
  );
};

export default ModelDetails;
