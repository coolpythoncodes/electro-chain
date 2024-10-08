'use client';
import BackButton from '@/components/common/back-button';
import PageWrapper from '@/components/common/page-wrapper';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
=import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFetchPolls } from '@/hooks/useFetchPolls';
import { useState } from 'react';
import { useAccount } from '@alchemy/aa-alchemy/react';
import { siteNavigation } from 'next.json';
import { useTotalPages } from '@/hooks/useTotalPages';
import { PollStatus } from '@/types/poll';

const VotePageClient = () => {
  const router = useRouter();
  const handleNavigation = () => router.back();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const { totalPolls, polls } = useFetchPolls(currentPage, limit);
  const totalPages = useTotalPages(totalPolls, limit);
  // useAuthUserOnly({});

  // console.log(allPolls);
  const { address } = useAccount({ type: accountType });

  return (
    <PageWrapper className="space-y-5 pb-12 md:space-y-10">
      <div className="border-b border-[#EAECF0] pb-3 md:pb-6">
        <BackButton onClick={handleNavigation} />
      </div>
      <h1 className="text-base font-bold text-maintext md:text-2xl md:leading-[31px]">
        Elections
      </h1>
      <Card>
        <CardHeader className="font-dmSans text-base font-bold text-maintext md:text-xl md:leading-[26px]">
          Election Categories
        </CardHeader>
        <CardContent>
          {polls !== undefined ? (
            polls.length !== 0 ? (
              <div className="grid gap-x-6 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
                {polls
                  .sort((a, b) => Number(b.id) - Number(a.id))  // Sort polls by id in descending order (latest first)
                  .map((poll) => (
                    <Link href={`/dashboard/${poll.id}`} key={poll.id}>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-0">
                          <p className="font-dmSans text-base font-medium text-maintext">
                            {poll.name}
                          </p>
                          <h1 className="text-md text-sm">
                            {poll.options.length} Candidates
                          </h1>
                          <ChevronRight />
                        </CardHeader>
                        <CardContent>
                          <Badge
                            variant="destructive"
                            className={`ml-auto w-fit ${poll.status === PollStatus.OPEN ? 'bg-[green] opacity-75  border-[2px]' : 'bg-[red] opacity-75  border-[2px]'}`}
                          >
                            {poll.status}
                          </Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}

              </div>
            ) : (
              <div>No Polls Found</div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </CardContent>
      </Card>
    </PageWrapper>
  );
};

export default VotePageClient;
