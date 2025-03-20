// loginSlice.ts

import { BasicDetailsType } from "@/app/home/BasicDetailsTable";
import { FeesAndCommissionType } from "@/app/home/FeesAndCommissionTable";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface BasicDetailsEditType {
    isEdit: boolean;
    isEditError: string;
    isAdded: boolean;
    toBeEditedData: {
        p_basic_details: BasicDetailsType[];
    };
    editedData: object | null;
}

interface FeesAndCommissionEditType {
    isEdit: boolean;
    isEditError: string;
    isAdded: boolean;
    toBeEditedData: {
        p_fees_comm: FeesAndCommissionType[]
    };
    editedData: FeesAndCommissionType | null;
}

export interface loginTableEditType {
    basicDetailsEditData: BasicDetailsEditType,
    feesAndCommissionEditData: FeesAndCommissionEditType
}

const initialState: loginTableEditType = {
    basicDetailsEditData: {
        isEdit: false,
        isEditError: '',
        isAdded: false,
        toBeEditedData: {
            p_basic_details: []
        },
        editedData: null
    },
    feesAndCommissionEditData: {
        isEdit: false,
        isEditError: '',
        isAdded: false,
        toBeEditedData: {
            p_fees_comm: []
        },
        editedData: null
    }
};

export function checkFor_isEdit(state: typeof initialState): boolean {
    // Check basicDetailsEditData

    const basicDetailsEdit = state.basicDetailsEditData;
    if (basicDetailsEdit.isEdit && !basicDetailsEdit.isAdded) {
        return false;
    }

    // Check feesAndCommissionEditData
    const feesAndCommissionEdit = state.feesAndCommissionEditData;
    if (feesAndCommissionEdit.isEdit && !feesAndCommissionEdit.isAdded) {
        return false;
    }

    // If neither condition is met, return false
    return true;
}

export function checkFor_isAdded(state: typeof initialState): boolean {

    if (state.basicDetailsEditData.isAdded || state.feesAndCommissionEditData.isAdded) {
        return true;
    }
    return false
}

export function checkFor_feesAndCommissionEditData_isEdit_isAdded(state: typeof initialState) {
    if (state.feesAndCommissionEditData.isEdit && state.feesAndCommissionEditData.isAdded) {
        return true
    }
    return false
}

const LoginTableEditSlice = createSlice({
    name: "loginTableEdit",
    initialState,
    reducers: {
        // isEdit
        setBasicDetailsEditData_isEdit(state, action: PayloadAction<boolean>) {
            state.basicDetailsEditData.isEdit = action.payload;
        },
        setFeesAndCommissionEditData_isEdit(state, action: PayloadAction<boolean>) {
            state.feesAndCommissionEditData.isEdit = action.payload;
        },
        // isAdded
        setBasicDetailsEditData_isAdded(state, action: PayloadAction<boolean>) {
            state.basicDetailsEditData.isAdded = action.payload;
        },
        setFeesAndCommissionEditData_isAdded(state, action: PayloadAction<boolean>) {
            state.feesAndCommissionEditData.isAdded = action.payload;
        },
        // isEditError
        setBasicDetailsEditData_isEditError(state, action: PayloadAction<string>) {
            state.basicDetailsEditData.isEditError = action.payload
        },
        setFeesAndCommissionEditData_isEditError(state, action: PayloadAction<string>) {
            state.feesAndCommissionEditData.isEditError = action.payload
        },
        // remove Added
        removeAdded_basicDetailsEditData(state) {
            state.basicDetailsEditData.isAdded = false
        },
        removeAdded_feesAndCommissionEditData(state) {
            state.feesAndCommissionEditData.isAdded = false
        },
        // set_toBeEdited
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set_toBeEditedData_p_basic_details(state, action: PayloadAction<any>) {
            state.basicDetailsEditData.toBeEditedData.p_basic_details = [action.payload]
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set_toBeEditedData_p_fees_comm(state, action: PayloadAction<any>) {
            console.log("payload ----- ", action.payload?.FEE_TYPE);

            state.feesAndCommissionEditData.toBeEditedData.p_fees_comm = [action.payload]
        },
        // cancel All
        cancelAll(state) {
            state.basicDetailsEditData = initialState.basicDetailsEditData;
            state.feesAndCommissionEditData = initialState.feesAndCommissionEditData;
        },
        // set edited data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set_feesAndCommissionEditData_editedData(state, action:PayloadAction<any>){
            // state.feesAndCommissionEditData.editedData = {...action.payload.p_fees_comm}
            state.feesAndCommissionEditData.editedData = {...state.feesAndCommissionEditData.toBeEditedData.p_fees_comm[0], ...action.payload.p_fees_comm}
            state.feesAndCommissionEditData.toBeEditedData.p_fees_comm = [{...state.feesAndCommissionEditData.toBeEditedData.p_fees_comm[0], ...action.payload.p_fees_comm}]
        }
    },
});

// Export actions
export const {
    setBasicDetailsEditData_isEdit,
    setFeesAndCommissionEditData_isEdit,

    setBasicDetailsEditData_isAdded,
    setFeesAndCommissionEditData_isAdded,

    removeAdded_basicDetailsEditData,
    removeAdded_feesAndCommissionEditData,

    setBasicDetailsEditData_isEditError,
    setFeesAndCommissionEditData_isEditError,

    set_toBeEditedData_p_basic_details,
    set_toBeEditedData_p_fees_comm,

    cancelAll,

    set_feesAndCommissionEditData_editedData,

} = LoginTableEditSlice.actions;

// Export reducer
export default LoginTableEditSlice.reducer;