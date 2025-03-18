"use client"

import RouteButton from "./components/RouteBtn";
import React, { useEffect } from 'react';
// import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import { useAppDispatch } from "./reduxToolKit/hooks";
import { clearCredentials, setLoginEmail, setLoginError, setLoginPassword } from "./reduxToolKit/slice/LoginSlice";
import { RootState } from "./reduxToolKit/store";
import Navbar from "./components/nav/Navbar";
import { domainNameResolver } from "./helper/functions";
import axios from "axios";



export default function Home() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch()
  // const selector = useAppSelector(state=>state.loginForm);
  const loginFormSelector = useSelector((state: RootState) => state.loginForm)

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setEmail(e.target.value);
    dispatch(setLoginEmail(e.target.value))
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setPassword(e.target.value);
    dispatch(setLoginPassword(e.target.value))
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      // const domain = domainNameResolver(window.location.hostname)
      // const response = await axios.post(`${domain}/auth/login`,
      //   { p_emailaddr: loginFormSelector.p_emailaddr, p_password: loginFormSelector.p_password });

      // console.log("response ----------------------", response);
      // if (response.data.msg) {
      //   router.push('/home');
      //   // dispatch(setPieChartData(response.data.chartResult))
      //   dispatch(clearCredentials())
      // }
      // else if (response.data.error) {
      //   dispatch(setLoginError(response.data.error))
      //   // dispatch(clearCredentials())
      //   // router.push('/');
      // }

      router.push('/home');
      
      // router.push('/home'); // Redirect to /ab page after submission
      // console.log(loginFormSelector);

    } catch (error) {
      console.error('Error sending data:', error);
    }

    // console.log("data",email,password);

  };


  useEffect(() => {
    // If there's an error, set a timeout to clear it after 5 seconds
    if (loginFormSelector.error) {
      const timer = setTimeout(() => {
        dispatch(setLoginError(null));
      }, 3000);

      // Cleanup the timer on component unmount or when error changes
      return () => clearTimeout(timer);
    }
  }, [loginFormSelector.error]);

  return (
    <>
      <div>
        <Navbar />
        {/* <div className="navbar sticky top-0 h-[100px] md:h-[80px] w-full flex justify-center items-center md:justify-start md:space-x-10 bg-[#FFFFFF] select-none">
          <div className="navbarIcom block md:hidden absolute top-10 left-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="#5c7b7d" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <div className="navbarImage w-[60px] h-[60px] md:ml-10 xl:ml-32">
            <img src={"/img/landingPage/uscib_logo_green_type2-square.jpg"} alt="" className="w-full h-full" />
          </div>
          <div className="navbarItems hidden md:block md:flex-grow md:justify-end font-oswald tc1 text-[15px] font-extrabold">
            <div className="flex justify-end space-x-10 pr-10 xl:pr-32">
              <div className="!cursor-pointer">Home</div>
              <div className="!cursor-pointer">About</div>
            </div>
          </div>
        </div> */}
        <div className="signin" />
        <div className="pageDescription bg-[#f4f4f4] md:px-5 py-1">
          <div className="mx-8 my-5">
            <h1 className="text-[black] font-bold mb-5">Welcome to USCIB Carnet portal!</h1>
            <div className="mb-5 flex justify-center">
              <div className="bg-gray-200 p-2 md:p-5 md:w-[40%] lg:w-[25%] font-roboto select-none rounded-md">
                {loginFormSelector.error && <div className="text-red-500 flex justify-center">{loginFormSelector.error}</div>}
                <div className="flex justify-center text-[1.2rem] font-bold">Sign in</div>
                <div className="flex flex-col gap-1">
                  <div className=""><label htmlFor="loginEmail">Email</label></div>
                  <div><input
                    value={loginFormSelector?.p_emailaddr ? loginFormSelector?.p_emailaddr : ""}
                    onChange={handleChangeEmail}
                    // onFocus={()=>dispatch(clearLoginError())}
                    type="text" className="bg-[#FFFFFF] w-full outline-0 border-0 p-1 rounded-md" id="loginEmail" /></div>
                  <div>Password</div>
                  <div><input
                    value={loginFormSelector?.p_password ? loginFormSelector?.p_password : ""}
                    onChange={handleChangePassword}
                    // onFocus={()=>dispatch(clearLoginError())}
                    type="password" className="bg-[#FFFFFF] w-full outline-0 border-0 p-1 rounded-md" /></div>
                  <div className="flex justify-end mt-1">
                    {/* <button type="button" className="bg-[#FFFFFF] w-[3.5rem]  rounded-sm pb-1 !cursor-pointer font-bold text-gray-600 active:bg-green-900 active:text-white hover:text-green-900">Login</button> */}
                    <RouteButton onClick={handleSubmit} name={"Login"} className="bg-[#FFFFFF] w-[3.5rem]  rounded-sm p-0.5 !cursor-pointer font-bold text-gray-600 active:bg-white active:text-black active:font-normal hover:bg-black hover:text-white hover:font-normal" />
                  </div>
                  <div className="flex justify-end text-[0.7rem] "><span className="!cursor-pointer">Forgot Password?</span></div>
                  <div className="text-sm">Dont have an account? Register</div>
                </div>
              </div>
            </div>
            <h2 className="text-[black] font-bold mb-5">ATA Carnet: Your Passport for Duty-Free Global Trade</h2>
            <div className="flex-col gap-y-10">
              <p className="text-justify">ATA Carnet, also known as the &quot;Merchandise Passport,&quot; is an international customs document that simplifies temporary exports to over 79 countries and territories. It allows businesses—especially micro, small, and medium-sized enterprises (MSMEs)—to explore new markets, showcase products at trade shows, and attend global conferences without paying duties or taxes. Save time, reduce costs, and expand your business effortlessly with the ATA Carnet.</p>
              <p className="text-justify">It simplifies customs procedures for the temporary movement of goods and allows goods to enter Customs territories of the ATA Carnet system free of customs duties and taxes for up to one year.</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
