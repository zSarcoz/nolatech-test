"use client"

import Image from "next/image"
import Link from "next/link"

import { TextField, InputAdornment, IconButton } from "@mui/material"
import logo from "../../../assets/images/logos/nolatech-logo.png"

import CustomButton from "@/app/_components/Button/Button"

import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import useStates from "./useStates/useStates"
export default function Login() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error,
    handleSubmit,
    handleLogin,
  } = useStates()

  return (
    <div className="w-full h-screen">
      <div className="w-full flex h-full z-40 absolute">
        <div className="h-dvh relative hidden w-full lg:block">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/60 hidden lg:flex" />
          <Image
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="business-image"
            width={1974} // set the width prop
            height={1080}
            className="w-full h-screen object-cover hidden lg:flex"
          />
          <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform p-8 text-center">
            <h1 className="font-montserrat font-bold text-white text-4xl">
              Iniciar Sesión
            </h1>
            <p className="font-montserrat text-white px-28 mt-5 text-lg">
              Accede a tu cuenta para evaluar y mejorar el desempeño de tus
              empleados remotos.
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <div className="w-3/4 h-full py-10 px-4 lg:px-10 flex flex-col items-center justify-center">
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                className="w-48 h-48 rounded-full object-cover"
              />
            </Link>
            <h1 className="mt-10 font-roboto font-bold text-2xl text-darkBlue">
              Inicio de Sesión
            </h1>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-center items-center"
            >
              <TextField
                label="Nombre de Usuario"
                placeholder="Nombre de Usuario"
                className="w-full"
                sx={{ my: 2 }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Contraseña"
                placeholder="Contraseña"
                className="w-full"
                sx={{ my: 2 }}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <div className="w-full flex items-center justify-evenly my-5">
                <Link href="/sign-up">
                  <span className="text-gray-400">Crea tu cuenta</span>
                </Link>
                <div className="border-r-2 border-[#d8d8d8] h-5 mx-4 rounded-full" />
                <span className="text-gray-400">Olvide la contraseña</span>
              </div>

              <CustomButton type="submit" onClick={handleLogin}>
                Iniciar Sesión
              </CustomButton>
              {error && <p>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
