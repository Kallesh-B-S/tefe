"use client"

import React from 'react'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    createColumnHelper
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useRouter } from 'next/navigation'

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

    const columnHelper = createColumnHelper<ParamTableType>();

    const columns = columnHeadersArray.map((columnName) => {
        return columnHelper.accessor(columnName, {
            id: columnName,
            header: columnName
        })
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className='mt-6 rounded-lg overflow-hidden border border-dashed'>
            <Table className='border'>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className='bg-blue-200 text-black'>
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
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className='cursor-pointer hover:bg-gray-200 hover:text-black dark:hover:bg-ring/40' >
                            {row.getVisibleCells().map((cell, index) => (
                                <TableCell key={cell.id} className={`border
                                ${index === 0 ?
                                        'pl-5'
                                        :
                                        ''}`
                                }>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ParamTable
