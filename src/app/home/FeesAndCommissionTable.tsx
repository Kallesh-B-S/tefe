"use client"

import React, { useState } from 'react'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnFiltersState,
    createColumnHelper,
    getPaginationRowModel,
    getFilteredRowModel,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table"

import {
    CircleCheckIcon,
    CircleXIcon,
    ArrowUpDown,
    ArrowDown,
    ArrowUp,
} from 'lucide-react'

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
import { Button } from '@/components/ui/button'
import Filter from '@/app/components/DataTable/HomePageTableFilter'
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

function FeesAndCommission({ data }: props) {
    const LoginTableEditData = useSelector((state: RootState) => state.loginTableEdit);
    const dispatch = useDispatch();

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const [sorting, setSorting] = useState<SortingState>([])

    const [searchTerm, setSearchTerm] = useState('');

    const columnHeadersArray: Array<keyof FeesAndCommissionType> = [
        "FEE_TYPE", "FEE_DESCRIPTION", "COMMRATE", "EFFDATE"
    ]

    const finalHeaderArray = [...columnHeadersArray, "ACTIONS"]

    const columnHelper = createColumnHelper<FeesAndCommissionType>();

    const columns = finalHeaderArray.map((columnName) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return columnHelper.accessor((row: any) => row[columnName], {
            id: columnName,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="pl-1 w-full flex justify-between"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {/* {columnName[0].toUpperCase() + columnName.slice(1)} */}

                        {column.getIsSorted() === "asc" && (
                            <ArrowUp className="ml-2 h-4 w-4" />
                        )}

                        {column.getIsSorted() === "desc" && (
                            <ArrowDown className="ml-2 h-4 w-4" />
                        )}

                        {column.getIsSorted() !== "desc" && column.getIsSorted() !== "asc" && (
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                )
            },
            filterFn: (row, columnId, filterValue) => {
                const cellValue = row.getValue(columnId);
                return typeof cellValue === 'string' && cellValue.toLowerCase().includes(filterValue.toLowerCase());
            },
        })
    })

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    // Handle filter change for the first column
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        setColumnFilters([{ id: "FEE_TYPE", value }]); // Assuming "FEE_TYPE" is the first column
    };

    return (
        <div>
            <div className='mt-6 rounded-lg overflow-hidden border border-dashed'>
                {/* Filter Input for the first column */}
                <div className="mb-4">
                    <Input
                        type="text"
                        placeholder="Filter by Fee Type"
                        value={searchTerm}
                        onChange={handleFilterChange}
                    />
                </div>
                <Table className='border'>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, i) => (
                                    <TableHead key={header.id} className={`bg-blue-200 text-black ${(i === 0 || i === 4) ? 'text-center' : ''}`}>
                                        <div>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</div>
                                        {header.column.getCanFilter() ? (
                                            <div className="place-content-center hidden">
                                                <Filter column={header.column} />
                                            </div>
                                        ) : null}
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
                                    {row.getVisibleCells().map((cell, index) => (
                                        <TableCell key={cell.id} className={`border ${index === 0 ? 'flex justify-center' : ''}`}>
                                            {index === 4 ? (
                                                <div className='flex justify-center'>
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
                                                                        } else {
                                                                            dispatch(setFeesAndCommissionEditData_isEdit(true))
                                                                            dispatch(set_toBeEditedData_p_fees_comm(row.original))
                                                                        }
                                                                    } else {
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
                                            ) : (
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex'>
                <Button
                    variant="outline"
                    onClick={() => table.resetSorting()}
                >
                    Reset Sorting
                </Button>
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}

export default FeesAndCommission;