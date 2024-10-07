'use client';

import { config, queryClient } from '@/app/config/config';
import {
    AlchemyAccountProvider,
    AlchemyAccountsProviderProps,
} from '@alchemy/aa-alchemy/react';
import { PropsWithChildren } from 'react';


export const Providers = ({
    initialState,
    children,
}: PropsWithChildren<{
    initialState?: AlchemyAccountsProviderProps['initialState'];
}>) => {
    return (
        <AlchemyAccountProvider
            config={config}
            queryClient={queryClient}
            initialState={initialState}
        >
        {children} 
        </AlchemyAccountProvider>
    );
};
