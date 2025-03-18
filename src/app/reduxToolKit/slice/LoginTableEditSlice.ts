// loginSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BasicDetailsEditType {
    isEdit: boolean;
    isEditError: string;
    isAdded: boolean;
    toBeEditedData: {};
    editedData: {};
}

interface FeesAndCommissionEditType {
    isEdit: boolean;
    isEditError: string;
    isAdded: boolean;
    toBeEditedData: {};
    editedData: {};
}

interface loginTableEditType {
    basicDetailsEditData: BasicDetailsEditType,
    feesAndCommissionEditData: FeesAndCommissionEditType
}

const initialState: loginTableEditType = {
    basicDetailsEditData: {
        isEdit: false,
        isEditError: '',
        isAdded: false,
        toBeEditedData: {},
        editedData: {}
    },
    feesAndCommissionEditData: {
        isEdit: false,
        isEditError: '',    
        isAdded: false,
        toBeEditedData: {},
        editedData: {}
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

const LoginTableEditSlice = createSlice({
    name: "loginTableEdit",
    initialState,
    reducers: {
        setBasicDetailsEditData_isEdit(
            state, action: PayloadAction<boolean>
        ) {
            state.basicDetailsEditData.isEdit = action.payload;
        },
        setBasicDetailsEditData_isAdded(
            state, action: PayloadAction<boolean>
        ) {
            state.basicDetailsEditData.isAdded = action.payload;
        },
        setBasicDetailsEditData_isEditError(state, action:PayloadAction<string>){
            state.basicDetailsEditData.isEditError = action.payload
        },
        removeAdded(state) {
            state.basicDetailsEditData.isAdded = false
        },
        checkForBasicDetailsEditData_isEdit(state) {
            
        },
        setBasicDetailsEditData_toBeEditedData(state, action: PayloadAction<any>) {
            // state.basicDetailsEditData.toBeEditedData = [...state.basicDetailsEditData]
        }

        // setLoginTableData(state, action: PayloadAction<{
        //     basicDetailsData:BasicDetailsType[],
        //     ParamTableData:ParamTableType[],
        //     FeesAndCommissionTableData:FeesAndCommissionType[]
        // }>) {
        //     state.basicDetailsData = action.payload.basicDetailsData;
        //     state.ParamTableData = action.payload.ParamTableData;
        //     state.FeesAndCommissionTableData = action.payload.FeesAndCommissionTableData
        // },
    },
});

// Export actions
export const { setBasicDetailsEditData_isEdit, setBasicDetailsEditData_isAdded, removeAdded , setBasicDetailsEditData_isEditError} = LoginTableEditSlice.actions;

// Export reducer
export default LoginTableEditSlice.reducer;