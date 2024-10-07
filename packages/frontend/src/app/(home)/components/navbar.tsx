"use client";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import PageWrapper from "@/components/common/page-wrapper";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useDisclosure from "@/hooks/use-disclosure.hook";
import { cn } from "@/lib/utils";
import logo from "@/public/logo.svg";
import { useResponsive } from "ahooks";
import { Menu } from "lucide-react";
import { siteNavigation } from "next.json";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const Navbar = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const responsive = useResponsive();
  useEffect(() => {
    if (responsive?.middle) {
      onClose();
    }
  }, [responsive?.middle]);

  return (
    <header className="flex h-[100px] items-center font-montserrat xl:h-24">
      <PageWrapper className="flex items-center justify-between">
        <Link href="/">
          <Image src={logo as StaticImageData} alt="electrochain logo" />
        </Link>
        <nav className="hidden space-x-6 text-base font-medium text-[#696F8C] md:flex">
          {siteNavigation?.navlinks?.map((navlink, index) => (
            <Link
              key={`navlinks-${index}`}
              href={navlink?.link}
              className={cn({
                "text-primary": navlink?.label.toLowerCase() === "home",
              })}
            >
              {navlink?.label}
            </Link>
          ))}
        </nav>
        <Link
          href={siteNavigation?.authRoutes?.verify}
          className="hidden h-12 w-[212px] items-center justify-center rounded bg-primary text-white md:flex"
        >
          User Authentication
        </Link>

        <div className="xl:hidden">
          <Sheet open={isOpen} onOpenChange={onToggle}>
            <SheetTrigger>
              <Menu onClick={onOpen} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="mt-6">
                  <Image
                    src={logo as StaticImageData}
                    alt="electrochain logo"
                  />
                </SheetTitle>
                <SheetDescription className="mr-auto">
                  <nav className="flex flex-col items-start gap-y-6">
                    {siteNavigation?.navlinks?.map((navLink, index) => (
                      <Link
                        href={navLink?.link}
                        key={`navlinks-${index}`}
                        className={cn(
                          "font-montserrat text-base font-normal capitalize",
                          {
                            "text-primary": navLink?.label.toLowerCase() === "home",
                          },
                        )}
                      >
                        {navLink?.label}
                      </Link>
                    ))}
                  </nav>
                  <Link
                    href={siteNavigation?.authRoutes?.verify}
                    className="mt-6 flex h-[38px] w-[171px] items-center justify-center rounded bg-primary text-white"
                  >
                    User Authentication
                  </Link>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </PageWrapper>
    </header>
  );
};

export default Navbar;
