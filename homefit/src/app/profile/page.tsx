import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProfileBox from "@/components/ProfileBox";

export const metadata: Metadata = {
  title: "홈핏트 – 프로필 | Avengers",
  description: "홈핏트 프로필 페이지",
};

const Profile = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="프로필" />

        <ProfileBox />
      </div>
    </DefaultLayout>
  );
};

export default Profile;
