"use client";

import { useState, useEffect } from "react";

export default function UpdateAttendantForm({ attendantToUpdate, updateAttendant }) {
    const [attendantName, setAttendantName] = useState("");
    const [attendantSurname, setAttendantSurname] = useState("");
    const [attendantPhone, setAttendantPhone] = useState("");
    const [attendantAddress, setAttendantAddress] = useState("");
    const [attendantEmail, setAttendantEmail] = useState("");
    const [attendantAge, setAttendantAge] = useState("");

    // Rellenar el formulario con los datos del asistente a actualizar
    useEffect(() => {
        if (attendantToUpdate) {
            setAttendantName(attendantToUpdate.attendant_Name);
            setAttendantSurname(attendantToUpdate.attendant_Surname);
            setAttendantPhone(attendantToUpdate.attendant_Phone);
            setAttendantAddress(attendantToUpdate.attendant_Address);
            setAttendantEmail(attendantToUpdate.attendant_Email);
            setAttendantAge(attendantToUpdate.attendant_Age);
        }
    }, [attendantToUpdate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedAttendant = {
            attendant_Name: attendantName,
            attendant_Surname: attendantSurname,
            attendant_Phone: attendantPhone,
            attendant_Address: attendantAddress,
            attendant_Email: attendantEmail,
            attendant_Age: attendantAge,
        };
        updateAttendant(updatedAttendant, attendantToUpdate.attendant_Id); // Llama a la función para actualizar el asistente
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="attendantName" className="block">Nombre</label>
                <input
                    type="text"
                    id="attendantName"
                    value={attendantName}
                    onChange={(e) => setAttendantName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label htmlFor="attendantSurname" className="block">Apellido</label>
                <input
                    type="text"
                    id="attendantSurname"
                    value={attendantSurname}
                    onChange={(e) => setAttendantSurname(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label htmlFor="attendantPhone" className="block">Teléfono</label>
                <input
                    type="tel"
                    id="attendantPhone"
                    value={attendantPhone}
                    onChange={(e) => setAttendantPhone(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label htmlFor="attendantAddress" className="block">Dirección</label>
                <input
                    type="text"
                    id="attendantAddress"
                    value={attendantAddress}
                    onChange={(e) => setAttendantAddress(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label htmlFor="attendantEmail" className="block">Correo electrónico</label>
                <input
                    type="email"
                    id="attendantEmail"
                    value={attendantEmail}
                    onChange={(e) => setAttendantEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div>
                <label htmlFor="attendantAge" className="block">Fecha de nacimiento</label>
                <input
                    type="date"
                    id="attendantAge"
                    value={attendantAge}
                    onChange={(e) => setAttendantAge(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Actualizar Asistente</button>
        </form>
    );
}
