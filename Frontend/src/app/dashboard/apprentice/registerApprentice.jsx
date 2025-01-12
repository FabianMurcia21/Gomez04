"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { motion } from "framer-motion";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AtIcon from "@mui/icons-material/AlternateEmail";
import React, { useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DescriptionIcon from "@mui/icons-material/Description";
import WcIcon from "@mui/icons-material/Wc";

async function Login(credentials) {
  const reponse = await axiosInstance.post("/api/user/Login", credentials);
  return reponse;
}

function RegisterApprendice() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Apprentice_Id: "",
    Apprentice_Name: "",
    Apprentice_Phone: "",
    Apprentice_Type: "",
    Attendant_Id: "",
    File_Id: "",
    Apprentice_Email: "",
    Apprentice_Address: "",
    Apprentice_Sex: "",
    Locality_Id: "",
    Document_Type: "",
    Disability: "",
    Stackor_Permissions: 0,
  });

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData);
      const response = await axiosInstance.post(
        "/Api/Apprentice/Create",
        formData
      );
      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="shadow-2xl bg-white p-8 rounded-lg w-fulx|l max-w-4xl"
        >
          <h3 className="text-xl font-serif text-center mb-6">
            Formulario de Gestión de Aprendiz
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Tipo de Documento"
              select
              id="Document_Type"
              name="Document_Type"
              value={formData.Document_Type}
              onChange={(e) =>
                setFormData({ ...formData, Document_Type: e.target.value })
              }
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WcIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              className="mb-4"
              required
              SelectProps={{
                displayEmpty: true,
              }}
            >
              <MenuItem value="" disabled>
                <em className="text-gray-300">Seleccione una Opción</em>
              </MenuItem>
              <MenuItem value="CC">C.C.</MenuItem>
              <MenuItem value="TD">T.D.</MenuItem>
              <MenuItem value="otro">Otro</MenuItem>
            </TextField>
            <TextField
              label="Número de Documento"
              id="id"
              name="id"
              value={formData.Apprentice_Id}
              onChange={(e) =>
                setFormData({ ...formData, Apprentice_Id: e.target.value })
              }
              placeholder="Ingrese el ID"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PermIdentityIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              className="mb-4"
              required
            />
            <TextField
              label="Nombre"
              id="nombre"
              name="nombre"
              value={formData.Apprentice_Name}
              onChange={(e) =>
                setFormData({ ...formData, Apprentice_Name: e.target.value })
              }
              placeholder="Ingrese su nombre completo"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PermIdentityIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              className="mb-4"
              required
            />
            <TextField
              label="Teléfono"
              id="telefono"
              name="telefono"
              value={formData.Apprentice_Phone}
              onChange={(e) =>
                setFormData({ ...formData, Apprentice_Phone: e.target.value })
              }
              placeholder="Ingrese su teléfono"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              className="mb-4"
              required
            />
            <TextField
              label="Correo"
              id="correo"
              name="correo"
              value={formData.Apprentice_Email}
              onChange={(e) =>
                setFormData({ ...formData, Apprentice_Email: e.target.value })
              }
              placeholder="Ingrese su correo electrónico"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AtIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              className="mb-4"
              required
            />
            <TextField
              label="Dirección"
              id="direccion"
              name="direccion"
              value={formData.Apprentice_Address}
              onChange={(e) =>
                setFormData({ ...formData, Apprentice_Address: e.target.value })
              }
              placeholder="Ingrese su dirección"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              className="mb-4"
              required
            />
            <TextField
              label="Acudiente"
              id="acudiente"
              name="acudiente"
              value={formData.Attendant_Id}
              onChange={(e) =>
                setFormData({ ...formData, Attendant_Id: e.target.value })
              }
              placeholder="Ingrese nombre del acudiente"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AssignmentIndIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              className="mb-4"
              required
            />
            <TextField
              label="Ficha"
              id="ficha"
              name="ficha"
              value={formData.File_Id}
              onChange={(e) =>
                setFormData({ ...formData, File_Id: e.target.value })
              }
              placeholder="Ingrese la ficha"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              className="mb-4"
              required
            />
            <TextField
              label="Localidad"
              id="localidad"
              name="localidad"
              value={formData.Locality_Id}
              onChange={(e) =>
                setFormData({ ...formData, Locality_Id: e.target.value })
              }
              placeholder="Ingrese localidad"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              className="mb-4"
              required
            />
            <TextField
              label="Sexo"
              select
              id="sexo"
              name="sexo"
              value={formData.Apprentice_Sex}
              onChange={(e) =>
                setFormData({ ...formData, Apprentice_Sex: e.target.value })
              }
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WcIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              className="mb-4"
              required
              SelectProps={{
                displayEmpty: true,
              }}
            >
              <MenuItem value="" disabled>
                <em className="text-gray-300">Seleccione una Opción</em>
              </MenuItem>
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="femenino">Femenino</MenuItem>
              <MenuItem value="otro">Otro</MenuItem>
            </TextField>

            <TextField
              label="Tipo de Aprendiz"
              select
              id="aprendiz"
              name="aprendiz"
              value={formData.Apprentice_Type}
              onChange={(e) =>
                setFormData({ ...formData, Apprentice_Type: e.target.value })
              }
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PermIdentityIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              className="mb-4"
              required
              SelectProps={{
                displayEmpty: true,
              }}
            >
              <MenuItem value="" disabled>
                <em className="text-gray-300">Seleccione una Opción</em>
              </MenuItem>
              <MenuItem value="interno">Interno</MenuItem>
              <MenuItem value="externo">Externo</MenuItem>
            </TextField>

            <div className="mb-4">
              <label className="text-sm">¿Discapacidad?</label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="discapacidad"
                    value="1"
                    checked={formData.Disability === "1"}
                    onChange={(e) =>
                      setFormData({ ...formData, Disability: e.target.value })
                    }
                    className="mr-2"
                  />
                  Sí
                </label>
                <label>
                  <input
                    type="radio"
                    name="discapacidad"
                    value="0"
                    checked={formData.Disability === "0"}
                    onChange={(e) =>
                      setFormData({ ...formData, Disability: e.target.value })
                    }
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
          </div>
          <button
            className="w-full mt-6 bg-black text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-sky-600"
            type="submit"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Guardar Aprendiz"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default RegisterApprendice;
