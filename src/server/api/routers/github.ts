import { env } from "@/env.mjs";
import {
  createTRPCRouter,
  middleware,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const isGitHubAuthenticated = middleware(async (opts) => {
  const { ctx } = opts;

  const {
    data: { login },
  } = await ctx.octokit.rest.users.getAuthenticated();

  if (login !== env.GITHUB_USERNAME) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({ ctx: { username: login } });
});

const authenticatedProcedure = publicProcedure.use(isGitHubAuthenticated);

export const githubRouter = createTRPCRouter({
  data: authenticatedProcedure
    .input(z.object({ repositoryName: z.string() }))
    .query(
      async ({ ctx: { octokit, username }, input: { repositoryName } }) => {
        const params = { owner: username, repo: repositoryName };

        const infoReq = octokit.rest.repos.get(params);
        const prsReq = octokit.rest.pulls.list(params);
        const forksReq = octokit.rest.repos.listForks(params);
        const issuesReq = octokit.rest.issues.listForRepo({
          pulls: false,
          state: "open",
          ...params,
        });

        const [info, prs, issues, forks] = await Promise.all([
          infoReq,
          prsReq,
          issuesReq,
          forksReq,
        ]);

        return { info: info, prs: prs, issues: issues, forks: forks };
      },
    ),
});
