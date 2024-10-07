"use client";

import ImageWithPlaceholder from "@/components/common/image-with-placeholder";
import PageWrapper from "@/components/common/page-wrapper";
import { PlaceHolderImage } from "@/lib/images";
import { responsiveConfig } from "@/lib/utils";
import { configResponsive, useResponsive } from "ahooks";
import { siteNavigation } from "next.json";
import smallCircles from "@/public/small__circles.svg"

import Link from "next/link";
import Image from "next/image";

type Props = {
  heroSmImage: PlaceHolderImage;
  heroLgImage: PlaceHolderImage;
};

configResponsive(responsiveConfig);

const Hero = ({ heroSmImage, heroLgImage }: Props) => {
  const responsive = useResponsive();

  return (
    <section>
      <PageWrapper className="space-y-6">
        <div className="space-y-6">
          <div className="spacing-y-2 text-center text-neutral">
            <h1 className="max-w-[734px] text-[32px] font-extrabold leading-[42px] md:mx-auto md:text-[44px] md:leading-[54px]">
              <span className="text-primary">Vote Securely</span> with
              Blockchain and ZK Technology
            </h1>
            <p className="max-w-[400px] text-sm font-normal md:mx-auto md:text-lg md:leading-6">
              Ensure transparent, tamper-resistant, and user-friendly voting for
              all.
            </p>
          </div>
          <div className="flex items-center justify-center gap-x-6">
            <Link
              href={siteNavigation?.authRoutes?.verify}
              className="flex h-12 w-[140px] items-center justify-center rounded bg-primary text-white"
            >
              Get started
            </Link>
            <Link
              href="#learn-more"
              scroll={true}
              className="flex h-12 w-[140px] items-center justify-center rounded text-primary border border-primary"
            >
              Learn more
            </Link>

          </div>
        </div>

        <div className="relative">
        <ImageWithPlaceholder
          placeholder={responsive?.small ? heroSmImage : heroLgImage}
          className="mx-auto"
          alt=""
          // @ts-expect-error unknown error
          priority
        />
        <Image src={smallCircles} alt="" className="absolute top-0" />
        </div>
      </PageWrapper>
    </section>
  );
};

export default Hero;
