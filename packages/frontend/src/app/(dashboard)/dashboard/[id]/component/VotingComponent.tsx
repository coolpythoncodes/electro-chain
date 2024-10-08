
import { OpStatus } from '@/app/(home)/register/components/op-status';
import { SendUserOperationResult } from '@alchemy/aa-core';
import { log } from 'console';
import { CheckCircle, Vote } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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

// @ts-expect-error unknown error
const VotingComponent: React.FC<{ params: PollParams[] }> = ({ params, castVote, sendUserOperationResult, isSendingUserOperation, isSendUserOperationError }) => {

    const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [voteConfirmed, setVoteConfirmed] = useState(false);
    const [candidateIndex, setCandidateIndex] = useState<number>(0)

    const handleSelectCandidate = (index: number) => {
        setSelectedCandidate(index);
    };

    const handleCastVote = (index: number) => {
        setCandidateIndex(index)
        if (selectedCandidate !== null) {
            setShowConfirmation(true);
        }
    };

    const handleConfirmVote = async () => {
        // Here you would typically send the vote to your backend
        await castVote(candidateIndex);
        setVoteConfirmed(true);
        setShowConfirmation(false);
    };

    const handleCancelVote = () => {
        setShowConfirmation(false);
    };




    if (voteConfirmed) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-green-50">
                {sendUserOperationResult && <><CheckCircle className="text-green-500 w-16 h-16 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Thank You for Voting!</h2>
                    <p className="text-center text-gray-600">Your vote has been successfully recorded.</p></>}

                <OpStatus
                    sendUserOperationResult={sendUserOperationResult}
                    isSendingUserOperation={isSendingUserOperation}
                    isSendUserOperationError={isSendUserOperationError}
                />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Cast Your Vote</h1>
            <p className="text-center mb-8 text-gray-600">Select your preferred candidate to cast your vote.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {params.map((item, index) => (
                    <div
                        key={index}
                        className={`bg-white shadow-md rounded-lg p-6 flex flex-col items-center space-y-4 cursor-pointer transition-all duration-200 ${selectedCandidate === index ? 'ring-4 ring-blue-500' : 'hover:shadow-lg'
                            }`}
                        onClick={() => handleSelectCandidate(index)}
                    >
                        <img src={item.partyImage} alt="Party Logo" className="w-24 h-24 object-contain mb-2" />
                        <h3 className="font-bold text-xl">{item.President}</h3>
                        <p className="text-sm text-gray-600">Vice President: {item['Vice President']}</p>
                        <div className="flex space-x-4 mt-2">
                            <img src={item.Pimage} alt={item.President} className="w-16 h-16 rounded-full object-cover" />
                            <img src={item.VpImage} alt={item['Vice President']} className="w-16 h-16 rounded-full object-cover" />
                        </div>
                        {selectedCandidate === index && (
                            <button
                                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCastVote(index);
                                }}
                            >
                                <Vote size={20} />
                                <span>Cast Vote</span>
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Confirm Your Vote</h2>
                        <p className="mb-4">
                            You are about to cast your vote for:
                            <br />
                            <strong>{params[selectedCandidate!]?.President}</strong>
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                onClick={handleCancelVote}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                onClick={handleConfirmVote}
                            >
                                Confirm Vote
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VotingComponent;a