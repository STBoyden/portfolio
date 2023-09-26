import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/theme-mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
    >
      <>
        <Head>
          <title>Samuel Boyden</title>
          <meta
            name="description"
            content="Samuel Boyden's portfolio. Generated by create-t3-app."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ModeToggle />
        <div className="mx-auto flex min-w-full flex-row items-center p-2 last:justify-end">
          <h1 className="m-0 text-2xl">
            <Link href="/">Samuel Boyden</Link>
          </h1>
          <Separator orientation="vertical" className="mx-2 min-h-full" />
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* <div className="">
            <ModeToggle />
          </div> */}
        </div>
        <Separator />
        <main className="flex min-h-screen flex-col items-center justify-center"></main>
      </>
    </ThemeProvider>
  );
}
