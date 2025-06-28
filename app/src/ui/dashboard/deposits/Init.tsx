import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";


interface props {
  link:{
    label:string,
    href:string
  }
  children: JSX.Element
}

export default function Init({link,children}:props) {
  return (
    <div className="bg-secondary-color text-white rounded-lg p-8 flex flex-col justify-center min-h-[157px]">
      <Link href={link.href}>
        <div className="mt-4 flex justify-between">
          <div className="flex">
            {children}
            <p className="ml-5 text-xl text-primary-color font-bold">{link.label}</p>
          </div>
        <ArrowRight className="text-primary-color w-8 h-8"/>
      </div>
      </Link>
    </div>
    
  );
}