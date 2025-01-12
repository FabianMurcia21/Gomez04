"use client";

import { useEffect, useState } from "react";
import PrivateNav from "@/components/navs/PrivateNav";
import ContecPage from "@/components/utils/ContectPage";
import RegisterAttendant from "./registerAttendant"; // Formulario para crear nuevos asistentes
import UpdateAttendantForm from "./UpdateAttendantForm"; // Formulario para actualizar un asistente
import axiosInstance from "@/lib/axiosInstance";

export default function AttendantDashboard() {
    const [dataAttendant, setDataAttendant] = useState([]); // Lista de asistentes
    const [attendantToUpdate, setAttendantToUpdate] = useState(null); // Estado para asistente a actualizar
    const titlesAttendant = ["Listado de Asistentes", "Registro de Asistentes"];

    // Obtener asistentes desde el backend
    useEffect(() => {
        const fetchDataAttendant = async () => {
            try {
                const response = await axiosInstance.get("api/Attendant/AllAttendant");
                if (response.status !== 200) {
                    throw new Error("Error al cargar los asistentes");
                }
                setDataAttendant(response.data);
            } catch (error) {
                console.error("Error fetching attendants:", error);
            }
        };

        fetchDataAttendant();
    }, []);

    // Eliminar asistente
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este registro?");
        if (!confirmDelete) return;

        try {
            const response = await axiosInstance.delete(`api/Attendant/DeleteAttendant`, {
                data: { id }, // Enviamos el ID del asistente en el cuerpo de la solicitud
            });
            if (response.status === 200) {
                setDataAttendant((prevData) => prevData.filter((attendant) => attendant.attendant_Id !== id));
                alert("Asistente eliminado exitosamente");
            } else {
                throw new Error(`Error al eliminar el asistente: ${response.status}`);
            }
        } catch (error) {
            console.error("Error eliminando el asistente:", error);
            alert("Hubo un problema al eliminar el asistente");
        }
    };

    // Seleccionar asistente para actualizar
    const handleUpdate = (id) => {
        const attendant = dataAttendant.find((attendant) => attendant.attendant_Id === id);
        if (attendant) {
            setAttendantToUpdate({ ...attendant }); // Copia los datos del asistente
        } else {
            alert("Asistente no encontrado");
        }
    };

    // Actualizar asistente
    const updateAttendant = async (updatedAttendantData, id) => {
        const {
            attendant_Name,
            attendant_Surname,
            attendant_Phone,
            attendant_Address,
            attendant_Email,
            attendant_Age
        } = updatedAttendantData;

        try {
            const response = await axiosInstance.put(`api/Attendant/UpdateAttendant`, {
                attendant_Id: id,
                attendant_Name,
                attendant_Surname,
                attendant_Phone,
                attendant_Address,
                attendant_Email,
                attendant_Age,
            });
            if (response.status === 200) {
                setDataAttendant((prevData) =>
                    prevData.map((attendant) =>
                        attendant.attendant_Id === id ? { ...attendant, ...updatedAttendantData } : attendant
                    )
                );
                setAttendantToUpdate(null); // Limpia el estado del asistente a actualizar
                alert("Asistente actualizado exitosamente");
            } else {
                throw new Error(`Error al actualizar el asistente: ${response.status}`);
            }
        } catch (error) {
            console.error("Error actualizando el asistente:", error);
            alert("Hubo un problema al actualizar el asistente");
        }
    };

    return (
        <>
            <PrivateNav>
                <ContecPage
                    titlesData={titlesAttendant}
                    Data={dataAttendant}
                    TitlePage={"Listado de Asistentes"}
                    FormComponent={attendantToUpdate ? UpdateAttendantForm : RegisterAttendant} // Renderiza el formulario correcto
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    attendantToUpdate={attendantToUpdate}
                    updateAttendant={updateAttendant}
                />
            </PrivateNav>
        </>
    );
}
