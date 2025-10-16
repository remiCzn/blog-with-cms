import { FC } from "hono/jsx";
import { H3 } from "./components/title";

const fieldTypes = ["TEXT", "NUMBER", "BOOLEAN"] as const;

type ModelDetailProps = {
  model: {
    name: string;
    slug: string;
    fields: any[];
    Row?: any[];
  };
  successMessage?: string;
  errorMessage?: string;
};

const formatValue = (field: any, value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return <span class="text-slate-400">—</span>;
  }

  if (field.type === "BOOLEAN") {
    return value ? "Oui" : "Non";
  }

  return `${value}`;
};

export const ModelDetail: FC<ModelDetailProps> = ({
  model,
  successMessage,
  errorMessage,
}) => {
  const rows = (model.Row ?? []) as any[];

  return (
    <div class="space-y-10">
      {successMessage && (
        <div class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold text-slate-800">{model.name}</h2>
            <p class="text-sm text-slate-500">slug : {model.slug}</p>
          </div>
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <span class="rounded-full bg-slate-100 px-3 py-1">
              {model.fields.length} champs
            </span>
            <span class="rounded-full bg-slate-100 px-3 py-1">
              {rows.length} entrées
            </span>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <H3>Entrées</H3>
          {rows.length > 0 && (
            <span class="text-xs font-medium uppercase tracking-wide text-slate-400">
              Dernière mise à jour :{" "}
              {new Date(rows[0].createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
        <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
          {rows.length > 0 ? (
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-200 text-sm">
                <thead class="bg-slate-50">
                  <tr>
                    {model.fields.map((field: any) => (
                      <th class="px-4 py-3 text-left font-medium text-slate-600">
                        {field.label}
                      </th>
                    ))}
                    <th class="px-4 py-3 text-left font-medium text-slate-600">
                      Créé le
                    </th>
                    <th class="px-4 py-3 text-right font-medium text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  {rows.map((row) => {
                    const valueMap = new Map(
                      row.RowValue.map((rv: any) => [rv.field, rv.value])
                    );
                    return (
                      <tr>
                        {model.fields.map((field: any) => (
                          <td class="px-4 py-3 text-slate-700">
                            {formatValue(field, valueMap.get(field.id))}
                          </td>
                        ))}
                        <td class="px-4 py-3 text-xs text-slate-500">
                          {new Date(row.createdAt).toLocaleString()}
                        </td>
                        <td class="px-4 py-3">
                          <div class="flex justify-end gap-2">
                            <a
                              href={`/admin/${model.slug}/rows/${row.id}/edit`}
                              class="inline-flex items-center rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                            >
                              Modifier
                            </a>
                            <form
                              method="post"
                              action={`/admin/${model.slug}/rows/${row.id}/delete`}
                            >
                              <button
                                type="submit"
                                class="inline-flex items-center rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:border-red-300 hover:bg-red-50"
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
            <p class="px-4 py-8 text-center text-sm text-slate-500">
              Aucune entrée pour le moment.
            </p>
          )}
        </div>
      </section>

      <section class="space-y-4">
        <H3>Ajouter une entrée</H3>
        {model.fields.length === 0 ? (
          <p class="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-8 text-sm text-slate-500">
            Ajoutez au moins un champ avant de créer des entrées.
          </p>
        ) : (
          <form
            method="post"
            action={`/admin/${model.slug}/rows`}
            class="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            {model.fields.map((field: any) => (
              <div>
                <label class="block text-sm font-medium text-slate-700">
                  {field.label}
                  {field.type === "TEXT" && (
                    <input
                      name={`field-${field.id}`}
                      type="text"
                      class="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                      required={field.required}
                    />
                  )}
                  {field.type === "NUMBER" && (
                    <input
                      name={`field-${field.id}`}
                      type="number"
                      class="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                      required={field.required}
                    />
                  )}
                  {field.type === "BOOLEAN" && (
                    <span class="mt-2 flex items-center gap-2">
                      <input
                        name={`field-${field.id}`}
                        type="checkbox"
                        class="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span class="text-sm text-slate-600">
                        {field.required
                          ? "Doit être coché"
                          : "Cocher pour valeur vraie"}
                      </span>
                    </span>
                  )}
                </label>
                <p class="mt-1 text-xs uppercase tracking-wide text-slate-400">
                  {field.name} · {field.type}
                  {field.required ? " · Obligatoire" : ""}
                </p>
              </div>
            ))}

            <button
              type="submit"
              class="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Créer l’entrée
            </button>
          </form>
        )}
      </section>

      <section class="space-y-4">
        <H3>Champs</H3>
        <div class="rounded-xl border border-slate-200 bg-white shadow-sm">
          <ul class="divide-y divide-slate-200">
            {model.fields.map((f: any) => (
              <li class="flex items-center justify-between px-4 py-4">
                <div>
                  <p class="text-base font-medium text-slate-800">{f.label}</p>
                  <p class="text-sm text-slate-500">
                    {f.name} · {f.type}
                    {f.required ? " · Obligatoire" : ""}
                  </p>
                </div>
                <form
                  method="post"
                  action={`/admin/${model.slug}/fields/${f.id}/delete`}
                >
                  <button
                    type="submit"
                    class="inline-flex items-center rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Supprimer
                  </button>
                </form>
              </li>
            ))}
            {model.fields.length === 0 && (
              <li class="px-4 py-8 text-center text-sm text-slate-500">
                Aucun champ défini pour ce modèle.
              </li>
            )}
          </ul>
        </div>
      </section>

      <section class="space-y-4">
        <H3>Ajouter un champ</H3>
        <form
          method="post"
          action={`/admin/${model.slug}/fields`}
          class="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label class="block text-sm font-medium text-slate-700">
              Nom interne
              <input
                name="name"
                type="text"
                required
                class="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
              />
            </label>
            <p class="mt-1 text-xs text-slate-500">
              Utilisez snake_case ou kebab-case pour rester compatible avec
              l’API.
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700">
              Libellé
              <input
                name="label"
                type="text"
                required
                class="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
              />
            </label>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700">
              Type
              <select
                name="type"
                class="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
              >
                {fieldTypes.map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </select>
            </label>
          </div>
          <div class="flex items-center space-x-2">
            <input
              name="required"
              type="checkbox"
              id="required"
              class="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <label for="required" class="text-sm font-medium text-slate-700">
              Obligatoire
            </label>
          </div>
          <button
            type="submit"
            class="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Créer le champ
          </button>
        </form>
      </section>
    </div>
  );
};
