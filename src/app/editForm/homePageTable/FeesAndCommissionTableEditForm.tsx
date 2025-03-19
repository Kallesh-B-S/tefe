'use client'

import { domainNameResolver } from '@/app/helper/functions';
import { cancelAll, removeAdded_feesAndCommissionEditData, set_feesAndCommissionEditData_editedData, setFeesAndCommissionEditData_isAdded, setFeesAndCommissionEditData_isEdit } from '@/app/reduxToolKit/slice/LoginTableEditSlice';
import { RootState } from '@/app/reduxToolKit/store';
import { saveEdited } from '@/app/reduxToolKit/thunk/homePage';
import { Button } from '@/components/ui/button'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function FeesAndCommissionTableEditForm() {
    const dispatch = useDispatch();
    const LoginTableEditData = useSelector((state: RootState) => state.loginTableEdit);

    // State to hold the input values
    // const [feeType, setFeeType] = useState('');
    // const [description, setDescription] = useState('');
    const [commissionRate, setCommissionRate] = useState('');
    const [effectiveDate, setEffectiveDate] = useState('');

    // Effect to set initial values when editing
    useEffect(() => {
        if (LoginTableEditData.feesAndCommissionEditData?.toBeEditedData) {
            const data = LoginTableEditData.feesAndCommissionEditData.toBeEditedData.p_fees_comm[0];
            // setFeeType(data?.FEE_TYPE || '');
            // setDescription(data?.FEE_DESCRIPTION || '');
            setCommissionRate(data?.COMMRATE || '0');
            setEffectiveDate(data?.EFFDATE || '');
        }
    }, [LoginTableEditData]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputDate = e.target.value; // e.g., "2025-03-19"
        const [year, month, day] = inputDate.split('-'); // Split the date into components
        const formattedDate = `${month}/${day}/${year}`; // Rearrange to mm/dd/yyyy
        setEffectiveDate(formattedDate); // Set the formatted date in state
        // return formattedDate
    };

    async function handleSubmit() {
        await saveEdited(dispatch, LoginTableEditData, commissionRate, effectiveDate);
    }

    return (
        <div className="w-[93%] bg-white m-auto p-2">
            <div className="bg-gray-100 w-[100%] m-auto flex flex-wrap gap-1 p-5">
                {/* <div className="flex gap-1 w-[49.8%]">
                    <div className="bg-gray-300 w-[30%] text-nowrap p-1">Fee Type</div>
                    <input
                        type="text"
                        value={feeType}
                        onChange={(e) => setFeeType(e.target.value)}
                        className="px-2 w-full outline-0 border border-solid border-gray-400 rounded-lg"
                    />
                </div> */}
                {/* <div className="flex gap-1 w-[49.8%]">
                    <div className="bg-gray-300 w-[30%] p-1">Description</div>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="px-2 w-full outline-0 border border-solid border-gray-400 rounded-lg"
                    />
                </div> */}
                <div className="flex gap-1 w-[49.8%]">
                    <div className="bg-gray-300 w-[30%] p-1">Commission Rate</div>
                    <input
                        type="text"
                        value={commissionRate}
                        onChange={(e) => setCommissionRate(e.target.value)}
                        className="px-2 w-full outline-0 border border-solid border-gray-400 rounded-lg"
                        disabled={(LoginTableEditData.feesAndCommissionEditData.isEdit && LoginTableEditData.feesAndCommissionEditData.isAdded)}
                    />
                </div>
                <div className="flex gap-1 w-[49.8%]">
                    <div className="bg-gray-300 w-[30%] p-1">Effective Date</div>
                    <input
                        type="text"
                        value={effectiveDate}
                        onChange={(e) => setEffectiveDate(e.target.value)}
                        className="px-2 w-full outline-0 border border-solid border-gray-400 rounded-lg"
                        disabled={(LoginTableEditData.feesAndCommissionEditData.isEdit && LoginTableEditData.feesAndCommissionEditData.isAdded)}
                    />
                </div>
                <div className="w-full flex gap-2 justify-end mt-3">
                    <Button
                        className="bg-amber-300 text-black w-15 h-8 hover:bg-amber-400 active:bg-black active:text-amber-400"
                        onClick={() => {
                            dispatch(setFeesAndCommissionEditData_isAdded(true))
                            dispatch(set_feesAndCommissionEditData_editedData(
                                {
                                    p_fees_comm: {
                                        COMMRATE: commissionRate,
                                        EFFDATE: effectiveDate
                                    }
                                }
                            ))
                        }}
                        disabled={LoginTableEditData.feesAndCommissionEditData.isAdded}
                    >
                        Add
                    </Button>
                    <Button
                        className="bg-green-400 text-black w-15 h-8 hover:bg-green-500 active:bg-black active:text-green-500"
                        // disabled={LoginTableEditData.feesAndCommissionEditData.isAdded}
                        onClick={() => {
                            dispatch(set_feesAndCommissionEditData_editedData(
                                {
                                    p_fees_comm: {
                                        COMMRATE: commissionRate,
                                        EFFDATE: effectiveDate
                                    }
                                }
                            ));
                            handleSubmit();
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        className="bg-red-500 text-black w-15 h-8 hover:bg-red-600 active:bg-black active:text-red-600"
                        onClick={() => dispatch(LoginTableEditData.feesAndCommissionEditData.isAdded ? removeAdded_feesAndCommissionEditData() : setFeesAndCommissionEditData_isEdit(false))}
                    >
                        {LoginTableEditData.feesAndCommissionEditData.isAdded ? 'Remove' : 'Cancel'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FeesAndCommissionTableEditForm
