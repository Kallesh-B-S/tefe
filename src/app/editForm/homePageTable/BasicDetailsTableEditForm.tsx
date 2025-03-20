'use client'

import { removeAdded_basicDetailsEditData, setBasicDetailsEditData_isAdded, setBasicDetailsEditData_isEdit } from '@/app/reduxToolKit/slice/LoginTableEditSlice'
import { RootState } from '@/app/reduxToolKit/store'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function BasicDetailsTableEditForm() {
    const dispatch = useDispatch();
    const LoginTableEditData = useSelector((state: RootState) => state.loginTableEdit);
    
    // Local state to manage form inputs
    const [formData, setFormData] = useState({
        NAMEOF: '',
        LOOKUP_CODE: '',
        ADDRESS1: '',
        ADDRESS2: '',
        CITY: '',
        COUNTRY: '',
        STATE: '',
        ZIP: ''
    });

    // Populate form data when LoginTableEditData changes
    useEffect(() => {
        if (LoginTableEditData?.basicDetailsEditData?.toBeEditedData?.p_basic_details[0]) {
            const data = LoginTableEditData.basicDetailsEditData.toBeEditedData.p_basic_details[0];
            setFormData({
                NAMEOF: data.NAMEOF || '',
                LOOKUP_CODE: data.LOOKUPCODE || '',
                ADDRESS1: data.ADDRESS1 || '',
                ADDRESS2: data.ADDRESS2 || '',
                CITY: data.CITY || '',
                COUNTRY: data.COUNTRY || '',
                STATE: data.STATE || '',
                ZIP: data.ZIP || ''
            });
        }
    }, [LoginTableEditData]);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };


    return (
        <div className="w-[93%] bg-white m-auto p-2">
            <div className="bg-gray-100 w-[100%] m-auto flex flex-wrap gap-1 p-5">
                <div className="flex gap-1 w-[49.8%]">
                    <div className="bg-gray-300 w-[30%] text-nowrap p-1">Company Name</div>
                    <input
                        type="text"
                        name="NAMEOF"
                        value={formData.NAMEOF}
                        onChange={handleChange}
                        className="px-2 w-full outline-0 border border-solid border-gray-400 rounded-lg" />
                </div>
                <div className="flex gap-1 w-[49.8%]">
                    <div className="bg-gray-300 w-[30%] p-1">Lookup Code</div>
                    <input
                        type="text"
                        name="LOOKUP_CODE"
                        value={formData.LOOKUP_CODE}
                        onChange={handleChange}
                        className="px-2 w-full outline-0 border border-solid border-gray-400 rounded-lg" />
                </div>
                <div className="flex gap-1 w-[49.8%]">
                    <div className="bg-gray-300 w-[30%] p-1">Address1</div>
                    <input
                        type="text"
                        name="ADDRESS1"
                        value={formData.ADDRESS1}
                        onChange={handleChange}
                        className="px-2 w-full outline-0 border border-solid border-gray-400 rounded-lg" />
                </div>
                <div className="flex gap-1 w-[49.8%]">
                    <div className="bg-gray-300 w-[30%] p-1">Address2</div>
                    <input
                        type="text"
                        name="ADDRESS2"
                        value={formData.ADDRESS2}
                        onChange={handleChange}
                        className="px-2 w-full outline-0 border border-solid border-gray-400 rounded-lg" />
                </div>
                <div className="flex gap-1 w-[49.8%]">
                    <div className="bg-gray-300 w-[30%] p-1">City</div>
                    <input
                        type="text"
                        name="CITY"
                        value={formData.CITY}
                        onChange={handleChange}
                        className="px-2 w-full outline-0 border border-solid border-gray-400 rounded-lg" />
                </div>
                <div className="flex gap-1 w-[49.8%]">
                    <div className="bg-gray-300 w-[30%] p-1">Country</div>
                    <select
                        name="COUNTRY"
                        value={formData.COUNTRY}
                        onChange={handleChange}
                        className="px-2 w-full outline-0 border border-solid border-gray-400 rounded-lg">
                        <option value="">Select Country</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-1 w-[49.8%]">
                    <div className="bg-gray-300 w-[30%] p-1">State</div>
                    <select
                        name="STATE"
                        value={formData.STATE}
                        onChange={handleChange}
                        className="px-2 w-full outline-0 border border-solid border-gray-400 rounded-lg">
                        <option value="">Select State</option>
                        {[11,12,13,14,15,16,17,18,19,20].map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-1 w-[49.8%]">
                    <div className="bg-gray-300 w-[30%] p-1">Zip</div>
                    <input
                        type="text"
                        name="ZIP"
                        value={formData.ZIP}
                        onChange={handleChange}
                        className="px-2 w-full outline-0 border border-solid border-gray-400 rounded-lg" />
                </div>
                <div className="w-full flex gap-2 justify-end mt-3">
                    <Button
                        className="bg-amber-300 text-black w-15 h-8 hover:bg-amber-400 active:bg-black active:text-amber-400"
                        onClick={()=>dispatch(setBasicDetailsEditData_isAdded(true))}
                        disabled={LoginTableEditData.basicDetailsEditData.isAdded}
                    >
                        Add
                    </Button>
                    <Button
                        className="bg-green-400 text-black w-15 h-8 hover:bg-green-500 active:bg-black active:text-green-500"
                        disabled={LoginTableEditData.basicDetailsEditData.isAdded}
                    >
                        Save
                    </Button>
                    <Button
                        className="bg-red-500 text-black w-15 h-8 hover:bg-red-600 active:bg-black active:text-red-600"
                        onClick={() => dispatch(LoginTableEditData.basicDetailsEditData.isAdded ? removeAdded_basicDetailsEditData() : setBasicDetailsEditData_isEdit(false))}
                    >
                        {LoginTableEditData.basicDetailsEditData.isAdded ? 'Remove' : 'Cancel'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BasicDetailsTableEditForm
