import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import LogComponent from "@/components/Tables/Log";

export const metadata: Metadata = {
  title: "홈핏트 – 로그 | Avengers",
  description: "홈핏트 로그 페이지",
};

const Logs = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="로그" />

        <LogComponent />
      </div>
    </DefaultLayout>
  );
};

export default Logs;
