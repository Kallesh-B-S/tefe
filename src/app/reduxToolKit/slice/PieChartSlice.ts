// loginSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface pieChartState {
    data : []
}

const initialState: pieChartState = {
    data : []
};

const pieChartSlice = createSlice({
    name: "pieChart",
    initialState,
    reducers: {
        setPieChartData(state, action: PayloadAction<[]>) {
            state.data = action.payload;
        },
    },
});

// Export actions
export const { setPieChartData} = pieChartSlice.actions;

// Export reducer
export default pieChartSlice.reducer;