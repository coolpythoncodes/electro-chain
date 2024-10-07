import { Poll, PollStatus, RawPoll } from '@/types/poll';
import { maciWrapper } from '@/utils/chain';
import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';

export function getPollStatus(poll: RawPoll) {
    const now = Math.round(new Date().getTime() / 1000);

    if (poll.startTime > BigInt(now)) {
        return PollStatus.NOT_STARTED;
    }
    if (poll.endTime > BigInt(now)) {
        return PollStatus.OPEN;
    }

    if (!poll.tallyJsonCID) {
        return PollStatus.CLOSED;
    }
    return PollStatus.RESULT_COMPUTED;
}

export const useFetchPolls = (currentPage = 1, limit = 10, reversed = true) => {
    const [polls, setPolls] = useState<Poll[]>();
    const { data: totalPolls, refetch: refetchTotalPolls } = useReadContract({
        abi: maciWrapper?.abi,
        address: maciWrapper?.address as `0x${string}`,
        functionName: 'nextPollId',
    });

    const { data: rawPolls, refetch: refetchPolls } = useReadContract({
        abi: maciWrapper?.abi,
        address: maciWrapper?.address as `0x${string}`,
        functionName: 'fetchPolls',
        args: [BigInt(currentPage), BigInt(limit), reversed],
    });

    const [lastTimer, setLastTimer] = useState<NodeJS.Timeout | undefined>();

    useEffect(() => {
        if (!rawPolls) {
            return;
        }

        if (lastTimer) {
            clearInterval(lastTimer);
        }

        const interval = setInterval(() => {
            // @ts-expect-error unknown error
            const _polls: Poll[] = rawPolls?.map((rawPoll: RawPoll) => ({
                ...rawPoll,
                status: getPollStatus(rawPoll),
            }));

            setPolls(_polls);
        }, 1000);

        setLastTimer(interval);

        return () => {
            clearInterval(interval);
        };
    }, [rawPolls]);

    async function refetch() {
        await refetchTotalPolls().catch().then();
        await refetchPolls().catch().then();
    }

    return { totalPolls: Number(totalPolls ?? 0), polls, refetch };
};
