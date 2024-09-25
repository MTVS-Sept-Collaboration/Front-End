"use client";
import Link from "next/link";
import React from "react";
import GoogleLoginButton from "../GoogleLoginButton";
import LoginWithPassword from "../LoginWithPassword";

export default function Login() {
  return (
    <>
      <GoogleLoginButton text="Sign in" />

      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          또는 아이디로 로그인
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div>
        <LoginWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          아직 회원이 아니신가요?{" "}
          <Link href="/api/register" className="text-primary">
            회원가입
          </Link>
        </p>
      </div>
    </>
  );
}
