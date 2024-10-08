import deployedContracts from 'contracts/deployedContracts';
import { siteNavigation } from 'next.json';
import { useEffect } from 'react';
import {
  useReadContract,
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';

import { useRouter } from 'next/navigation';
import { maciWrapper } from '@/utils/chain';

export function Account() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const abi = maciWrapper?.abi;
  const { data: admin } = useReadContract({
    abi,
    address: maciWrapper?.address as `0x${string}`,
    functionName: 'owner',
  });
  console.log(admin);
  useEffect(() => {
    if (isConnected) {
      if (address == admin) {
        router.push(`/admin`);
      } else {
        router.push(`verify`);
      }
    }
  }, [address, admin]);

  return (
    <div>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
