"use client";

import PageWrapper from "@/components/common/page-wrapper";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { siteNavigation } from "next.json";
// import CandidatesTable from "./component/candidatesTable";
// import VoteCandidateClient from "./component/vote-candidate-client";
// import { useParams } from "next/navigation";
import PartyCandidate from "./component/party-candidate";

const DashboardById = () => {
  const params = useParams<{ id: string }>();
  console.log(params);

  return (
    <PageWrapper className="font-montserrat md:pt-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={siteNavigation?.main?.dashboard}>
              Election Categories
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Candidates</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-[22px] mt-4 flex flex-col gap-y-[27px] xl:mt-8 xl:flex-row-reverse xl:items-center xl:justify-between">
        <div className="relative w-full md:w-[344px]">
          <Input
            className="shadow-xs h-12 rounded border-[#D7D9E4] pl-9 text-sm font-normal leading-4 text-[#696f8c]"
            placeholder="Search Candidate, Parties"
          />
          <Search className="absolute left-0 top-0 m-4 h-4 w-4 text-muted-foreground" />
        </div>
        {/* <h1 className="text-base font-medium leading-[18px] md:text-lg">
          Presidential Candidates
        </h1> */}
      </div>

      {/* <CandidatesTable /> */}
      {/* <VoteCandidateClient id={BigInt(params.id)} />; */}
      <PartyCandidate id={BigInt(params.id)} />
    </PageWrapper>
  );
};

export default DashboardById;

