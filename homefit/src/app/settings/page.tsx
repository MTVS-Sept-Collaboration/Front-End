import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SettingBoxes from "@/components/SettingBoxes";

export const metadata: Metadata = {
  title: "홈핏트 – 계정 관리 | Avengers",
  description: "홈핏트 계정 관리 페이지",
};

const Settings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="계정 관리" />

        <SettingBoxes />
      </div>
    </DefaultLayout>
  );
};

export default Settings;
