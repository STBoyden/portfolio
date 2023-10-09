import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/env.mjs";
import { api } from "@/utils/api";
import {
  ClockIcon,
  CodeIcon,
  FileWarningIcon,
  GitBranchIcon,
  GitForkIcon,
  GithubIcon,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const repositories = [
  "codectrl",
  "tracectrl",
  "portfolio",
  "codectrl-go-logger",
  "ocean",
];

// eslint-disable-next-line @typescript-eslint/require-await
function getData() {
  const repositoryData = [];

  for (const repoName of repositories) {
    const response = api.github.data.useQuery({
      repositoryName: repoName,
    });

    if (response?.data === undefined) continue;
    const {
      info: { data: info },
      prs: { data: prs },
      issues: { data: issues },
      forks: { data: forks },
    } = response?.data;

    repositoryData.push({ info, prs, issues, forks } as const);
  }

  return repositoryData;
}

export default function Projects() {
  const data = getData();
  data.sort(({ info: a }, { info: b }) => {
    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
  });

  return (
    <>
      <Head>
        <title>Samuel Boyden - Projects</title>
        <meta name="description" content="Samuel Boyden's projects." />
      </Head>
      <div className="mt-2">
        <div className="mb-2 w-full p-2 flex">
          <Link
            className="mx-auto"
            href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`}
            passHref
          >
            <Button>
              <GithubIcon className="mr-2" />
              <p className="text-lg">My GitHub profile</p>
            </Button>
          </Link>
        </div>
        {data.length == 0 && (
          <div className="grid-cols-1 md:grid-cols-2 grid-flow-row grid gap-2">
            {repositories.map((repo) => {
              return <Skeleton key={repo} className="w-60 h-60 bg-muted" />;
            })}
          </div>
        )}
        {data && (
          <div className="grid-cols-1 md:grid-cols-2 grid-flow-row grid gap-2">
            {data.map(({ info, prs, issues, forks }) => {
              return (
                <Link key={info.url} href={info.html_url}>
                  <Card className="hover:bg-muted">
                    <CardHeader>
                      <CardTitle>{info.full_name}</CardTitle>
                      <CardDescription>
                        {info.description ?? "No description."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        width={330}
                        height={100}
                        priority
                        className="h-auto w-auto max-h-[330px] rounded-xl"
                        alt={`Generated picture for ${info.full_name}`}
                        src={`https://socialify.git.ci/${info.full_name}/image?language=1&name=1&owner=1&pattern=Circuit%20Board&theme=Auto`}
                      ></Image>
                    </CardContent>
                    <CardFooter className="flex-col">
                      <div className="flex w-full gap-2">
                        <Link
                          className="ml-auto"
                          href={`https://github.com/${info.full_name}/fork`}
                        >
                          <Badge>
                            <GitForkIcon className="w-4 h-4 mr-2" />
                            {forks.length} fork(s)
                          </Badge>
                        </Link>
                        <Link
                          href={`https://github.com/${info.full_name}/issues`}
                        >
                          <Badge>
                            <FileWarningIcon className="w-4 h-4 mr-2" />
                            {issues.length} issue(s)
                          </Badge>
                        </Link>
                        <Link
                          className="mr-auto"
                          href={`https://github.com/${info.full_name}/pulls`}
                        >
                          <Badge>
                            <GitBranchIcon className="w-4 h-4 mr-2" />
                            {prs.length} pull request(s)
                          </Badge>
                        </Link>
                      </div>
                      <div className="flex gap-2 mt-1">
                        <Badge>
                          <ClockIcon className="w-4 h-4 mr-2" /> Last updated:{" "}
                          {new Date(info.pushed_at).toLocaleString()}
                        </Badge>
                        <Badge>
                          <CodeIcon className="w-4 h-4 mr-2" /> Language:{" "}
                          {info.language}
                        </Badge>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
