"use client"

import React, { useEffect } from 'react'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    createColumnHelper,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"

import { MoreHorizontal } from "lucide-react"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

import { DataTablePagination } from '../components/DataTable/DataTablePagination'
import { checkFor_feesAndCommissionEditData_isEdit_isAdded, checkFor_isEdit, set_toBeEditedData_p_fees_comm, setFeesAndCommissionEditData_isEdit, setFeesAndCommissionEditData_isEditError } from '../reduxToolKit/slice/LoginTableEditSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reduxToolKit/store'

export interface FeesAndCommissionType {
    SPID: string | null;
    FEECOMMID: string | null;
    FEETYPEID: string | null;
    COMMRATE: string | null;
    EFFDATE: string | null;
    CREATEDBY: string | null;
    DATECREATED: string | null;
    ERRORMESG: string | null;
    SERVICE_PROVIDER_NAME: string | null;
    FEE_TYPE: string | null;
    FEE_DESCRIPTION: string | null;
}

type props = {
    data: FeesAndCommissionType[];
}

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

function FeesAndCommission({ data }: props) {
    const LoginTableEditData = useSelector((state: RootState) => state.loginTableEdit);
    const dispatch = useDispatch();
    const router = useRouter()

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const columnHeadersArray: Array<keyof FeesAndCommissionType> = [
        "FEE_TYPE", "FEE_DESCRIPTION", "COMMRATE", "EFFDATE"
    ]

    const finalHeaderArray = [...columnHeadersArray, "ACTIONS"]

    const columnHelper = createColumnHelper<FeesAndCommissionType>();

    const columns = finalHeaderArray.map((columnName) => {
        return columnHelper.accessor((row: any) => {
            const value = row[columnName]
            return value
        }, {
            id: columnName,
            header: columnName,
            filterFn: (row, columnId, filterValue) => {
                const cellValue = row.getValue(columnId);
                return typeof cellValue === 'string' && cellValue.toLowerCase().includes(filterValue.toLowerCase());
            },
        })
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
    })

    useEffect(() => {
        table.getColumn("FEE_DESCRIPTION")?.setFilterValue(debouncedSearchTerm);
    }, [debouncedSearchTerm, table]);

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search by fee description..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className='mt-6 rounded-lg overflow-hidden border border-dashed'>
                <Table className='border'>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, i) => (
                                    <TableHead key={header.id} className={`bg-blue-200 text-black ${(i === 0 || i === 4) ? 'text-center' : ''}`}>
                                        <div>{header.isPlaceholder ? null : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}</div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={table.getHeaderGroups()[0].headers.length} className="text-center py-4">
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map((row, i) => (
                                <TableRow key={row.id} className={`${i % 2 === 0 ? '' : 'bg-gray-200 '} cursor-pointer hover:bg-blue-300`}>
                                    {row.getVisibleCells().map((cell, index) => {
                                        if (index === 4) {
                                            return (
                                                <TableCell key={cell.id} className='flex justify-center'>
                                                    <div>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-4 w-6 p-0">
                                                                    <span className="sr-only">Open menu</span>
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem
                                                                    onClick={() => {
                                                                        if (checkFor_isEdit(LoginTableEditData)) {
                                                                            if (checkFor_feesAndCommissionEditData_isEdit_isAdded(LoginTableEditData)) {
                                                                                dispatch(setFeesAndCommissionEditData_isEditError("Currently one row at a time is allowed, to change you can remove and cancel"))
                                                                            }
                                                                            else {
                                                                                dispatch(setFeesAndCommissionEditData_isEdit(true))
                                                                                dispatch(set_toBeEditedData_p_fees_comm(row.original))
                                                                            }
                                                                        }
                                                                        else {
                                                                            dispatch(setFeesAndCommissionEditData_isEditError("Pls add || save || cancel the previous edit to continue"))
                                                                        }
                                                                    }}
                                                                    className='hover:!bg-amber-200'
                                                                >
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </TableCell>
                                            );
                                        } else {
                                            return (
                                                <TableCell key={cell.id} className={`border ${index === 0 ? 'flex justify-center' : ''}`}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* <div className="flex items-center justify-end space-x-2 py-4">
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
            </div> */}
            <div>
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}

export default FeesAndCommission;
