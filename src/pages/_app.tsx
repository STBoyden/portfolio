import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ui/theme-mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import Head from "next/head";
import { Home, Menu, PersonStanding, TerminalSquare } from "lucide-react";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

function NavItems({ isVertical = false }) {
  return (
    <NavigationMenuList
      className={isVertical ? "min-w-full flex-1 flex-col" : ""}
    >
      <NavigationMenuItem>
        <Link href="/" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <Link href="/projects" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <TerminalSquare className="mr-2 h-4 w-4" />
            Projects
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <Link href="/about-me" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <PersonStanding className="mr-2 h-4 w-4" />
            About Me
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}

const MyApp: AppType = ({ Component, pageProps }) => {
  let { width: windowWidth } = useWindowSize();
  if (windowWidth === null) {
    windowWidth = 0;
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        enableColorScheme
      >
        <>
          <div className="mx-auto flex min-w-full flex-row items-center p-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="visible mr-2 flex md:invisible md:hidden"
                  size="icon"
                  aria-hidden={windowWidth > 640}
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="min-h-full grow">
                <SheetHeader>Menu</SheetHeader>
                <NavigationMenu
                  className="min-h-full min-w-full grow flex-col"
                  orientation="vertical"
                >
                  <NavItems isVertical={true} />
                </NavigationMenu>
              </SheetContent>
            </Sheet>

            <h1 className="m-0 p-0 text-xl">
              <Link href="/">Samuel Boyden</Link>
            </h1>

            <NavigationMenu
              className="invisible hidden md:visible md:mx-auto md:flex"
              aria-hidden={windowWidth <= 640} // if window inner width is 640 or below, then screenreaders should not attempt to read this element
            >
              <NavItems />
            </NavigationMenu>

            <div className="ml-auto md:ml-0">
              <ModeToggle />
            </div>
          </div>
          <Separator />
          <main className="flex min-h-screen flex-col items-center justify-center">
            <Component {...pageProps} />
          </main>
        </>
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
