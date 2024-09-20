"use client"

import React from "react"
import img from "./assets/images/svgs/test.svg"
import LanguageIcon from "@mui/icons-material/Language"
import GroupsIcon from "@mui/icons-material/Groups"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@mui/material"
import Navbar from "./_components/Navbar/Navbar"

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Navbar />
      <div className="pt-36 lg:pt-20 w-full h-full flex">
        <div className="w-full lg:w-1/2 flex justify-center items-center flex-col px-4">
          <Image src={img} className="w-full mb-5 flex lg:hidden" loading="lazy" alt="" />

          <h1 className="font-roboto font-bold text-3xl lg:text-5xl px-5 text-primary">
            Organiza y Gestiona tus empleados
          </h1>
          <h3 className="font-roboto text-black text-base lg:text-lg px-5 mt-6 ">
            Sistema de Evaluación de Desempeño para empleados
            remotos, diseñado para optimizar la productividad, mejorar la
            comunicación y promover el crecimiento personal y profesional de tu
            equipo, sin importar su ubicación.
          </h3>
          <Button
            className="font-roboto font-bold tracking-wider rounded-full"
            sx={{
              padding: ".5rem 1rem .5rem 1rem ",
              width: "10rem",
              backgroundColor: "#035096",
              mt: 4,
              color: "white",
              fontFamily: "Roboto",
              borderRadius: "40px",
              "&:hover": {
                backgroundColor: "#01a3b0"
              }
            }}
            onClick={() => router.push("/login")}
          >
            Empezar
          </Button>
          <div className="w-full h-40  flex justify-center items-center mt-10">
            <div className="flex justify-center items-center flex-col gap-2">
              <LanguageIcon style={{ fontSize: "4rem", color: "#035096" }} />
              <h1 className="text-4xl font-extrabold font-roboto text-black">
                + 81M
              </h1>
              <h1 className="text-sm font-roboto text-black">
                Usuarios Globales
              </h1>
            </div>
            <div className="border-r-2 border-[#d8d8d8] h-40 mx-10 rounded-full" />
            <div className="flex justify-center items-center flex-col gap-2">
              <GroupsIcon style={{ fontSize: "4rem", color: "#035096" }} />
              <h1 className="text-4xl font-extrabold font-roboto text-black">
                + 1.5M
              </h1>
              <h1 className="text-sm font-roboto text-black">
                Compañias Aliadas
              </h1>
            </div>
          </div>
        </div>

        <div className="w-1/2 hidden lg:flex justify-center items-center">
          <div className="w-full h-full flex justify-center items-center">
            <Image src={img} className="w-full mr-6 " loading="lazy" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}
