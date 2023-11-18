"use client";
import Loginform from "@/components/loginform";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import Lottie from "lottie-react";
import animation1 from "@/public/animation1.json";

export default function Home() {
  useEffect(() => {
    function cleanupfunction() {
      localStorage.getItem("token") && localStorage.removeItem("token");
    }
    cleanupfunction();
  }, []);
  return (
    <main className="min-h-screen  overflow-hidden flex items-center max-w-full py-12 px-8">
      <Card className="max-w-6xl w-full mx-auto min-h-[80vh] py-6 flex flex-col items-center md:flex-row ">
        <div className="w-full md:w-1/2 flex px-16  items-center justify-center">
          <Card className="p-12 w-full text-center bg-[url('/public/assets/login2.jpg')] bg-cover bg-center ">
            <h2 className="text-3xl mb-5 font-bold">Zyle</h2>
            <h4 className="text-2xl mb-8 font-bold">
              Welcome Back <br />
              Admin
            </h4>
            <Loginform />
          </Card>
        </div>
        <div className=" flex items-center justify-center w-1/2 min-h-[1/2] ">
          <div>
            <Lottie className="w-full h-full" animationData={animation1} />
          </div>
        </div>
      </Card>
    </main>
  );
}
