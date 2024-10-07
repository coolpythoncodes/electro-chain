'use client';

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Keypair, PrivKey } from 'maci-domainobjs';
import deployedContracts from 'contracts/deployedContracts';
import {
  useSignMessage,
  useAccount,
  useSmartAccountClient,
  useUser,
  useSendUserOperation,
} from '@alchemy/aa-alchemy/react';
import {
  chain,
  accountType,
  gasManagerConfig,
  accountClientOptions as opts,
} from '@/app/config/config';
import { useReadContract, useWatchContractEvent } from 'wagmi';
// import { readContract } from '@wagmi/core';
import { useRouter } from 'next/navigation';
import { maciWrapper } from '@/utils/chain';


interface IAuthContext {
  isRegistered: boolean;
  keypair: Keypair | null;
  setKeypair: Dispatch<SetStateAction<Keypair | null>>;
  stateIndex: bigint | null;
  setStateIndex: Dispatch<SetStateAction<bigint | null>>;
  viewCredentials: boolean | null;
  setViewCredentials: Dispatch<SetStateAction<boolean>>;
  credentials: { password: string; authCode: string };
  setCredentials: Dispatch<
    SetStateAction<{ password: string; authCode: string }>
  >;
  // generateKeypair: () => void;
}

export const AuthContext = createContext({} as IAuthContext);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [keypair, setKeypair] = useState<Keypair | null>(null);
  const [stateIndex, setStateIndex] = useState<bigint | null>(null);
  const user = useUser();
  const { address } = useAccount({ type: accountType });
  const { client } = useSmartAccountClient({
    type: accountType,
    gasManagerConfig,
    opts,
  });
  const [viewCredentials, setViewCredentials] = useState(false);
  const [credentials, setCredentials] = useState({
    password: '',
    authCode: '',
  });

  const { data: isRegistered, refetch: refetchIsRegistered } = useReadContract({
    abi: maciWrapper?.abi,
    address: maciWrapper?.address as `0x${string}`,
    functionName: 'isPublicKeyRegistered',
    args: keypair ? keypair.pubKey.rawPubKey : [0n, 0n],
  });

  useEffect(() => {
    refetchIsRegistered();
    console.log(`User is registered ${isRegistered}`);
    console.log(keypair);
  }, [address, user, keypair]);


  return (
    <AuthContext.Provider
      value={{
        isRegistered: Boolean(isRegistered),
        keypair,
        setKeypair,
        stateIndex,
        setStateIndex,
        // generateKeypair,
        viewCredentials,
        setViewCredentials,
        credentials,
        setCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
