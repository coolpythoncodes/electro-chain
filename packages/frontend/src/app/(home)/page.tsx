/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Icons } from "@/components/common/icon";
import IconElement from "@/components/common/icon-element";
import PageWrapper from "@/components/common/page-wrapper";
import { fetchImagesWithPlaceholder } from "@/lib/images";
import { siteContent } from "next.json";
import { homePageImages } from "./components/extras";
import Hero from "./components/hero";
import Works from "./components/works";

const HomePage = async () => {
  const imageWithPlaceholder = await fetchImagesWithPlaceholder(homePageImages);

  return (
    <main className="font-montserrat md:pt-14">
      <Hero
        heroSmImage={imageWithPlaceholder.heroImage!}
        heroLgImage={imageWithPlaceholder.heroImageXl!}
      />
      <div className="flex h-[88px] items-center justify-center bg-primary text-white">
        <p className="text-lg leading-6">Empowering Fair Elections</p>
      </div>

      <PageWrapper>
        <section id="learn-more" className="py-8 md:py-[56px]">
          <div className="space-y-2 text-center text-neutral">
            <h1 className="text-[32px] font-semibold leading-[42px] md:text-[36px] md:leading-[48px]">
              Why Choose ElectroChain?
            </h1>
            <p className="max-w-[503px] text-lg font-normal leading-6 md:mx-auto">
              Check-in below reasons why you should use and choose ElectroChain
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-6 md:mx-auto md:mt-[56px] md:flex-row">
            {siteContent?.features?.map((item, index) => (
              <div
                key={`electrochain-features-${index}`}
                className="flex flex-col items-center gap-y-6 py-4"
              >
                <IconElement iconName={item?.title as keyof typeof Icons} />
                <div className="space-y-1 text-center">
                  <p className="text-lg font-semibold capitalize leading-6 text-neutral">
                    {item?.title}
                  </p>
                  <p className="text text-lg font-normal leading-6">
                    {item?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </PageWrapper>

      <Works
        protectedVoterVerificationXl={
          imageWithPlaceholder.protectedVoterVerificationXl!
        }
        castVoteXl={imageWithPlaceholder.castVoteXl!}
        castVote={imageWithPlaceholder.castVote!}
        realTimeXl={imageWithPlaceholder.realTimeXl!}
        realTime={imageWithPlaceholder.realTime!}
        protectedVoterVerification={
          imageWithPlaceholder.protectedVoterVerification!
        }
      />
    </main>
  );
};

export default HomePage;
