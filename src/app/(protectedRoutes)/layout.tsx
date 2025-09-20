import { onAuthenticateUser } from "@/actions/auth";
import Header from "@/components/ReusableComponents/LayoutComponents/Header";
import Sidebar from "@/components/ReusableComponents/LayoutComponents/Sidebar";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const userExist = await onAuthenticateUser();

  if (!userExist.user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex w-full min-h-screen">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col w-full h-screen overflow-auto scrollbar-hide">
        {/* Wrap header + content in a centered container */}
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16">
          <Header user={userExist.user} />
          <div className="flex-1 py-10">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
