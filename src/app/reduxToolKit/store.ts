import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from './slice/LoginSlice'
import pieChartReducer from './slice/PieChartSlice'
import loginTableReducer from './slice/LoginTableSlice'


export const makeStore = () => {
    return configureStore({
      reducer: {
        loginForm: LoginReducer,
        pieChart: pieChartReducer,
        loginTable: loginTableReducer
      },
    })
  }

  
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']