"use client";
import Loginform from "@/components/loginform";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import Lottie from "lottie-react";
import animation1 from "@/public/animation1.json";
import { ArrowRightSquare } from "lucide-react";

export default function Home() {
  useEffect(() => {
    function cleanupfunction() {
      localStorage.getItem("token") && localStorage.removeItem("token");
    }
    cleanupfunction();
  }, []);
  return (
    <main className="min-h-screen bg-[url('/assets/ftuy4.jpg')]  bg-cover bg-center overflow-hidden flex  items-center max-w-full py-12 px-2 md:px-8">
      <Card className="max-w-6xl w-full  mx-auto  min-h-[80vh] py-6 flex flex-col gap-y-4 items-center md:flex-row ">
        <div className="w-full md:w-1/2 flex px-6 md:px-16  items-center justify-center">
          <Card className="p-8 w-full text-center   bg-[url('/assets/login3.jpg')]   bg-cover bg-center ">
            <div className="bg-slate-800 bg-opacity-60 p-4 rounded-lg">
              <h2 className="text-3xl mb-5 font-bold text-white">Zyle</h2>
              <h4 className="text-2xl mb-8 font-bold text-white">
                Welcome Back <br />
                Admin
              </h4>
              <Loginform />
            </div>
          </Card>
        </div>
        <div className=" flex items-center justify-center flex-col w-1/2 min-h-[1/2] ">
          <div className="w-[25%] mx-auto  flex  items-center justify-center">
            <div className="flex flex-col  p-4 border-r-2 border-slate-400">
              <p className="text-5xl border-b-2 border-r-2 border-slate-400">
                Z
              </p>
              <p className="text-5xl">L</p>
            </div>
            <div className="flex flex-col  p-4">
              <p className="text-5xl border-b-2 border-slate-400">Y</p>
              <p className="text-5xl border-l-2 border-slate-400">E</p>
            </div>
          </div>
          <div>
            <Lottie
              className="w-3/4 min-w-[20rem] mx-auto  h-full"
              animationData={animation1}
            />
          </div>
          <p className="flex gap-3 mt-2">
            Update 16.1.2 Is Available Now <ArrowRightSquare />
          </p>
        </div>
      </Card>
    </main>
  );
}
