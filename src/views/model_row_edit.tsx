import { FC } from "hono/jsx";

type ModelRowEditProps = {
  model: {
    id: string;
    name: string;
    slug: string;
    fields: any[];
  };
  row: any & { RowValue: any[] };
  successMessage?: string;
  errorMessage?: string;
};

const valueToString = (value: unknown) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  return `${value}`;
};

export const ModelRowEdit: FC<ModelRowEditProps> = ({
  model,
  row,
  successMessage,
  errorMessage,
}) => {
  const valueMap = new Map(row.RowValue.map((rv: any) => [rv.field, rv.value]));

  return (
    <div class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-slate-800">
            Modifier une entrée
          </h2>
          <p class="text-sm text-slate-500">
            {model.name} • créée le {new Date(row.createdAt).toLocaleString()}
          </p>
        </div>
        <a
          href={`/admin/${model.slug}`}
          class="inline-flex items-center rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50"
        >
          ← Retour à la liste
        </a>
      </div>

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

      <form
        id={`delete-row-${row.id}`}
        method="post"
        action={`/admin/${model.slug}/rows/${row.id}/delete`}
      />

      <form
        method="post"
        action={`/admin/${model.slug}/rows/${row.id}`}
        class="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        {model.fields.length === 0 ? (
          <p class="text-sm text-slate-500">
            Aucun champ défini pour ce modèle. Ajoutez des champs avant de
            modifier une entrée.
          </p>
        ) : (
          model.fields.map((field) => {
            const rawValue = valueMap.get(field.id);
            return (
              <div>
                <label class="block text-sm font-medium text-slate-700">
                  {field.label}
                  {field.type === "TEXT" && (
                    <input
                      name={`field-${field.id}`}
                      type="text"
                      value={valueToString(rawValue)}
                      class="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                      required={field.required}
                    />
                  )}
                  {field.type === "NUMBER" && (
                    <input
                      name={`field-${field.id}`}
                      type="number"
                      value={valueToString(rawValue)}
                      class="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                      required={field.required}
                    />
                  )}
                  {field.type === "BOOLEAN" && (
                    <span class="mt-2 flex items-center gap-2">
                      <input
                        name={`field-${field.id}`}
                        type="checkbox"
                        checked={rawValue === true}
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
            );
          })
        )}

        <div class="flex items-center justify-between">
          <button
            form={`delete-row-${row.id}`}
            type="submit"
            class="inline-flex items-center rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 hover:border-red-300 hover:bg-red-50"
          >
            Supprimer cette entrée
          </button>
          <button
            type="submit"
            class="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};
