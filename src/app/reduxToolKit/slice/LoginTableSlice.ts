// loginSlice.ts
import { BasicDetailsType } from "@/app/home/BasicDetailsTable";
import { ParamTableType } from "@/app/home/ParamTable";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface loginTableType {
    basicDetailsData : BasicDetailsType[],
    ParamTableData: ParamTableType[],
}

const initialState: loginTableType = {
    basicDetailsData : [],
    ParamTableData : []
};

const loginTableSlice = createSlice({
    name: "loginTable",
    initialState,
    reducers: {
        setLoginTableData(state, action: PayloadAction<{basicDetailsData:BasicDetailsType[],ParamTableData:ParamTableType[]}>) {
            state.basicDetailsData = action.payload.basicDetailsData;
            state.ParamTableData = action.payload.ParamTableData
        },
    },
});

// Export actions
export const { setLoginTableData} = loginTableSlice.actions;

// Export reducer
export default loginTableSlice.reducer;