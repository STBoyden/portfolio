import { env } from "@/env.mjs";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { createNextApiHandler } from "@trpc/server/adapters/next";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
  // cache github api requests
  responseMeta({ ctx, paths, errors, type }) {
    const allGithub = paths && paths.every((path) => path.includes("github"));
    const allOkay = errors.length === 0;
    const isQuery = type === "query";

    if (
      ctx?.octokit &&
      allGithub &&
      allOkay &&
      isQuery &&
      env.NODE_ENV !== "development"
    ) {
      const ONE_DAY_IN_SECONDS = 60 * 60 * 24; // invalidate every 24 hours
      return {
        headers: {
          "cache-control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
        },
      };
    }

    return {};
  },
});
