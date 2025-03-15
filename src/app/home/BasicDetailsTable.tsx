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

export interface BasicDetailsType {
    SPID: number;
    NAMEOF: string | null;
    LOOKUPCODE: string | null;
    ADDRESS1: string | null;
    ADDRESS2: string | null;
    CITY: string | null;
    STATE: string | null;
    COUNTRY: string | null;
    ISSUINGREGION: string | null;
    REPLACEMENTREGION: string | null;
    DATECREATED: string | null;
    CREATEDBY: string | null;
    INACTIVEFLAG: string | null;
    INACTIVEDATE: string | null;
    LASTUPDATEDBY: string | null;
    LASTUPDATEDDATE: string | null;
    BONDSURETY: string | null;
    CARGOPOLICYNO: string | null;
    CARGOSURETY: string | null;
    ZIP: string | null;
}

type props = {
    data: BasicDetailsType[];
}

function BasicDetailsTable({ data }: props) {
    const router = useRouter()

    const columnHeadersArray: Array<keyof BasicDetailsType> = [
        "NAMEOF", "ADDRESS1", "ADDRESS2", "CITY", "COUNTRY", "STATE", "ZIP", "ISSUINGREGION", "REPLACEMENTREGION"
    ]

    const columnHelper = createColumnHelper<BasicDetailsType>();

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
                            {headerGroup.headers.map((header,i) => (
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
                    {table.getRowModel().rows.map((row,i)=>(
                        <TableRow key={row.id} className={`${i % 2 === 0 ? '' : 'bg-gray-200 '} cursor-pointer hover:bg-blue-300`} >
                            {row.getVisibleCells().map((cell,i)=>(
                                <TableCell key={cell.id} className={`border ${i === 0 ? 'max-w-xs overflow-hidden text-ellipsis whitespace-nowrap' : ''}`}>
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

export default BasicDetailsTable
