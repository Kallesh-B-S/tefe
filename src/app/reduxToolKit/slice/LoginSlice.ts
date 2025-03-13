// loginSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
    p_emailaddr: string | null;
    p_password: string | null;
}

const initialState: LoginState = {
    p_emailaddr: null,
    p_password: null,
};

const loginSlice = createSlice({
    name: "loginForm",
    initialState,
    reducers: {
        setLoginEmail(state, action: PayloadAction<string | null>) {
            state.p_emailaddr = action.payload;
        },
        setLoginPassword(state, action: PayloadAction<string | null>) {
            state.p_password = action.payload;
        },
        clearCredentials(state) {
            state.p_emailaddr = null;
            state.p_password = null;
        },
    },
});

// Export actions
export const { setLoginEmail, setLoginPassword, clearCredentials } = loginSlice.actions;

// Export reducer
export default loginSlice.reducer;