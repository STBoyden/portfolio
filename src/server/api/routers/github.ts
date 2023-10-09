import { authenticatedProcedure, createTRPCRouter } from "@/server/api/trpc";
import { z } from "zod";

export const githubRouter = createTRPCRouter({
  data: authenticatedProcedure
    .input(z.object({ repositoryName: z.string() }))
    .query(
      async ({ ctx: { octokit, username }, input: { repositoryName } }) => {
        const repositoryInfo = await octokit.rest.repos.get({
          owner: username,
          repo: repositoryName,
        });

        return { info: repositoryInfo };
      },
    ),
  pullRequestsCount: authenticatedProcedure
    .input(z.object({ repositoryName: z.string() }))
    .query(
      async ({ ctx: { octokit, username }, input: { repositoryName } }) => {
        const prs = await octokit.rest.pulls.list({
          owner: username,
          repo: repositoryName,
        });

        return prs.data.length;
      },
    ),
});
