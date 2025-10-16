import { PropsWithChildren } from "hono/jsx";

const Overlay = ({ children }: PropsWithChildren) => {
  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="max-h-full w-full max-w-2xl overflow-auto rounded-xl p-6">
        {children}
      </div>
    </div>
  );
};

export default Overlay;
