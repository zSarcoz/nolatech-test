"use client"
import React from "react"
import { TextField, Typography } from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import logo from "../../../assets/images/logos/nolatech-logo.png"
import useStates from "./useStates/useStates"
import CustomButton from "@/app/_components/Button/Button"


export default function SignUp() {
  const {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
    handleLogin,
  } = useStates()

  
  return (
    <div className="w-full h-screen">
      <div className="w-full flex h-full z-40 absolute">
        <div className="h-dvh relative hidden w-full lg:block">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/60 hidden lg:flex" />
          <Image
            src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="business-image"
            width={1974} // set the width prop
            height={1080}
            className="w-full h-screen object-cover hidden lg:flex"
          />
          <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform p-8 text-center">
            <h1 className="font-montserrat font-bold text-white text-4xl">
              Registrate y Aprovecha
            </h1>
            <Typography className="font-montserrat text-white px-28 mt-5 text-lg">
              Crea tu cuenta para evaluar y mejorar el desempeño de tus
              empleados remotos.
            </Typography>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-3/4 h-full py-10 px-4 lg:px-20 flex flex-col items-center justify-center">
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                className="w-48 h-48 rounded-full object-cover"
              />
            </Link>
            <h1 className="my-10 font-roboto font-bold text-2xl text-darkBlue">
              Registro
            </h1>
            <form
              onSubmit={handleSubmit}
              className="w-full flex justify-center items-center gap-5 flex-col"
            >
              <TextField
                label="Nombre de Usuario"
                placeholder="Nombre de Usuario"
                className="w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Email"
                placeholder="Correo electronico"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Contraseña"
                placeholder="Contraseña"
                className="w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link href="/login">
                <span className="text-gray-400">
                  Ya tienes cuenta? Accede aqui
                </span>
              </Link>
              <CustomButton
                disabled={
                  email !== "" && username !== "" && password !== ""
                    ? false
                    : true
                }
                onClick={handleLogin}
              >
                Registrarte
              </CustomButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
