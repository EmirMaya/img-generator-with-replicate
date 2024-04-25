import Image from "next/image";
import React from "react";

const Steps = () => {
  return (
    <div className="m-4">
      <h4 className="text-pink-500 text-center font-mono font-bold text-2xl md:text-5xl">
        How to use?
      </h4>
      <div className="flex flex-col justify-center items-center gap-4 mt-10">
        <div className="bg-slate-100 rounded-sm p-2 shadow-md">
          <h5 className="text-slate-600 text-center text-[28px]">
            Write your prompt
          </h5>
          <Image
            className="rounded-md"
            src={"/step-1.png"}
            alt="step-1"
            width={600}
            height={400}
          />
        </div>
        <div className="bg-slate-100 rounded-sm py-2 px-[58px] shadow-md">
          <h5 className="text-slate-600 text-center text-[28px]">
            And wait for your image!
          </h5>
          <Image
            className="rounded-md"
            src={"/step-2.png"}
            alt="step-2"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Steps;
