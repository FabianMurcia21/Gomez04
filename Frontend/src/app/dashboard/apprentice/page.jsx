"use client"

import PrivateNav from "@/components/navs/PrivateNav";
import RegisterApprendice from "./registerApprentice";
export default function Dashboard() {
    return(
    <>
        <PrivateNav>
               <RegisterApprendice/>
        </PrivateNav> 
    </>
    )
    
}