"use client";

import { useEffect, useState } from "react";
import PrivateNav from "@/components/navs/PrivateNav";
import ContecPage from "@/components/utils/ContectPage";
import ProgramForm from "./programFord";
import UpdateForm from "./UpdateProgram";
import axiosInstance from "@/lib/axiosInstance";

export default function Dashboard() {
    const [dataProgram, setDataProgram] = useState([]); // Lista de programas
    const [programToUpdate, setProgramToUpdate] = useState(null); // Estado para programa a actualizar
    const titlesProgram = ["Programas de Formación", "Registro de Programas"];

    // Obtener programas desde el backend
    useEffect(() => {
        const fetchDataProgram = async () => {
            try {
                const response = await axiosInstance.get("api/Program/AllPrograms");
                if (response.status !== 200) {
                    throw new Error("Error al cargar los programas");
                }
                setDataProgram(response.data);
            } catch (error) {
                console.error("Error fetching programs:", error);
            }
        };

        fetchDataProgram();
    }, []);

    // Eliminar programa
    const handleDelete = async (id) => {
        // console.log(id)
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este registro?");
        if (!confirmDelete) return;

        try {
            const response = await axiosInstance.delete(`api/Program/DeleteProgram?id=${id}`);
            if (response.status === 200) {
                setDataProgram((prevData) => prevData.filter((program) => program.program_Id !== id));
                alert("Programa eliminado exitosamente");
            } else {
                throw new Error(`Error al eliminar el programa: ${response.status}`);
            }
        } catch (error) {
            console.error("Error eliminando el programa:", error);
            alert("Hubo un problema al eliminar el programa");
        }
    };

    // Seleccionar programa para actualizar
    const handleUpdate = (id) => {
        const program = dataProgram.find((program) => program.program_Id === id);
        if (program) {
            setProgramToUpdate({ ...program }); // Copia los datos del programa
        } else {
            alert("Programa no encontrado");
        }
    };

    // Actualizar programa
    const updateProgram = async (updatedProgramName, id) => {
        try {
            const response = await axiosInstance.put(`api/Program/UpdateProgram?id=${id}`, {
                program_Name: updatedProgramName,
            });
            if (response.status === 200) {
                setDataProgram((prevData) =>
                    prevData.map((program) =>
                        program.program_Id === id ? { ...program, programName: updatedProgramName } : program
                    )
                );
                setProgramToUpdate(null); // Limpia el estado del programa a actualizar
                alert("Programa actualizado exitosamente");
            } else {
                throw new Error(`Error al actualizar el programa: ${response.status}`);
            }
        } catch (error) {
            console.error("Error actualizando el programa:", error);
            alert("Hubo un problema al actualizar el programa");
        }
    };

    return (
        <>
            <PrivateNav>
                <ContecPage
                    titlesData={titlesProgram}
                    Data={dataProgram}
                    TitlePage={"Listado de Programas"}
                    FormComponent={programToUpdate ? UpdateForm : ProgramForm} // Renderiza el formulario correcto
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    programToUpdate={programToUpdate}
                    updateProgram={updateProgram}
                />
            </PrivateNav>
        </>
    );
}
