import "@/styles/globals.css";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/theme-mode-toggle";
import { api } from "@/utils/api";
import { useWindowSize } from "@uidotdev/usehooks";
import { Analytics } from "@vercel/analytics/react";
import {
  Feather,
  Github,
  Home,
  Menu,
  PersonStanding,
  TerminalSquare,
} from "lucide-react";
import { ThemeProvider } from "next-themes";
import { type AppType } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

function NavItem({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref {...props}>
        <NavigationMenuLink
          className={navigationMenuTriggerStyle()}
          active={isActive}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}

function NavItems({ isVertical = false }) {
  return (
    <NavigationMenuList
      className={isVertical ? "min-w-full flex-1 flex-col" : ""}
    >
      <NavItem href="/">
        <Home className="mr-2 h-4 w-4" />
        Home
      </NavItem>

      <NavItem href="/projects">
        <TerminalSquare className="mr-2 h-4 w-4" />
        Projects
      </NavItem>

      <NavItem href="/about-me">
        <PersonStanding className="mr-2 h-4 w-4" />
        About Me
      </NavItem>

      <NavItem href="https://blog.stboyden.com">
        <Feather className="mr-2 h-4 w-4" />
        Blog
      </NavItem>
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
              <Link href="https://github.com/STBoyden" passHref>
                <Button size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
              <ModeToggle />
            </div>
          </div>
          <Separator />
          <main className="flex min-h-screen flex-col items-center justify-center">
            <Component {...pageProps} />
            <Analytics />
          </main>
        </>
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
