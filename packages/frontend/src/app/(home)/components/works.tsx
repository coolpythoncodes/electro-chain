"use client"

import ImageWithPlaceholder from "@/components/common/image-with-placeholder";
import PageWrapper from "@/components/common/page-wrapper";
import { PlaceHolderImage } from "@/lib/images";
import { useResponsive } from "ahooks";

type Props = {
    protectedVoterVerificationXl: PlaceHolderImage;
    protectedVoterVerification: PlaceHolderImage;
    castVoteXl: PlaceHolderImage;
    castVote: PlaceHolderImage;
    realTimeXl: PlaceHolderImage;
    realTime: PlaceHolderImage;
};

const Works = ({
    protectedVoterVerificationXl,
    protectedVoterVerification,
    castVoteXl,
    castVote,
    realTimeXl,
    realTime,
}: Props) => {
    const responsive = useResponsive();

    return (
        <PageWrapper>
            <section id="works" className="py-8 text-neutral md:py-[56px]">
                <div className="space-y-2 text-center">
                    <h1 className="text-[32px] font-semibold leading-[42px] md:text-[36px] md:leading-[48px]">
                        How ElectroChain works
                    </h1>
                    <p className="text-lg font-normal leading-6">
                        Check-in below reasons why you should use and choose ElectroChain
                    </p>
                </div>

                <div className="space-y-8 py-8 md:py-[56px]">
                    {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /// Protected Voter Verification ///
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                    <div className="flex flex-col gap-x-[59px] gap-y-2 md:flex-row md:items-center">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold leading-10 md:text-[36px] md:leading-[48px]">
                                Protected Voter <span className="block">Verification</span>
                            </h1>
                            <p className="text-lg font-normal leading-6 text-neutral">
                                Voters are securely authenticated using their VIN, NIN, and
                                biometric data.
                            </p>
                        </div>
                        <ImageWithPlaceholder
                            placeholder={
                                responsive?.small
                                    ? protectedVoterVerification
                                    : protectedVoterVerificationXl
                            }
                            className="md:order-first"
                            alt=""
                        />
                    </div>
                    {/* ////////////////////////////////////////////////////////////////////////////
            /// Cast Your Vote ///
            //////////////////////////////////////////////////////////////////////////// */}
                    <div className="flex flex-col gap-x-[59px] gap-y-2 md:flex-row md:items-center md:py-14">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold leading-10 md:text-[36px] md:leading-[48px]">
                                Cast Your Vote
                            </h1>
                            <p className="text-lg font-normal leading-6 text-neutral">
                                Easily select your preferred candidate, and your vote is
                                securely recorded on the blockchain.
                            </p>
                        </div>
                        <ImageWithPlaceholder
                            placeholder={
                                responsive?.small
                                    ? castVote
                                    : castVoteXl
                            }
                            alt=""
                        />
                    </div>
                    {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            /// Secure Real Time Results ///
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                    <div className="flex flex-col gap-x-[59px] gap-y-2 md:flex-row md:items-center md:py-14">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold leading-10 md:text-[36px] md:leading-[48px]">
                                Secure, Real-Time Results
                            </h1>
                            <p className="text-lg font-normal leading-6 text-neutral">
                                Monitor election results live, ensuring complete transparency.
                                Track votes live for full transparency
                            </p>
                        </div>
                        <ImageWithPlaceholder
                            placeholder={
                                responsive?.small
                                    ? realTime
                                    : realTimeXl
                            }
                            className="md:order-first"
                            alt=""
                        />
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
};

export default Works;
