"use client";

import { Icons } from "@/components/common/icon";
import IconElement from "@/components/common/icon-element";
import { cn } from "@/lib/utils";
import logo from "@/public/transparent-logo.svg";
import { siteNavigation } from "next.json";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden min-h-full rounded-tr-[24px] bg-primary pt-12 xl:block">
      <Link
        href={siteNavigation?.main?.dashboard}
        className="mx-auto block w-fit"
      >
        <Image src={logo} alt="" />
      </Link>
      <div className="mt-[72px]">
        <ul>
          {siteNavigation?.dashboardNavLinks?.map((item, index) => (
            <li
              key={`sidebar-links-${index}`}
              className={cn(
                "flex h-[60px] items-center justify-center gap-x-4 capitalize text-white",
                {
                  "bg-white text-neutral": pathname
                    .toLowerCase()
                    .includes(item?.link.toLowerCase()),
                },
              )}
            >
              <IconElement iconName={item?.label as keyof typeof Icons} />
              <Link
                href={item?.link}
                className="font-montserrat text-sm font-medium leading-4"
              >
                {item?.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
