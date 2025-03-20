'use client'

import { domainNameResolver } from "@/app/helper/functions";
import axios from "axios";
import { AppDispatch } from "../store";
import { setPieChartData } from "../slice/PieChartSlice";
import { LoginUser, setLoginTableData } from "../slice/LoginTableSlice";
import { cancelAll, loginTableEditType } from "../slice/LoginTableEditSlice";
import { LoginState } from "../slice/LoginSlice";
import { TempState } from "../slice/TempSlice";

export const getCarnetSummaryData = async (
    dispatch: AppDispatch,
    setError: (error: string | null) => void,
    setLoading: (isLoading: boolean) => void,
    LoginData:LoginState
) => {
    try {
        const domain = domainNameResolver(window.location.hostname)
        const response = await axios.get(`${domain}/oracle/GetCarnetSummaryData/${LoginData.p_emailaddr}`);
        console.log("response ----------------------", response);
        if (response.data) {
            dispatch(setPieChartData(response.data))
        }

    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError(new Error('An unknown error occurred').message);
        }
    } finally {
        setLoading(false);
    }
};

export const getHomePageData = async (
    dispatch:AppDispatch,
    id: number
) => {
    try {
        const domain = domainNameResolver(window.location.hostname)
        const response = await axios.get(`${domain}/oracle/GetHomePageData/${id}`);
        // const response = await axios.get(`${domain}/data/${id}`);
        // console.log("response ----------------------", response);
        if (response.data.data['p_basic_details']) {
            dispatch(setLoginTableData(
                {
                    basicDetailsData: response.data.data['p_basic_details'],
                    ParamTableData: response.data.data['p_param'],
                    FeesAndCommissionTableData: response.data.data['p_fees_comm']
                }
            ))
        }
    } catch (error) {
        console.log(error);
        
    }
}

export const saveEdited = async (
    dispatch:AppDispatch,
    LoginTableEditData:loginTableEditType,
    TempData:TempState,
    commissionRate:string,
    effectiveDate:string
)=>{
    try {
        const domain = domainNameResolver(window.location.hostname)
        console.log(LoginTableEditData);
        
        // const response = await axios.get(`${domain}/oracle/GetHomePageData/${id}`);
        const response = await axios.patch(`${domain}/oracle/UpdateFeeComm`, {
            p_fees_comm: {
                P_FEECOMMID: LoginTableEditData?.feesAndCommissionEditData?.toBeEditedData?.p_fees_comm[0]?.FEECOMMID,
                // FEE_TYPE: feeType,
                // FEE_DESCRIPTION: description,
                P_RATE: commissionRate,
                P_EFFDATE: effectiveDate,
                P_USERID: TempData.p_emailaddr

            }
        }, {
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        });
        if(response.statusText === 'OK'){
            dispatch(cancelAll())
            dispatch(LoginUser ({id:TempData.active_chart_SPID}))
        }
    
    } catch (error) {
        console.log(error);
        
    }
}

export const saveAll = async (
    dispatch:AppDispatch,
    LoginTableEditData:loginTableEditType,
)=>{
    try {
        const domain = domainNameResolver(window.location.hostname)
        console.log(LoginTableEditData);
        
        // const response = await axios.get(`${domain}/oracle/GetHomePageData/${id}`);
        const response = await axios.post(`${domain}/postdata/${LoginTableEditData?.feesAndCommissionEditData?.toBeEditedData?.p_fees_comm[0]?.FEECOMMID}`, {
                data1:LoginTableEditData.feesAndCommissionEditData.editedData
        }, {
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        });
        if(response.statusText === 'OK'){
            dispatch(cancelAll())
        }
    
    } catch (error) {
        console.log(error);
        
    }
}