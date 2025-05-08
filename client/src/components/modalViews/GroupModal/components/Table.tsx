import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFilter,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { Input } from "../../../ui/Input";
import { Button } from "../../../ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Checkbox } from "../../../ui/checkbox";

type RatingsData = {
  headers: string[];
  rows: string[][];
};

export default function RatingsTable({ ratings }: { ratings: RatingsData }) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFilter[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<any>[] =
    ratings?.headers.map((header, colIndex) => ({
      accessorKey: `${colIndex}`,
      header: header,
      cell: ({ row }) => {
        const item = row.original[colIndex];
        const numeric = Number(item);

        let className = "";
        if (item === "N/A" || (!isNaN(numeric) && numeric < 60)) {
          className = "bg-red-200 text-red-500 text-center w-full";
        } else if (!isNaN(numeric) && numeric >= 60) {
          className = " text-green-500 text-center w-full";
        }
        return <div className={className}>{item}</div>;
      },
    })) || [];

  const table = useReactTable({
    data: ratings?.rows || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selectedRowCount = Object.keys(rowSelection).length;

  const handleSelectAll = () => {
    const allSelected =
      Object.keys(rowSelection).length !== table.getRowModel().rows.length;
    setRowSelection(
      allSelected
        ? {}
        : table.getRowModel().rows.reduce((acc: any, row) => {
            acc[row.id] = true;
            return acc;
          }, {})
    );
  };

  return (
    <div className="w-full font-k2d ">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter..."
          onChange={(e) => table.getColumn("1")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {ratings.headers[column.id as any] || column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead>
                  <Checkbox
                    checked={
                      selectedRowCount === table.getRowModel().rows.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox
                      checked={row.getIsSelected()}
                      onChange={() => row.toggleSelected()}
                    />
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="w-auto">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end space-x-2 py-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      <div className="">
        <span>{selectedRowCount} row(s) selected</span>
      </div>
    </div>
  );
}
