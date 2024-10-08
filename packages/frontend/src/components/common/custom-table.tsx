"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { cn } from '@/lib/utils';
// import { ArrowLeft, ArrowRight } from 'lucide-react';
// import { Button } from '../ui/button';

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function CustomTable<TData>({ columns, data }: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  // const paginationArray = Array.from(
  //     { length: table.getPageCount() },
  //     (_, i) => i + 1
  // );
  return (
    <div className="border bg-white">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="h-12 rounded-[8px] rounded-tl-[8px] border-[#D7D9E4] shadow-sm md:h-[78px]"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="font-montserrat text-sm font-semibold leading-4 text-neutral first:pl-[19px] md:first:pl-8"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-[52px] border-[#D7D9E4] font-montserrat"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination */}
      {/* <div className="flex items-center justify-end space-x-2 border-t py-4 pr-6">
                <Button
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ArrowLeft className="mr-2" />
                    Previous
                </Button>

                {paginationArray?.map((pageNumber) => (
                    <Button
                        variant={
                            pageNumber === table.getState().pagination.pageIndex + 1
                                ? 'outline'
                                : 'ghost'
                        }
                        onClick={() => table.setPageIndex(pageNumber - 1)}
                        key={pageNumber}
                        className={cn({
                            'bg-[#F8F8F8]':
                                pageNumber === table.getState().pagination.pageIndex + 1,
                        })}
                    >
                        {pageNumber}
                    </Button>
                ))}

                <Button
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                    <ArrowRight className="ml-2" />
                </Button>
            </div> */}
    </div>
  );
}
