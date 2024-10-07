import { useReadContract } from 'wagmi';
import { maciWrapper } from '@/utils/chain';

export const useFetchPoll = (id: bigint | undefined) => {

    const result = useReadContract({
        abi: maciWrapper?.abi,
        address: maciWrapper?.address as `0x${string}`,
        functionName: 'fetchPoll',
        args: id ? [id] : undefined,
    });

    console.log(result.data);

    // Return an object with data, error, and isLoading properties
    return {
        data: id && maciWrapper ? result.data : undefined,
        error: result.error,
        isLoading: result.isLoading || !id || !maciWrapper,
    };
};
