// tempSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TempState {
    p_emailaddr: string | null;
    active_chart_SPID: number | null;
}

const initialState: TempState = {
    p_emailaddr: null,
    active_chart_SPID: null
};

const tempSlice = createSlice({
    name: "tempState",
    initialState,
    reducers: {
        set_p_emailaddr(state, action:PayloadAction<string|null>){
            state.p_emailaddr = action.payload;
        },
        set_active_chart_SPID(state, action:PayloadAction<number | null>){
            state.active_chart_SPID = action.payload;
        },
        clearTempState(state){
            state.p_emailaddr = null;
            state.active_chart_SPID = null;
        }
    },
});

// Export actions
export const { set_p_emailaddr, set_active_chart_SPID, clearTempState } = tempSlice.actions;

// Export reducer
export default tempSlice.reducer;