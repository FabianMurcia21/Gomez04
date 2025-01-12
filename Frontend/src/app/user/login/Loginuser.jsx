"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import LockIcon from "@mui/icons-material/Lock";
import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AtIcon from '@mui/icons-material/AlternateEmail';
import { useState } from "react";

async function Login(credentials) {
  const response = await axiosInstance.post("/api/User/Login", credentials);
  return response; 
}

function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setError("");
    // setLoading(true); 

    const credentials = {
      email: email,
      hashedPassword: password,
    };

    try {
      const responseLogin = await Login(credentials);
      console.log(responseLogin);
      if (responseLogin.status === 200) {
        localStorage.setItem("token", responseLogin.data.token);
        router.push("../dashboard");
      }
    } catch (error) {
      console.log(error);
      setError(error.response ? error.response.data.message : "Error desconocido");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <main className="">
        <form
          className="login-form shadow-2xl p-6 max-w-sm mx-auto my-16 rounded-2xl "
          onSubmit={handleSubmit}
        >
          <div className="flex items-center space-x-3 justify-center -mt-5  ">
            <motion.div
              animate={{ y: [0, -5, 0], opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <img
                className="w-24 m-0 flex items-center"
                alt=""
                src="/assets/img/bienesoft.png"
              />
            </motion.div>
          </div>
          <a className="font-bold text-3xl flex ms-20 mb-6 -mt-1">
            <h1>Iniciar Sesion</h1>
          </a>

          <TextField
            label="Usuario"
            placeholder="ejemplo@gmail.com"
            id="email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
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
            className="form-email w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />

          <TextField
            label="Contraseña"
            placeholder="Contraseña"
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="emailHelp"
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
            className="form-email w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mt-4"
          />

          <Button  className="btn btn-primary ms-28 p-5 bg-blue-500 text-white hover:bg-gray-400"
          disabled={loading}>
          {loading ? "Cargando..." : "Ingresar"}
          </Button>
          {/* <a className={styles.btn}
            href='/user/login' type="button">
            Ingresar
          </a> */}
          
          <div className="flex flex-col items-center space-y-2 mt-5">
            <a
              href="/user/resetear"
              className="text-sm text-blue-600 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
            <div className="flex space-x-2">
              <span className="text-gray-500">¿No tienes cuenta?</span>
              <a
                href="/user/register"
                className="text-sm text-blue-600 hover:underline"
              >
                Crear cuenta
              </a>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

export default LoginPage;
