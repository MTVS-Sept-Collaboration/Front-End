import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Signin from "@/components/Auth/Login";

export const metadata: Metadata = {
  title: "홈핏트 – 로그인 | Avengers",
  description: "홈핏트 로그인 페이지",
};

const SignIn: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="로그인" />

      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <Signin />
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
              <Link className="mb-10 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/homefit-logo.svg"}
                  alt="Logo"
                  width={176} // auto로 설정
                  height={32} // auto로 설정
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/homefit-logo.svg"}
                  alt="Logo"
                  width={176} // auto로 설정
                  height={32} // auto로 설정
                />
              </Link>
              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                재미로 가득찬 운동의 시작, 홈핏트
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                실시간으로 함께하는
                메타버스 홈트레이닝
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                홈트, 이제 홈핏트에서 함께해요
              </p>

              <div className="mt-31">
                <Image
                  src={"/images/homefit.png"}
                  alt="Logo"
                  width={792}
                  height={441}
                  className="mx-auto dark:opacity-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignIn;
