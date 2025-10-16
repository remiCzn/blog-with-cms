import Overlay from "./overlay";

const CreateModelModal = ({ open }: { open: boolean }) => {
  if (!open) return null;
  return (
    <Overlay>
      <h2 class="mb-4 text-xl font-semibold text-slate-800">
        Create a new model
      </h2>
      <form
        method="post"
        action="/admin"
        class="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label class="block text-sm font-medium text-slate-700">
            Name
            <input
              name="name"
              type="text"
              required
              class="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            />
          </label>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700">
            Slug
            <input
              name="slug"
              type="text"
              required
              placeholder="ex: blog-posts"
              pattern="[a-z0-9\\-]+"
              class="mt-1 w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            />
          </label>
          <p class="mt-1 text-xs text-slate-500">
            Lowercase letters, numbers, and hyphens only.
          </p>
        </div>
        <button
          type="submit"
          class="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Create model
        </button>
      </form>
    </Overlay>
  );
};

export default CreateModelModal;
