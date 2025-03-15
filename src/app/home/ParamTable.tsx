"use client"

import React from 'react'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    createColumnHelper,
    getPaginationRowModel
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

import { MoreHorizontal } from "lucide-react"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
  } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DataTablePagination } from '../components/DataTable/DataTablePagination'

export interface ParamTableType {
    SPID: number;
    PARAMTYPE: string | null;
    PARAMDESC: string | null;
    PARAMVALUE: string | null;
    ADDLPARAMVALUE1: string | null;
    ADDLPARAMVALUE2: string | null;
    ADDLPARAMVALUE3: string | null;
    ADDLPARAMVALUE4: string | null;
    ADDLPARAMVALUE5: string | null;
    SORTSEQ: number;
    INACTIVECODEFLAG: string | null;
    INACTIVEDATE: string | null;
    CREATEDBY: string | null;
    DATECREATED: string | null;
    LASTUPDATEDBY: string | null;
    LASTUPDATEDDATE: string | null;
    ERRORMESG: string | null;
}

type props = {
    data: ParamTableType[];
}

function ParamTable({ data }: props) {
    const router = useRouter()

    const columnHeadersArray: Array<keyof ParamTableType> = [
        "SPID", "PARAMTYPE", "PARAMDESC", "PARAMVALUE"
    ]

    const finalHeaderArray = [...columnHeadersArray, "ACTIONS"]

    const columnHelper = createColumnHelper<ParamTableType>();

    const columns = finalHeaderArray.map((columnName) => {
        return columnHelper.accessor((row: any) => {
            const value = row[columnName]
            return value
        }, {
            id: columnName,
            header: columnName
        })
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })



    return (
        <div>
            <div className='mt-6 rounded-lg overflow-hidden border border-dashed'>
                <Table className='border'>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, i) => (
                                    <TableHead key={header.id} className={`bg-blue-200 text-black ${(i == 0 || i == 4) ? 'text-center' : ''}`}>
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
                        {table.getRowModel().rows.map((row, i) => (
                            <TableRow key={row.id} className={`${i % 2 === 0 ? '' : 'bg-gray-200 '} cursor-pointer hover:bg-blue-300`} >
                                {row.getVisibleCells().map((cell, index) => {
                                    if (index === 4) {
                                        return <TableCell key={cell.id} className='flex justify-center'>
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
                                                            // onClick={() => navigator.clipboard.writeText(payment.id)}
                                                            className='hover:!bg-amber-200'
                                                        >
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        {/* <DropdownMenuItem>View customer</DropdownMenuItem>
                                                    <DropdownMenuItem>View payment details</DropdownMenuItem> */}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    }
                                    else {
                                        return (
                                            <TableCell key={cell.id} className={`border ${index === 0 ? 'flex justify-center' : ''}`}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        )
                                    }
                                }
                                )}
                            </TableRow>
                        ))}
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

export default ParamTable
