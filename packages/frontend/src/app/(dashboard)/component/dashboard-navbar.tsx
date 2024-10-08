"use client";

import { Icons } from "@/components/common/icon";
import IconElement from "@/components/common/icon-element";
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
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const responsive = useResponsive();
  useEffect(() => {
    if (responsive?.middle) {
      onClose();
    }
  }, [responsive?.middle]);
  return (
    <div>
      <PageWrapper>
        <div className="hidden h-[90px] items-center justify-between rounded-[8px] border border-[#D7D9E4] bg-[#FAFCFF] px-10 shadow-sm xl:flex">
          <h1 className="font-montserrat text-2xl font-semibold leading-[10px] text-neutral">
            Dashboard
          </h1>
          <div className="flex items-center gap-x-2 p-3">
            <p className="text-sm font-normal leading-4 text-neutral">
              Olayinka Babalola
            </p>
            <div className="h-5 w-5 rounded-full bg-primary" />
          </div>
        </div>
      </PageWrapper>
      <header className="flex h-[100px] items-center xl:hidden">
        <PageWrapper className="flex items-center justify-between">
          <Link href={siteNavigation?.main?.dashboard}>
            <Image src={logo as StaticImageData} alt="electrochain logo" />
          </Link>

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
                  <h1 className="font-montserrat text-base font-semibold text-neutral">
                    Dashboard
                  </h1>
                  <nav className="mt-6">
                    <ul className="flex flex-col gap-y-4">
                      {siteNavigation?.dashboardNavLinks?.map(
                        (navLink, index) => (
                          <li
                            key={`navlinks-${index}`}
                            className={cn("flex items-center space-x-4", {
                              "text-primary": pathname
                                .toLowerCase()
                                .includes(navLink?.link.toLowerCase()),
                            })}
                          >
                            <IconElement
                              iconName={navLink?.label as keyof typeof Icons}
                            />
                            <Link
                              href={navLink?.link}
                              className="font-montserrat text-base font-normal capitalize"
                            >
                              {navLink?.label}
                            </Link>
                          </li>
                        ),
                      )}
                    </ul>
                  </nav>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </PageWrapper>
      </header>
    </div>
  );
};

export default DashboardNavbar;
