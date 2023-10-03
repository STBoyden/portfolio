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
];

// eslint-disable-next-line @typescript-eslint/require-await
function getData() {
  const repos = [];

  for (const repoName of repositories) {
    const response = api.github.data.useQuery({
      repositoryName: repoName,
    });
    const prs = api.github.pullRequestsCount.useQuery({
      repositoryName: repoName,
    });

    if (response?.data?.info === undefined) continue;
    if (prs?.data === undefined) continue;

    repos.push([response.data.info, prs.data] as const);
  }

  return repos;
}

export default function Projects() {
  const data = getData();
  data.sort((a, b) => {
    return (
      new Date(a[0].data.updated_at).getDate() -
      new Date(b[0].data.updated_at).getDate()
    );
  });

  return (
    <>
      <Head>
        <title>Samuel Boyden - Projects</title>
        <meta name="description" content="Samuel Boyden's projects." />
      </Head>
      <div className="mt-2">
        <div className="mb-2 w-full p-2 flex">
          <Link className="mx-auto" href="https://github.com/STBoyden" passHref>
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
            {data.map(([{ data }, prCount]) => {
              return (
                <Link key={data.url} href={data.html_url}>
                  <Card className="hover:bg-muted">
                    <CardHeader>
                      <CardTitle>{data.full_name}</CardTitle>
                      <CardDescription>
                        {data.description ?? "No description."}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        width={326}
                        height={100}
                        priority
                        className="h-auto w-auto max-h-[326px] rounded-xl"
                        alt={`Generated picture for ${data.full_name}`}
                        src={`https://socialify.git.ci/STBoyden/${data.name}/image?language=1&name=1&owner=1&pattern=Circuit%20Board&theme=Auto`}
                      ></Image>
                    </CardContent>
                    <CardFooter className="flex-col">
                      <div className="flex w-full gap-2">
                        <Link
                          className="ml-auto"
                          href={`https://github.com/STBoyden/${data.name}/fork`}
                        >
                          <Badge>
                            <GitForkIcon className="w-4 h-4 mr-2" />{" "}
                            {data.forks_count} fork(s)
                          </Badge>
                        </Link>
                        <Link
                          href={`https://github.com/STBoyden/${data.name}/issues`}
                        >
                          <Badge>
                            <FileWarningIcon className="w-4 h-4 mr-2" />{" "}
                            {data.open_issues_count} issue(s)
                          </Badge>
                        </Link>
                        <Link
                          className="mr-auto"
                          href={`https://github.com/STBoyden/${data.name}/pulls`}
                        >
                          <Badge>
                            <GitBranchIcon className="w-4 h-4 mr-2" /> {prCount}{" "}
                            pull requests(s)
                          </Badge>
                        </Link>
                      </div>
                      <div className="flex gap-2 mt-1">
                        <Badge>
                          <ClockIcon className="w-4 h-4 mr-2" /> Last updated:{" "}
                          {new Date(data.updated_at).toLocaleString()}
                        </Badge>
                        <Badge>
                          <CodeIcon className="w-4 h-4 mr-2" /> Language:{" "}
                          {data.language}
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
