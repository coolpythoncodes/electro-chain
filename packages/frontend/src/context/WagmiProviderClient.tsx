'use client';

import React, { PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
// import { WagmiProvider } from "@wagmi/connectors";
import { config } from '@/services/web3/WagmiConfig';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/app/config/config';

const WagmiProvidersClient = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default WagmiProvidersClient;
