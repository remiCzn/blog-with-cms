import { PropsWithChildren } from "hono/jsx";

export const H3 = (props: PropsWithChildren) => {
  return (
    <h3 class="text-lg font-semibold text-slate-800" {...props}>
      {props.children}
    </h3>
  );
};
