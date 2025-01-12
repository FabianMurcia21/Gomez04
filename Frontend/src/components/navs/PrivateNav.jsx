"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";  // Icono de Configuración
import ExitToAppIcon from "@mui/icons-material/ExitToApp";  // Icono de Cerrar sesión
import styles from "./Stylos.module.css";
import Sidebar from "./sidebar";
import { BiUserCircle } from "react-icons/bi";

function PrivateNav({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Para manejar el estado del menú desplegable

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Cambiar el estado para mostrar u ocultar el menú
  };

  return (
    <>
      <div className="flex h-screen bg-slate-100 shadow-lg">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <nav className="bg-slate-100 shadow-sm">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
              <a className="flex items-center" href="">
                <motion.div
                  initial={{ x: "-100vw" }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 90 }}
                  whileHover={{ scale: 1.3, rotate: 1 }}
                >
                  <img
                    src="/assets/img/logo.png"
                    alt="Bienesoft Logo"
                    style={{ width: "170px", height: "auto" }}
                  />
                </motion.div>
              </a>
              <div className="flex space-x-6">
                {/* Enlaces con hover effect */}
                <a href="" className="text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-md">
                  ¿Quiénes Somos?
                </a>
                <a href="" className="text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-md">
                  Contactos
                </a>
                <a href="" className="text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-md">
                  Documentos
                </a>

                {/* Icono Person para abrir el menú de Configuración y Cerrar sesión */}
                <div className="relative">
                  <button
                    onClick={toggleMenu}
                    className="text-gray-800  space-x-2 "
                  >  
                    <BiUserCircle className="text-3xl mt-2 text-blue-500" />
                  </button>

                  {/* Menú desplegable */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 p-2">
                      <ul className="space-y-2">
                        {/* Opción de Configuración con Icono */}
                        <li>
                          <a
                            href="/configuracion"
                            className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md flex items-center space-x-3"
                          >
                            <SettingsIcon/>
                            <span>Configuración</span>
                          </a>
                        </li>

                        {/* Opción de Cerrar Sesión con Icono */}
                        <li>
                          <a
                            href="/logout"
                            className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md flex items-center space-x-3"
                          >
                            <ExitToAppIcon />
                            <span>Cerrar Sesión</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
          <main className="flex-1 bg-white ">{children}</main>
        </div>
      </div>
    </>
  );
}

export default PrivateNav;
