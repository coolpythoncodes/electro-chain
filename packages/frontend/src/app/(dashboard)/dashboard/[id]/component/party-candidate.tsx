'use client';

import PageWrapper from '@/components/common/page-wrapper';
// import { useFetchPoll } from '@/hooks/useFetchPoll';
import { useAuthContext } from '@/context/AuthContext';
import { getPollStatus } from '@/hooks/useFetchPolls';
import { PollStatus, PollType } from '@/types/poll';
import { genRandomSalt } from 'maci-crypto';
import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
// import PollAbi from '@/abi/Poll';
import {
    accountType,
    gasManagerConfig,
    accountClientOptions as opts,
} from '@/app/config/config';
import {
    useAccount,
    useSendUserOperation,
    useSmartAccountClient,
} from '@alchemy/aa-alchemy/react';
import PollAbi from 'contracts/Poll';
import { Keypair, PCommand, PubKey } from 'maci-domainobjs';
import { encodeFunctionData } from 'viem';
// import { OpStatus } from '@/app/(auth)/register/components/op-status';
import { useFetchPoll } from '@/hooks/useFetchPoll';
import { maciWrapper } from '@/utils/chain';
import { notification } from '@/utils/notification';
import { getDataFromPinata } from '@/utils/pinata';
import { SendUserOperationResult } from '@alchemy/aa-core';
import VotingComponent from './VotingComponent';
import ResultsTable from './result-table';


interface PollParams {
    partyImage: string;
    President: string;
    Pimage: string;
    'Vice President': string;
    VpImage: string;
    castVote: Function;
    sendUserOperationResult: SendUserOperationResult | undefined;
    isSendingUserOperation: boolean;
    isSendUserOperationError: Error | null;
}

type ResultItem = {
    candidate: string;
    votes: number;
};

