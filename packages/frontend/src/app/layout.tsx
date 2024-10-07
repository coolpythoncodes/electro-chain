import { montserrat } from "@/lib/font";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { Providers } from "./provider";
import { cookieToInitialState } from "@alchemy/aa-alchemy/config";
import { headers } from "next/headers";
import { config } from "@/app/config/config";
import AuthContextProvider from "@/context/AuthContext";
import AppKitProvider from "@/context/Index";

export const metadata: Metadata = {
  title: "ElectroChain",
  description:
    "ElectroChain empowers users to securely and transparently cast their votes online. Utilizing cutting-edge blockchain technology, ElectroChain ensures the integrity and privacy of every vote, making election processes tamper-proof and verifiable. Whether you're voting in government elections or organizational polls, ElectroChain provides a seamless, user-friendly experience with real-time updates and comprehensive security measures. Join the future of voting today with Votelink – your voice, your vote, your blockchain. Experience the highest standard of digital democracy with Votelink's decentralized, secure, and transparent voting solutions. Cast your vote with confidence and be part of a revolution in how elections are conducted.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const initialState = cookieToInitialState(
    config,
    headers().get('ccokie') ?? undefined
  );
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body>
        <Providers initialState={initialState}>
          <AppKitProvider>
            <AuthContextProvider>
              {children}
            </AuthContextProvider>
          </AppKitProvider>
        </Providers>
      </body>
    </html>
  );
}
