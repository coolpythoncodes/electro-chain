import type { ReactNode } from "react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

type Props = {
  children: ReactNode;
};
const RootLayout = ({ children }: Props) => {
  return (
    <main className="flex min-h-dvh flex-col bg-[#FAFCFF]">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
};

export default RootLayout;
