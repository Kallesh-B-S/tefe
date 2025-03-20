import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from './slice/LoginSlice'
import pieChartReducer from './slice/PieChartSlice'
import loginTableReducer from './slice/LoginTableSlice'
import LoginTableEditReducer from './slice/LoginTableEditSlice'
import TempStateReducer from './slice/TempSlice'

export const makeStore = () => {
    return configureStore({
      reducer: {
        loginForm: LoginReducer,
        pieChart: pieChartReducer,
        loginTable: loginTableReducer,
        loginTableEdit: LoginTableEditReducer,
        tempState: TempStateReducer
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    })
  }

  
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']