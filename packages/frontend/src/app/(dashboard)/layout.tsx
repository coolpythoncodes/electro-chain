import type { ReactNode } from "react";
import Footer from "../(home)/components/footer";
import DashboardNavbar from "./component/dashboard-navbar";
import DashboardSidebar from "./component/dashboard-side-bar";

type Props = {
  children: ReactNode;
};
const RootLayout = ({ children }: Props) => {
  return (
    <main className="flex min-h-dvh flex-col bg-[#FAFCFF]">
      <div className="flex-1">
        <div className="grid min-h-[calc(100dvh_-_74px)] grid-cols-1 md:grid-cols-[280px_auto]">
          <DashboardSidebar />
          <div>
            <DashboardNavbar />
            <div className="">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default RootLayout;
