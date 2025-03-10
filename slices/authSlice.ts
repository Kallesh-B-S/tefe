import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isLoggedIn: boolean
}

const initialState: AuthState = {
    isLoggedIn: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn:(state, action: PayloadAction<boolean>)=>{
        state.isLoggedIn = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setIsLoggedIn} = authSlice.actions

export default authSlice.reducer