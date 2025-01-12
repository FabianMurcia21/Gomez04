import React, { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaUsers,
  FaHouseUser,
  FaBuilding,
  FaClipboardList,
  FaCheckCircle,
  FaUsersCog,
  FaListAlt,
  FaMapMarkerAlt,
  
} from "react-icons/fa";
import { GoListUnordered } from "react-icons/go";
import {BiLogOutCircle, BiSolidArrowToLeft} from "react-icons/bi"
import GroupIcon from "@mui/icons-material/Group"
import {MdOutlineMapsHomeWork} from "react-icons/md"
import {TbMapSearch} from "react-icons/tb"
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`flex ${
        isOpen ? "w-64" : "w-20"
      } h-screen bg-slate-100 flex-col transition-all duration-300 `}
    >
      <a onClick={toggleSidebar}>
        {isOpen ? (
          <BiLogOutCircle className="flex text-3xl items-center ms-28 mt-5 text-gray-500 hover:text-[#218EED]" />
        ) : (
          <GoListUnordered className=" text-2xl flex items-center ms-6 mt-5 hover:text-[#218EED]"/>
        )}
      </a>

      <div
        className={`text-xl text-gray-500 font-bold p-3 border-b border-[#218EED]  ${
          isOpen ? "block" : "hidden"
        }`}
      >
        Menú
      </div>

      <ul className="flex flex-col p-4 space-y-4">
        <li>
          <a
            href="/dashboard/attendant"
            className=" text-gray-500 flex items-center space-x-3 p-2 rounded-md hover:bg-[#218EED] hover:text-white"
          >
            <FaUsers className="text-xl text-gray-500 hover:text-white" />
            {isOpen && <span>Acudiente</span>}
          </a>
        </li>
        <li>
          <a
            href="/dashboard/apprentice"
            className="flex items-center text-gray-500 space-x-3 p-2 rounded-md hover:bg-[#218EED] hover:text-white"
          >
            <FaHouseUser className="text-xl text-gray-500 hover:text-white" />
            {isOpen && <span>Aprendiz</span>}
          </a>
        </li>
        <li>
          <a
            href="/dashboard/area"
            className="flex items-center space-x-3 p-2 rounded-md text-gray-500 hover:bg-[#218EED] hover:text-white"
          >
            <FaBuilding className="text-xl text-gray-500 hover:text-white" />
            {isOpen && <span>Area</span>}
          </a>
        </li>
        <li>
          <a
            href="/dashboard/department"
            className="flex items-center space-x-3 p-2 rounded-md text-gray-500 hover:bg-[#218EED] hover:text-white"
          >
            <TbMapSearch className="text-xl text-gray-500 hover:text-white" />
            {isOpen && <span>Departamento</span>}
          </a>
        </li>
        <li>
          <a
            href="/dashboard/file"
            className="flex items-center space-x-3 p-2 rounded-md text-gray-500 hover:bg-[#218EED] hover:text-white"
          >
            <FaListAlt className="text-xl text-gray-500 hover:text-white" />
            {isOpen && <span>Ficha</span>}
          </a>
        </li>
        <li>
          <a
            href="/dashboard/permissionGeneral"
            className="text-gray-500 flex items-center space-x-3 p-2 rounded-md hover:bg-[#218EED] hover:text-white"
          >
            <FaCheckCircle className="text-xl text-gray-500 hover:text-white" />
            {isOpen && <span>Permisos</span>}
          </a>
        </li>
        <li>
          <a
            href="/dashboard/program"
            className="text-gray-500 flex items-center space-x-3 p-2 rounded-md hover:bg-[#218EED] hover:text-white"
          >
            <FaUsersCog className="text-xl text-gray-500 hover:text-white" />
            {isOpen && <span>Programa</span>}
          </a>
        </li>
        <li>
          <a
            href="/dashboard/responsible"
            className="text-gray-500 flex items-center space-x-3 p-2 rounded-md hover:bg-[#218EED] hover:text-white"
          >
            <GroupIcon className="text-xl text-gray-500 hover:text-white" />
            {isOpen && <span>Responsables</span>}
          </a>
        </li>
        <li>
          <a
            href="/dashboard/locality"
            className="text-gray-500 flex items-center space-x-3 p-2 rounded-md hover:bg-[#218EED] hover:text-white"
          >
            <MdOutlineMapsHomeWork className="text-xl text-gray-500 hover:text-white" />
            {isOpen && <span>Localidad</span>}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
