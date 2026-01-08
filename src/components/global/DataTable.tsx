import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ArrowUpDown,
} from "lucide-react"
import { useTranslation } from "@/context/i18n/useTranslation"
import { cn } from "@/lib/utils"

import type { RowSelectionState, Updater } from "@tanstack/react-table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowSelectionChange?: (state: RowSelectionState) => void;
  enableRowSelection?: boolean;
  rowSelectionMode?: "multiple" | "single";
  defaultSorting?: SortingState;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  rowSelection?: RowSelectionState;
  getRowId?: (originalRow: TData, index: number, parent?: unknown) => string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowSelectionChange,
  enableRowSelection = true,
  rowSelectionMode = "multiple",
  defaultSorting = [],
  sorting: controlledSorting,
  onSortingChange: controlledOnSortingChange,
  rowSelection: controlledRowSelection,
  getRowId,
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation()

  const [internalRowSelection, setInternalRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(defaultSorting)
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 100,
  })

  // Controlled vs Uncontrolled state derivation
  const isRowSelectionControlled = controlledRowSelection !== undefined;
  const rowSelection = isRowSelectionControlled ? controlledRowSelection : internalRowSelection;
  
  const sorting = controlledSorting ?? internalSorting;

  const handleRowSelectionChange = React.useCallback(
    (updater: Updater<RowSelectionState>) => {
      if (!enableRowSelection) return
      
      // Calculate next state based on current effective state
      let next: RowSelectionState;
      if (typeof updater === 'function') {
        next = updater(rowSelection);
      } else {
        next = updater;
      }

      if (rowSelectionMode === "single") {    
        const lastKey = Object.keys(next).pop()
        next = lastKey ? { [lastKey]: true } : {}
      } 

      // Always call the prop callback
      onRowSelectionChange?.(next);

      // Only update internal state if uncontrolled
      if (!isRowSelectionControlled) {
        setInternalRowSelection(next);
      }
    },
    [rowSelection, rowSelectionMode, enableRowSelection, isRowSelectionControlled, onRowSelectionChange]
  )

  const handleSortingChange = React.useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      if (controlledOnSortingChange) {
        const nextSorting =
          typeof updaterOrValue === "function"
            ? updaterOrValue(sorting)
            : updaterOrValue;
        controlledOnSortingChange(nextSorting);
      } else {
        setInternalSorting(updaterOrValue);
      }
    },
    [controlledOnSortingChange, sorting]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection,
    enableMultiRowSelection: rowSelectionMode === "multiple",
    onRowSelectionChange: enableRowSelection
      ? handleRowSelectionChange
      : undefined,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId,
  })

  // Prune selection when data/filters change
  // If a selected row is no longer in the filtered model, remove it.

  React.useEffect(() => {
    if (!enableRowSelection) return;

    const filteredRowModel = table.getFilteredRowModel();
    const currentKeys = new Set(filteredRowModel.rows.map(row => row.id));
    
    // Check if we have selected keys that are NOT in currentKeys
    const selectedKeys = Object.keys(rowSelection);
    const keysToRemove = selectedKeys.filter(key => !currentKeys.has(key));
    
    if (keysToRemove.length > 0) {
       const nextSelection = { ...rowSelection };
       keysToRemove.forEach(key => delete nextSelection[key]);
       
       onRowSelectionChange?.(nextSelection);
       if (!isRowSelectionControlled) {
         setInternalRowSelection(nextSelection); 
       }
    }
    // We depend on table state changes that affect filtered rows
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().rowSelection, table.getState().columnFilters, table.getState().globalFilter, enableRowSelection, rowSelection, onRowSelectionChange, isRowSelectionControlled, data]);

  React.useEffect(() => {
    if (enableRowSelection) {
      onRowSelectionChange?.(rowSelection)
    }
  }, [rowSelection, onRowSelectionChange, enableRowSelection])

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={cn(
                        "flex items-center",
                        header.column.getCanSort() &&
                          "cursor-pointer select-none"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
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
                {t("datatable.noResults")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between p-4 border-t">
        {enableRowSelection && rowSelectionMode === "multiple" ? (
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {t("datatable.rowsSelected", {
              selected: table.getFilteredSelectedRowModel().rows.length,
              total: table.getFilteredRowModel().rows.length,
            })}
          </div>
        ) : (
          <span className="flex-1" />
        )}
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              {t("datatable.rowsPerPage")}
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            {t("datatable.page")} {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">{t("datatable.goToFirst")}</span>
              <ChevronsLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">{t("datatable.goToPrevious")}</span>
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">{t("datatable.goToNext")}</span>
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">{t("datatable.goToLast")}</span>
              <ChevronsRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
