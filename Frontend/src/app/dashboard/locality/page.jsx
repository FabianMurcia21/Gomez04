"use client"

import PrivateNav from "@/components/navs/PrivateNav";
import RegisterLocality from "./registerLocality";


export default function Dashboard() {
    return(
    <>
        <PrivateNav>
            <RegisterLocality/>    
        </PrivateNav> 
    </>
    )
    
}