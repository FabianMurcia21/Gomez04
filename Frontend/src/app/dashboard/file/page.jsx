"use client"

import PrivateNav from "@/components/navs/PrivateNav";
import RegisterFile from "./registerFile";

export default function Dashboard({children}) {
    return(
    <>
        <PrivateNav>
           <RegisterFile/>
        </PrivateNav>    
    </>
    )
}