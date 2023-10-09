import { authenticatedProcedure, createTRPCRouter } from "@/server/api/trpc";
import { z } from "zod";

export const githubRouter = createTRPCRouter({
  data: authenticatedProcedure
    .input(z.object({ repositoryName: z.string() }))
    .query(
      async ({ ctx: { octokit, username }, input: { repositoryName } }) => {
        const infoReq = octokit.rest.repos.get({
          owner: username,
          repo: repositoryName,
        });
        const prsReq = octokit.rest.pulls.list({
          owner: username,
          repo: repositoryName,
        });
        const issuesReq = octokit.rest.issues.listForRepo({
          owner: username,
          repo: repositoryName,
          pulls: false,
          state: "open",
        });
        const forksReq = octokit.rest.repos.listForks({
          owner: username,
          repo: repositoryName,
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
