"use client"
import { useState } from "react"
import { styled, useTheme } from "@mui/material/styles"

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"


import { useAuthStore } from "@/app/(pages)/(store)/authStore"

export default function useStates() {
  const drawerWidth = 240

  const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open"
  })<{
    open?: boolean
  }>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
          }),
          marginLeft: 0
        }
      }
    ]
  }))

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open"
  })<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
          })
        }
      }
    ]
  }))

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }))

  const logout = useAuthStore((state) => state.logout)

  const theme = useTheme()
  const [open, setOpen] = useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    // Lógica para hacer logout
    logout()
  }

  return {
    drawerWidth,
    Main,
    AppBar,
    DrawerHeader,
    logout,
    theme,
    open,
    setOpen,
    handleDrawerOpen,
    handleDrawerClose,
    handleLogout
  }
}
