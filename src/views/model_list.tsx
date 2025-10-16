import { FC, useState } from "hono/jsx";
import CreateModelModal from "./components/create-model-modal";

export const ModelList: FC = ({ models }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div class="space-y-10">
      <p>{open ? "Modal is open" : "Modal is closed"}</p>
      <CreateModelModal open={open} />
    </div>
  );
};
