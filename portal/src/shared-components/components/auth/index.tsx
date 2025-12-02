import React from "react";
import Loader from "../../../components/loader/Loader";
import { logo } from "../../../assets/img";

interface LoginProps {
  email: string;
  password: string;
  error: {
    em: string;
    passwd: string;
  };
  loading: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: () => void;
}

export default function LoginComponent({
  email,
  password,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onLogin,
}: LoginProps) {
  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-center items-center px-4 w-screen h-screen auth-bg">
        <div className="flex flex-col justify-between bg-white p-[50px] rounded-[16px] w-full max-w-[385px] h-full max-h-[490px]">
          <div>
            <div className="m-auto max-w-[175px] max-h-[85px] text-center">
              <img
                src={logo}
                className="w-full h-full object-contain"
                alt="Eiris logo"
              />
            </div>
            <h2 className="mt-3 font-[400] font-fsecondary text-[22px] text-bprimary text-center not-italic leading-[140%]">
              Sign in to Eiris
            </h2>
          </div>

          <div className="mt-2">
            <div className="flex flex-col gap-3 mx-auto w-[240px]">
              {/* Email */}
              <div>
                <input
                  value={email}
                  className="shadow-sm px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md focus:outline-none focus:ring-[#cfe2ff] focus:ring-4 w-full"
                  onChange={onEmailChange}
                  // className="px-3 py-2 border border-bprimary focus:border-textPrimary rounded focus:outline-none focus:ring-2 focus:ring-bprimary/20 w-full h-[45px] font-[400] text-[#555] text-[14px] leading-[140%]"
                  placeholder="Email"
                  type="text"
                />
                <div className="text-red-500 text-xs">{error.em}</div>
              </div>

              {/* Password */}
              <div>
                <input
                  value={password}
                  onChange={onPasswordChange}
                  className="shadow-sm px-3 py-2 border border-[#ced4da] focus:border-[#86b7fe] rounded-md focus:outline-none focus:ring-[#cfe2ff] focus:ring-4 w-full"
                  // className="px-3 py-2 border border-textPrimary focus:border-textPrimary rounded focus:outline-none focus:ring-2 focus:ring-textPrimary/20 w-full h-[45px] font-[400] text-[#555] text-[14px] leading-[140%]"
                  placeholder="Password"
                  type="password"
                />
                <div className="text-red-500 text-xs">{error.passwd}</div>
              </div>

              {/* Login Button */}
              <div className="flex justify-center mt-4">
                <div
                  className="rounded-[4px] w-[240px] h-[45px] primaryc-btn"
                  onClick={onLogin}
                >
                  Login
                </div>
              </div>
            </div>

            <h5 className="hover:opacity-[0.8] mt-2 font-[500] text-[14px] text-bsecondary text-center leading-[140%] cursor-pointer">
              Forgot Password?
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
