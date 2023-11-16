import Loginform from "@/components/loginform";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden flex items-center max-w-full py-12 px-8">
      <Card className="max-w-6xl w-full mx-auto h-[80vh] flex ">
        <div className=" w-1/2 flex px-24  items-center justify-center">
          <div className=" w-full text-center ">
            <h2 className="text-3xl mb-10 font-bold">Zyle</h2>
            <h4 className="text-2xl mb-8 font-bold">
              Welcome Back <br />
              Admin
            </h4>
            <Loginform />
          </div>
        </div>
        <div className="bg-blue-300 w-1/2">2</div>
      </Card>
    </main>
  );
}