const PartyCandidate = ({ id }: { id: bigint }) => {
    const { data: poll, error, isLoading } = useFetchPoll(id);
    const [pollType, setPollType] = useState(PollType.NOT_SELECTED);

    const { keypair } = useAuthContext();

    const [votes, setVotes] = useState<{ index: number; votes: number }[]>([]);

    const [params, setParams] = useState<PollParams[]>([]);

    const [isVotesInvalid, setIsVotesInvalid] = useState<Record<number, boolean>>(
        {}
    );
    const isAnyInvalid = Object.values(isVotesInvalid).some((v) => v);
    const { address } = useAccount({ type: accountType });
    // const { stateIndex } = useAuthContext();
    const [result, setResult] = useState<
        { candidate: string; votes: number }[] | null
    >(null);
    const [status, setStatus] = useState<PollStatus>();


    const { data: stateIndex } = useReadContract({
        abi: maciWrapper?.abi,
        address: maciWrapper?.address as `0x${string}`,
        functionName: 'voterToStateIndex',
        args: [(address as `0x${string}`) ?? null],
    });

    async function getData(ipfs: string) {
        try {
            const response = await fetch(ipfs);
            const jsonData = await response.json();
            console.log(jsonData);
            return jsonData;
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    }
    useEffect(() => {
        // @ts-expect-error unknown error
        if (!poll || !poll.metadata) {
            return;
        }
        try {
            // @ts-expect-error unknown error
            const { pollType } = JSON.parse(poll.metadata);
            setPollType(pollType);
            console.log(`Poll Type is given as ${pollType}`);
        } catch (err) {
            console.log('err', err);
        }
        // @ts-expect-error unknown error
        if (poll.tallyJsonCID) {
            (async () => {
                try {
                    const {
                        results: { tally },
                        // @ts-expect-error unknown error
                    } = await getDataFromPinata(poll.tallyJsonCID);
                    // @ts-expect-error unknown error
                    if (poll.options.length > tally.length) {
                        throw new Error('Invalid tally data');
                    }
                    const tallyCounts: number[] = tally
                        .map((v: string) => Number(v))
                        // @ts-expect-error unknown error
                        .slice(0, poll.options.length);
                    const result = [];
                    // @ts-expect-error unknown error
                    for (let i = 0; i < poll.options.length; i++) {
                        // @ts-expect-error unknown error
                        const ipfs = poll.options[i];
                        const data = await getData(ipfs)
                        console.log(data);
                        const candidate = data.President

                        const votes = tallyCounts[i];
                        result.push({ candidate, votes });
                    }
                    result.sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0));
                    // @ts-expect-error unknown error
                    setResult(result)
                    console.log('data', result);
                } catch (err) {
                    console.log('err', err);
                }
            })();
        }

        //@typescript-eslint/no-misused-promises
        const statusUpdateInterval = setInterval(async () => {
            // @ts-expect-error unknown error
            setStatus(getPollStatus(poll));
        }, 1000);
        return () => {
            clearInterval(statusUpdateInterval);
        };
    }, [poll]);

    const { data: coordinatorPubKeyResult } = useReadContract({
        abi: PollAbi,
        // @ts-expect-error unknown error
        address: poll?.pollContracts.poll,
        functionName: 'coordinatorPubKey',
    });

    const [coordinatorPubKey, setCoordinatorPubKey] = useState<PubKey>();

    useEffect(() => {
        if (!coordinatorPubKeyResult) {
            console.log('CoordinatorPubKey not given');
            return;
        }

        console.log(coordinatorPubKeyResult);

        const coordinatorPubKey_ = new PubKey([
            BigInt((coordinatorPubKeyResult as any)[0].toString()),
            BigInt((coordinatorPubKeyResult as any)[1].toString()),
        ]);

        setCoordinatorPubKey(coordinatorPubKey_);
    }, [coordinatorPubKeyResult]);

    // [!region Cast Vote, Generate And EncKeyPair functionality]

    {
        /** Cast Vote */
    }

    const { client } = useSmartAccountClient({
        type: accountType,
        gasManagerConfig,
        opts,
    });

    const {
        sendUserOperation,
        sendUserOperationResult,
        isSendingUserOperation,
        error: isSendUserOperationError,
    } = useSendUserOperation({
        client,
        waitForTxn: true,
    });


    const castVote = async (candidateIndex: number) => {
        try {
            if (!poll || !coordinatorPubKey || !keypair) {
                notification.error('Poll or CoordinatorPubKey or Keypair isnt specified');
                return;
            }

            if (!address) {
                notification.error("An error occured address isn't specified");
                return;
            }

            // check if the poll is closed
            if (status !== PollStatus.OPEN) {
                notification.error('Voting is closed for this poll');
                return;
            }

            if (!stateIndex) {
                notification.error('State Index is missing');
                return;
            }

            const votesToMessage = getMessageAndEncKeyPair(
                BigInt(Number(stateIndex)),
                // @ts-expect-error unknown error
                poll.id,
                BigInt(candidateIndex),
                BigInt(1),
                BigInt(1),
                coordinatorPubKey,
                keypair
            )
            // @ts-expect-error unknown error
            const target = poll?.pollContracts.poll;
            const value = BigInt(0);
            const encodeData = encodeFunctionData({
                abi: PollAbi,
                functionName: 'publishMessage',
                args: [
                    votesToMessage?.message.asContractParam() as unknown as {
                        msgType: bigint;
                        data: readonly [
                            bigint,
                            bigint,
                            bigint,
                            bigint,
                            bigint,
                            bigint,
                            bigint,
                            bigint,
                            bigint,
                            bigint,
                        ];
                    },
                    votesToMessage?.encKeyPair.pubKey.asContractParam() as unknown as {
                        x: bigint;
                        y: bigint;
                    },
                ],
            });

            console.log(encodeData);


            sendUserOperation({
                uo: { target, data: encodeData, value },
            });

            console.log('sent operation .....');



            if (sendUserOperationResult) {
                notification.error('Vote Casted Successfully');
                console.log(sendUserOperationResult);

            } else if (isSendUserOperationError) {
                notification.error('An error occured');
                console.log(isSendUserOperationError);
            }
        } catch (error) {
            console.error(error);

        }

    }


    {
        /** Generate And EncKeyPair */
    }

    function getMessageAndEncKeyPair(
        stateIndex: bigint,
        pollIndex: bigint,
        candidateIndex: bigint,
        weight: bigint,
        nonce: bigint,
        coordinatorPubKey: PubKey,
        keypair: Keypair
    ) {
        const command: PCommand = new PCommand(
            stateIndex,
            keypair.pubKey,
            candidateIndex,
            weight,
            nonce,
            pollIndex,
            genRandomSalt()
        );

        const signature = command.sign(keypair.privKey);

        const encKeyPair = new Keypair();

        const message = command.encrypt(
            signature,
            Keypair.genEcdhSharedKey(encKeyPair.privKey, coordinatorPubKey)
        );

        return { message, encKeyPair };
    }



    console.log(poll);



    async function logJSONData() {
        // @ts-expect-error unknown error
        if (poll && poll.options) {
            const newData = await Promise.all(
                // @ts-expect-error unknown error
                poll.options.map(async (opt) => {
                    try {
                        const response = await fetch(opt);
                        // @ts-expect-error unknown error
                        const jsonData: PollOption = await response.json();
                        console.log(jsonData);
                        return jsonData;
                    } catch (error) {
                        console.error("Error fetching data:", error);
                        return null;
                    }
                })
            );

            // @ts-expect-error unknown error
            setParams((previousArray) => [...previousArray, ...newData.filter((item): item is PollOption => item !== null)]);
        }

        console.log(`Param is given as`, params);

    }

    useEffect(() => {

        // (async () => {
        //     await logJSONData();
        // })
        logJSONData();
    }, [poll])


    if (isLoading) return <div>Loading....</div>;

    if (error) return <div>Poll not found</div>;

    return (
        <PageWrapper className="space-y-8 pb-12">
            {result && <ResultsTable result={result} />}
            {/* <div className="flex items-center justify-between">
                <div className="space-y-2 font-dmSans">
                    <h1 className="text-lg font-bold text-maintext md:text-2xl md:leading-[31px]">
                        Party
                    </h1>
                    <p className="text-subtext text-base font-normal">
                        Select Party To Continue
                    </p>
                </div>
            </div> */}
            {/* <div className='space-y-2 font-dmSans w-full flex items-center justify-between space-between'>
                <h3>Party Name</h3>
                <h3>Party Acronym</h3>
            </div> */}

            {/* <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {params.map((item, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-2">
                            <img src={item.partyImage} alt="Party Logo" className="w-24 h-24 object-contain mb-2" />
                            <h3 className="font-bold text-lg">{item.President}</h3>
                            <p className="text-sm text-gray-600">Vice President: {item['Vice President']}</p>
                            <div className="flex space-x-2 mt-2">
                                <img src={item.Pimage} alt={item.President} className="w-12 h-12 rounded-full object-cover" />
                                <img src={item.VpImage} alt={item['Vice President']} className="w-12 h-12 rounded-full object-cover" />
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* @ts-expect-error unknown error */}
            <VotingComponent params={params} castVote={castVote} sendUserOperationResult={sendUserOperationResult} isSendingUserOperation={isSendingUserOperation} isSendUserOperationError={isSendUserOperationError} />

            {/* <div>
                <button
                    onClick={logJSONData}
                    disabled={!true}
                    className="w-full rounded-xl border-2 border-accent bg-accent py-3 text-center text-lg font-bold hover:border-black"
                >
                    {true ? 'Vote Now' : 'Voting Closed'}{' '}
                </button>
            </div> */}

        </PageWrapper>
    );
};

export default PartyCandidate;
