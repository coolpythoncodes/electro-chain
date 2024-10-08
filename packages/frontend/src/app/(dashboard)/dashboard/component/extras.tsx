import { Status } from "@/components/common/extras";
import StatusBadge from "@/components/common/status-badge";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

type Elections = {
  id: number;
  categories: string;
  startDate: string;
  endDate: string;
  overalVotes: number;
  verifiedVoters: number;
  stage: Status;
};

const columnHelper = createColumnHelper<Elections>();

export const electionTablecolumns = [
  columnHelper.accessor("categories", {
    header: "Categories",
    cell: (info) => {
      const data = info.getValue();
      return (
        <p className="pl-[17px] text-base font-semibold leading-[18px] md:pl-8">
          {data}
        </p>
      );
    },
  }),
  columnHelper.accessor("startDate", {
    header: "Start date",
    cell: (info) => {
      const data = info.getValue();
      return (
        <p className="text-neutral] font-montserrat text-xs font-normal leading-[14px] md:text-base md:leading-[18px]">
          {data}
        </p>
      );
    },
  }),
  columnHelper.accessor("endDate", {
    header: "End date",
    cell: (info) => {
      const data = info.getValue();
      return (
        <p className="text-neutral] font-montserrat text-xs font-normal leading-[14px] md:text-base md:leading-[18px]">
          {data}
        </p>
      );
    },
  }),
  columnHelper.accessor("overalVotes", {
    header: "Overall Votes",
    cell: (info) => {
      const data = info.getValue();
      return (
        <p className="text-neutral] font-montserrat text-xs font-normal leading-[14px] md:text-base md:leading-[18px]">
          {data}
        </p>
      );
    },
  }),
  columnHelper.accessor("verifiedVoters", {
    header: "Verified Voters",
    cell: (info) => {
      const data = info.getValue();
      return (
        <p className="text-neutral] font-montserrat text-xs font-normal leading-[14px] md:text-base md:leading-[18px]">
          {data}
        </p>
      );
    },
  }),
  columnHelper.accessor("stage", {
    header: "Stage",
    cell: (info) => {
      const data = info.getValue();
      return <StatusBadge status={data} />;
    },
  }),

  columnHelper.accessor("id", {
    header: "Action",
    cell: (info) => {
      const data = info.getValue();
      return (
        <Link href={`/dashboard/${data}`} className="text-primary underline">
          View
        </Link>
      );
    },
  }),
];
