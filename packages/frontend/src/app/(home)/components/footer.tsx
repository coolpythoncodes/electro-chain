/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import PageWrapper from "@/components/common/page-wrapper";
import logo from "@/public/transparent-logo.svg";
import { siteNavigation } from "next.json";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0A0F29] py-8 font-montserrat md:h-[74px]">
      <PageWrapper className="flex flex-col items-center gap-y-5 md:flex-row md:justify-between">
        <Image src={logo as StaticImageData} alt="logo" />
        <ul className="flex flex-col gap-x-6 gap-y-4 text-center md:flex-row">
          {siteNavigation?.footerLinks?.map((item, index) => (
            <li key={`footerLinks-${index}`}>
              <Link
                href={item?.url}
                className="text-xs font-medium leading-[14px] text-white"
              >
                {item?.text}
              </Link>
            </li>
          ))}
        </ul>
      </PageWrapper>
    </footer>
  );
};

export default Footer;
