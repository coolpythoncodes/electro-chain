"use client";

import { CustomTable } from "@/components/common/custom-table";
import { electionTablecolumns } from "./extras";

const data = [
  {
    id: 1,
    categories: "Presidential Election",
    startDate: "02/10/2024",
    endDate: "06/10/2024",
    overalVotes: "18,712,555",
    verifiedVoters: "45,091,127",
    stage: "On going",
  },
  {
    id: 2,
    categories: "Gubernatorial Election",
    startDate: "02/10/2024",
    endDate: "06/10/2024",
    overalVotes: "18,712,555",
    verifiedVoters: "45,091,127",
    stage: "Completed",
  },
  {
    id: 3,
    categories: "House of Assembly",
    startDate: "02/10/2024",
    endDate: "06/10/2024",
    overalVotes: "18,712,555",
    verifiedVoters: "45,091,127",
    stage: "Completed",
  },
];

const ElectionTable = () => {
  return (
    // @ts-expect-error error from tanstack react table
    <CustomTable data={data} columns={electionTablecolumns} />
  );
};

export default ElectionTable;
