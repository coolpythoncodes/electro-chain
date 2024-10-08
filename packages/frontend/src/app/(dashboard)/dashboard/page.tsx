import PageWrapper from "@/components/common/page-wrapper";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
// import ElectionTable from "./component/election-table";
import VotePageClient from "./component/vote-page-client.tsx";

const DashboardPage = () => {
    return (
        <main className="font-montserrat">
            <PageWrapper>
                <div className="mb-[22px] flex flex-col gap-y-[27px] xl:mt-8 xl:flex-row-reverse xl:items-center xl:justify-between">
                    <div className="relative w-full md:w-[344px]">
                        <Input
                            className="shadow-xs h-12 rounded border-[#D7D9E4] pl-9 text-sm font-normal leading-4 text-[#696f8c]"
                            placeholder="Search election category"
                        />
                        <Search className="absolute left-0 top-0 m-4 h-4 w-4 text-muted-foreground" />
                    </div>
                    <h1 className="text-base font-medium leading-[18px] md:text-lg">
                        Election Categories
                    </h1>
                </div>

                {/* <ElectionTable /> */}
                <VotePageClient />

            </PageWrapper>
        </main>
    );
};

export default DashboardPage;
