// loginSlice.ts
import { BasicDetailsType } from "@/app/home/BasicDetailsTable";
import { FeesAndCommissionType } from "@/app/home/FeesAndCommissionTable";
import { ParamTableType } from "@/app/home/ParamTable";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface loginTableType {
    basicDetailsData : BasicDetailsType[],
    ParamTableData: ParamTableType[],
    FeesAndCommissionTableData: FeesAndCommissionType[]
}

const initialState: loginTableType = {
    basicDetailsData : [],
    ParamTableData : [],
    FeesAndCommissionTableData : [],
};

const loginTableSlice = createSlice({
    name: "loginTable",
    initialState,
    reducers: {
        setLoginTableData(state, action: PayloadAction<{
            basicDetailsData:BasicDetailsType[],
            ParamTableData:ParamTableType[],
            FeesAndCommissionTableData:FeesAndCommissionType[]
        }>) {
            state.basicDetailsData = action.payload.basicDetailsData;
            state.ParamTableData = action.payload.ParamTableData;
            state.FeesAndCommissionTableData = action.payload.FeesAndCommissionTableData
        },
    },
});

// Export actions
export const { setLoginTableData} = loginTableSlice.actions;

// Export reducer
export default loginTableSlice.reducer;