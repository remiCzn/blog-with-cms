import { useState, type FormEventHandler } from "react";
import { cn } from "../../../lib/utils";

const CreateModelModal = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <button className="btn" onClick={() => setOpen(true)}>
        Ajouter +
      </button>
      <dialog
        open={open}
        className={cn("modal", open && "modal-open")}
        onClose={() => setOpen(false)}
      >
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <h2 className="mb-4 text-xl font-semibold">Create a new model</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <label className="fieldset-legend" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="ex: Blog Posts"
                className="mt-1 w-full input"
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="fieldset-legend" htmlFor="slug">
                Slug
              </label>
              <input
                placeholder="ex: blog-posts"
                id="slug"
                type="text"
                required
                className="mt-1 w-full input"
              />
              <p className="label">
                Lowercase letters, numbers, and hyphens only.
              </p>
            </fieldset>
            <div className="flex flex-row justify-end gap-2 pt-4">
              <button
                type="button"
                className="btn btn-primary btn-outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create model
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default CreateModelModal;
