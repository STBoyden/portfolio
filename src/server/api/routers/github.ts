import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Octokit } from "octokit";
import { z } from "zod";

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export const githubRouter = createTRPCRouter({
  data: publicProcedure
    .input(z.object({ repositoryName: z.string() }))
    .query(async ({ input }) => {
      const repositoryInfo = await octokit.request(
        "GET /repos/{owner}/{repo}",
        {
          owner: "STBoyden",
          repo: input.repositoryName,
          headers: {
            accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        },
      );

      return { info: repositoryInfo };
    }),
  pullRequestsCount: publicProcedure
    .input(z.object({ repositoryName: z.string() }))
    .query(async ({ input }) => {
      const prs = await octokit.rest.pulls.list({
        owner: "STBoyden",
        repo: input.repositoryName,
      });

      return prs.data.length;
    }),
});
