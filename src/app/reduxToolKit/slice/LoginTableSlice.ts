// loginSlice.ts
import { domainNameResolver } from "@/app/helper/functions";
import { BasicDetailsType } from "@/app/home/BasicDetailsTable";
import { FeesAndCommissionType } from "@/app/home/FeesAndCommissionTable";
import { ParamTableType } from "@/app/home/ParamTable";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface loginTableType {
    loading: boolean;
    error: string | null;
    basicDetailsData: BasicDetailsType[],
    ParamTableData: ParamTableType[],
    FeesAndCommissionTableData: FeesAndCommissionType[]
}

const initialState: loginTableType = {
    loading: false,
    error: null,
    basicDetailsData: [],
    ParamTableData: [],
    FeesAndCommissionTableData: [],
};

export const LoginUser = createAsyncThunk(
    'loginTable/getHomePageData',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (credentials: any, { rejectWithValue }) => {
        try {
            const domain = domainNameResolver(window.location.hostname)
            const response = await axios.get(`${domain}/oracle/GetHomePageData/${credentials.id}`);
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.response.data); // Handle error response
        }
    }
);

const loginTableSlice = createSlice({
    name: "loginTable",
    initialState,
    reducers: {
        setLoginTableData(state, action: PayloadAction<{
            basicDetailsData: BasicDetailsType[],
            ParamTableData: ParamTableType[],
            FeesAndCommissionTableData: FeesAndCommissionType[]
        }>) {
            state.basicDetailsData = action.payload.basicDetailsData;
            state.ParamTableData = action.payload.ParamTableData;
            state.FeesAndCommissionTableData = action.payload.FeesAndCommissionTableData
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.pending, (state) => {
                state.loading = true; // Set loading to true when the request is pending
                state.error = null; // Clear any previous errors
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false when the request is fulfilled
                console.log("sssssssssss",action.payload);
                
                if (action.payload['p_basic_details']) {
                    state.basicDetailsData = action.payload['p_basic_details'];
                    state.ParamTableData = action.payload['p_param'];
                    state.FeesAndCommissionTableData = action.payload['p_fees_comm'];
                }
                // Handle successful login, e.g., store user data
                // state.user = action.payload; // Uncomment if you have a user state
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.loading = false; // Set loading to false when the request is rejected
                state.error = action.payload as string; // Set error message
            });
    },
});

// Export actions
export const { setLoginTableData } = loginTableSlice.actions;

// Export reducer
export default loginTableSlice.reducer;