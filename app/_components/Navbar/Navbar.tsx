import React from "react"
import { Search } from "@mui/icons-material"
// import styles from "./styles/Navbar.module.css"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@mui/material"

export default function Navbar() {
  const router = useRouter()
  return (
    <nav
      className={`w-full flex h-20 items-center justify-between px-2 lg:px-5 fixed top-0 left-0 z-50 `}
    >
      <div
        className={`w-full flex h-20 items-center justify-between bg-white/80 backdrop-blur-sm px-2 lg:px-5 mt-4 rounded-3xl shadow-lg`}
      >
        <div className="flex items-center gap-5 mr-5">
          <Link href="/">
            <Image
              src="https://nolatech.ai/media/images/logo_Nolatech_Color_horizontal.original.origin.height-20.png"
              alt="nolatech-logo"
              className="w-48 ml-5 lg:w-28"
              loading="lazy"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="w-1/2 lg:w-1/2 flex items-center justify-center">
        </div>
        <div className="flex items-center gap-5">
          <Button
            className={`bg-primary text-white rounded-lg px-6 lg:px-4 py-2 text-sm lg:text-base shadow-md normal-case`}
            onClick={() => router.push("/sign-up")}
          >
            Registrarte
          </Button>
          <Button
            className={`bg-white text-black rounded-lg px-8 lg:px-4 py-2 text-xs lg:text-base shadow-md normal-case`}
            onClick={() => router.push("/login")}
          >
            Iniciar Sesion
          </Button>
        </div>
      </div>
    </nav>
  )
}
