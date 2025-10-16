import type { AppType } from "../../../src/index";
import { hc } from "hono/client";
import { createQueryKeyStore } from "@lukemorales/query-key-factory";

const api = hc<AppType>("/");

export default api;

export const queries = createQueryKeyStore({
  models: {
    all: {
      queryFn: () =>
        api.api.admin.models.$get().then(async (res) => {
          if (res.ok) {
            return res.json();
          } else if (res.status === 401) {
            return [];
          }
        }),
      queryKey: null,
    },
  },
});
