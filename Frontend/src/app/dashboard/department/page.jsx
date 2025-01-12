"use client"

import PrivateNav from "@/components/navs/PrivateNav";
import RegisterDepartment from "./registerDepartment";

export default function Dashboard({children}) {
    return(
    <>
        <PrivateNav>
           <RegisterDepartment/>
        </PrivateNav>    
    </>
    )
}