// loginSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
    p_emailaddr: string | null;
    p_password: string | null;
    error: string | null;
}

const initialState: LoginState = {
    p_emailaddr: null,
    p_password: null,
    // error:"Invalid username or password!"
    error:null
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
        setLoginError(state, action: PayloadAction<string | null>){
            state.error = action.payload
        },
        clearLoginError(state){
            state.error = null;
        }
    },
});

// Export actions
export const { setLoginEmail, setLoginPassword, clearCredentials, setLoginError, clearLoginError } = loginSlice.actions;

// Export reducer
export default loginSlice.reducer;