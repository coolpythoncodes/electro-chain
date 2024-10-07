import { AbiItem } from 'web3-utils';
import deployedContracts from 'contracts/deployedContracts';
import scaffoldConfig from 'scaffold.config';

export const chainId = scaffoldConfig?.targetNetworks[0]?.id;

interface MACIWrapperContract {
    address: string;
    abi: readonly AbiItem[];
}

export const maciWrapper: MACIWrapperContract | undefined = chainId
    ? deployedContracts[chainId]?.ElectroChain
    : undefined;
