import * as Typography from "@/components/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Head from "next/head";
import Link from "next/link";

export default function AboutMe() {
  return (
    <>
      <Head>
        <title>Samuel Boyden - About Me</title>
        <meta name="description" content="About Samuel Boyden" />
      </Head>

      <span className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl p-2">
        <Typography.Header1>Hi, my name is Sam!</Typography.Header1>
        <Typography.Paragraph>
          I am an aspiring software developer, currently studying a BSc Computer
          Science degree, in my final year (graduating in 2024). I am
          self-taught in programming, and have a strong focus on full-stack,
          with experience using UNIX-based systems (Linux, and MacOS) and
          Windows.
        </Typography.Paragraph>

        <Typography.Header2>Hobbies</Typography.Header2>

        <Accordion type="multiple">
          <AccordionItem value="hobbies-software-development">
            <AccordionTrigger>
              <Typography.Header3>Software Development</Typography.Header3>
            </AccordionTrigger>
            <AccordionContent>
              <Typography.Paragraph>
                First and foremost, my main hobby is software development. I
                have been doing it since I was around 11 years old, starting off
                with my adventures with Redstone in Minecraft, moving on to
                Batch file scripting on my old Windows laptop to make basic{" "}
                {'"'}choose your own
                {'"'} adventure games. This eventually lead me to join a school
                that specialises in teaching computer science and engineering,
                where I eventually learned C# as my first {'"'}real{'"'}{" "}
                lanuage, then Python. In my free time, I learnt how to make
                websites with JavaScript, HTML and CSS, and how to make
                low-level applications with C++.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Before I started university, I took my time to learn Rust - and
                it soon became my primary language of choice to make anything.
                The vast majority of my GitHub projects in the recent years have
                utilised Rust - mainly back-end web servers.
              </Typography.Paragraph>
              <Typography.Paragraph>
                During my first year in university, I joined a startup with a
                friend of mine on the same course, focused on cyber-security. In
                this new startup, I was responsible for two things: developing
                tools for the team, and managing and hosting servers. The
                primary tool that I was in charge of developing was called
                CodeCTRL, which was a utility for code debugging, that would
                receive logs from clients in various languages and help the
                traversal and navigation of stracktraces produced during
                runtime. Unfortunately, the company disbanded at the end of my
                second year, but CodeCTRL is now under my account:{" "}
                <Link
                  href="https://github.com/STBoyden/codectrl"
                  className="underline"
                >
                  here
                </Link>
                . Due to the nature of this project, it resulted in me learning
                and implementing gRPC services, and writing in new languages
                such as Go - which has since become a staple in the languages
                that I commonly use.
              </Typography.Paragraph>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="hobbies-photography">
            <AccordionTrigger>
              <Typography.Header3>Photography</Typography.Header3>
            </AccordionTrigger>
            <AccordionContent>
              <Typography.Paragraph>
                I inherited my love of photography from my dad, who himself
                inherited it from his dad. I am still very much an amateur, with
                little experience in the editing process, but I have recently
                started the effort to learn using Photoshop and Bridge. I don
                {"'"}t currently have a site where my pictures are available, I
                will be sure to update this site with a link when I do.
              </Typography.Paragraph>
              <Typography.Paragraph>
                I started off using a hand-me-down FujiFilm DSLR from my dad,
                which had a <em>whopping 8MP sensor!</em> While not a huge
                sensor, I still managed to take relatively decent pictures with
                it, though nothing particularly special - given the output
                quality. By the time I started my first year at university, my
                dad bought himself a new camera, a Nikon D7500, and gave me his
                then current Nikon D80. While the D80 was already old by this
                time, it was still a huge upgrade from the FujiFilm - this time
                actually allowing me to swap lenses! My usage of the D80
                deepened my love for the hobby, eventually driving me to buy my
                own camera at the beginning of my second year of university, a
                Nikon D5600 - the camera I still use today.
              </Typography.Paragraph>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="hobbies-gaming">
            <AccordionTrigger>
              <Typography.Header3>Gaming</Typography.Header3>
            </AccordionTrigger>
            <AccordionContent>
              <Typography.Paragraph>
                I have loved playing video games since I was a child, starting
                off with the Medal of Honor Breakthrough Warchest discs for
                Windows XP. My brother, my dad, and I would play LAN against
                each other when we could, and usually my dad would win.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Eventually, I was given a Gameboy Advance SP, on which I would
                only play Pokémon Sapphire. In about 2009, I was given a
                Nintendo DS Lite, with Pokémon Diamond, and then eventually
                Platinum. These two games I would play <em>religiously</em> and
                would constantly play them non-stop. I still have the original
                cartridges (as well as some replacements because I had
                temporarily lost them at times). A while after the 3DS and Omega
                Ruby and Alpha Sapphire were released, I was gifted a red 3DS XL
                with Pokémon Alpha Sapphire - which I played constantly when I
                should have been doing homework.
              </Typography.Paragraph>
              <Typography.Paragraph>
                Alongside my love of the Pokémon franchise, I would also love
                Minecraft - like every kid and teen in the early 2010s.
                Minecraft introduced me to the concept of {'"'}programming{'"'}{" "}
                with Redstone, which allowed me to make cool and complex
                structures that could be interacted with using levers, buttons,
                pistons, etc. Minecraft is still one of my favourite games that
                I still play somewhat regularly.
              </Typography.Paragraph>
              <Typography.Paragraph>
                When I got older, I would eventually pick up Skyrim - which to
                this day is still my most played game (in terms of hours played)
                of all time across all the platforms I own it, and all versions
                which have been released. Skyrim would introduce me to the other
                Bethesda-owned franchises such as Fallout. Fallout New Vegas
                stands alongside Skyrim as one of my most favourite, and most
                played games in play time.
              </Typography.Paragraph>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </span>
    </>
  );
}
