import { ImageWithFallback } from "@/components/image-with-fallback";
import * as Typography from "@/components/typography";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWindowSize } from "@uidotdev/usehooks";
import { PersonStandingIcon } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

function PortraitPicture({
  windowWidth,
  className,
}: {
  windowWidth: number;
  className?: string;
}) {
  return (
    <ImageWithFallback
      src="https://avatars.githubusercontent.com/u/25185976"
      alt="Samuel Boyden's GitHub profile picture"
      width={windowWidth >= 768 ? 256 : 75}
      height={windowWidth >= 768 ? 256 : 75}
      className={`min-h-[75px] min-w-[75px] flex-grow rounded-full ${
        className ?? ""
      }`}
    />
  );
}

export default function Home() {
  let { width: windowWidth } = useWindowSize();
  if (windowWidth === null) {
    windowWidth = 0;
  }

  return (
    <>
      <Head>
        <title>Samuel Boyden - Home</title>
        <meta
          name="description"
          content="Samuel Boyden's portfolio. Generated by create-t3-app."
        />
      </Head>

      <Card className="w-[400px] shrink lg:w-[768px]">
        <CardHeader>
          <CardTitle>A brief bit about me...</CardTitle>
        </CardHeader>
        <CardContent className="flex shrink flex-col items-center lg:flex-row">
          {windowWidth >= 1024 && (
            <PortraitPicture
              className="my-auto max-h-[256px]"
              windowWidth={windowWidth}
            />
          )}
          {windowWidth < 1024 && (
            <AspectRatio
              ratio={1 / 1}
              className="m-auto flex max-h-[256px] min-h-[75px] min-w-[75px] max-w-[256px] items-center justify-center lg:m-0"
            >
              <PortraitPicture windowWidth={windowWidth} />
            </AspectRatio>
          )}

          <span className="lg:ml-2 lg:border-l-2 lg:pl-2">
            <Typography.Paragraph>
              <div className="italic">
                Note: This site is a little outdated - last updated 2 years 
                ago. I will be updating it soon to reflect latest changes
                soon.
              </div>
            </Typography.Paragraph>
            <Typography.Paragraph>
              I am an aspiring software developer, currently studying a BSc
              Computer Science degree, in my final year. I am self-taught in
              programming, and have a strong focus on full-stack, with
              experience using UNIX-based systems (Linux, and MacOS) and
              Windows.
            </Typography.Paragraph>
            <Typography.Paragraph>
              This website functions as a portfolio website for future
              employment (please see the{" "}
              <Link
                href="/projects"
                className="underline hover:font-semibold hover:text-secondary-foreground hover:italic"
              >
                projects page
              </Link>
              ), and to practice my front-end design skills. This website was
              developed using NextJS, shadcn-ui components, and TailwindCSS.
            </Typography.Paragraph>
          </span>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Link href="/about-me" passHref>
            <Button size="lg">
              <PersonStandingIcon className="mr-2 ml-[-0.5rem] h-4 w-4" /> About
              Me
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
