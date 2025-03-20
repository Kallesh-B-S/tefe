"use client"

import React from 'react'


import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    createColumnHelper,
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

import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { checkFor_isEdit, set_toBeEditedData_p_basic_details, setBasicDetailsEditData_isEdit, setBasicDetailsEditData_isEditError } from '../reduxToolKit/slice/LoginTableEditSlice'
import { RootState } from '../reduxToolKit/store'



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
    const LoginTableEditData = useSelector((state: RootState) => state.loginTableEdit)

    const dispatch = useDispatch();

    const columnHeadersArray: Array<keyof BasicDetailsType> = [
        "NAMEOF", "ADDRESS1", "ADDRESS2", "CITY", "COUNTRY", "STATE", "ZIP", "ISSUINGREGION", "REPLACEMENTREGION"
    ]

    const finalHeaderArray = [...columnHeadersArray, "ACTIONS"]

    const columnHelper = createColumnHelper<BasicDetailsType>();

    const columns = finalHeaderArray.map((columnName) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        getCoreRowModel: getCoreRowModel()
    })

    return (
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
                                    if (index === 9) {
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
                                                                    if(checkFor_isEdit(LoginTableEditData)){
                                                                        dispatch(setBasicDetailsEditData_isEdit(true))
                                                                        dispatch(set_toBeEditedData_p_basic_details(row.original))
                                                                    }
                                                                    else{
                                                                        dispatch(setBasicDetailsEditData_isEditError("Pls add ..."))
                                                                    }
                                                                }}
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
                                        );
                                    }
                                    else {
                                        return (
                                            <TableCell key={cell.id} className={`border ${index === 0 ? 'max-w-xs overflow-hidden text-ellipsis whitespace-nowrap' : ''}`}>
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
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default BasicDetailsTable
