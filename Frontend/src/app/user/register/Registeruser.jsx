
import axiosInstance from "@/lib/axiosInstance";
import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import {MenuItem}  from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LockIcon from "@mui/icons-material/Lock";
import { Button } from "@/components/ui/button";

async function SendData(body) {
  const response = await axiosInstance.post("/api/User/CreateUser", body);
  return response;
}

function Registeruser() {
  async function handlerSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    console.log(form);
    const email = form.get("email");
    const hashedPassword = form.get("hashedPassword");
    const userType = form.get("userType");
    const confirmacion = form.get("confirmacion");

    form.forEach((elemento) => {
      if (elemento === "") {
        alert("Todos los campos son requeridos");
        return false;
      }
    });

    const body = {
      email: email,
      hashedPassword: hashedPassword,
      userType: userType,
      confirmacion: confirmacion,
    };
    if (hashedPassword !== confirmacion) {
      alert("La contraseña y la confirmacion no coinciden.");
      return false;
    }

    try {
      const response = await SendData(body);
      console.log(response);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      // const { errors, status } = error.response.data;

      if (status === 400) {
        alert("el estatus es" + status);
      }
    }
  }
  return (
    <>
      <main>
        <form
          className="register-form shadow-2xl p-6 max-w-sm mx-auto my-5"
          onSubmit={handlerSubmit}
        >
          <div className="flex items-center space-x-4 justify-center">
            <a className="font-serif text-xl">
              <h1>Registrar Usuario</h1>
            </a>
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <img
                className="w-24 m-0 ms-20"
                alt=""
                src="/assets/img/bienesoft.png"
              />
            </motion.div>
          </div>

          <TextField
            label="Tipo de Usuario"
            placeholder="Seleccione tipo de usuario"
            id="userType"
            name="userType"
            required
            select
            fullWidth
            variant="outlined"
            className="form-select w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <MenuItem value="Administrador">Administrador</MenuItem>
            <MenuItem value="Usuario">Aprendiz</MenuItem>
            <MenuItem value="Responsable">Responsable</MenuItem>
          </TextField>

          <TextField
            label="Usuario"
            placeholder="Correo electrónico"
            id="email"
            name="email"
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PermIdentityIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            className="form-email w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mt-4"
          />

          <TextField
            label="Contraseña"
            placeholder="Escriba su contraseña"
            id="password"
            name="password"
            type="password"
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            className="form-password w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mt-4"
          />

          <TextField
            label="Confirmar Contraseña"
            placeholder="Repita su contraseña"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            className="form-confirm-password w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mt-4"
          />

          <Button className="btn btn-primary ms-28 p-5 bg-blue-500 text-white  hover:bg-gray-400">
            Registrar
          </Button>

          <div className="links-container mt-4 text-center">
            <a
              className="link text-blue-500 hover:underline"
              href="/user/login"
            >
              Ya tengo una cuenta
            </a>
          </div>
        </form>
      </main>
    </>
  );
}
export default Registeruser;
