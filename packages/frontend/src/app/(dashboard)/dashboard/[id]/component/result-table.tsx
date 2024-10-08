import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// @ts-expect-error unknown error
const ResultsTable = ({ result }) => {
    if (!result || result?.length === 0) {
        return null;
    }

    return (
        <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Results</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Rank</TableHead>
                            <TableHead>Candidate</TableHead>
                            <TableHead className="text-right">Votes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* @ts-expect-error unknown error */}
                        {result?.map((r, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{i + 1}</TableCell>
                                <TableCell>{r?.candidate}</TableCell>
                                <TableCell className="text-right">{r?.votes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ResultsTable;