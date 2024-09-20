
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

import MoreVertIcon from "@mui/icons-material/MoreVert"

import EmployesTable from "./tables/employesTable/EmployesTable"

import Sidebar from "@/app/_components/Sidebar/Sidebar"
import Tag from "@/app/_components/Tag/Tag"
import { IconButton } from "@mui/material"
import { Typography } from "@mui/material"

const data = [
  { name: "Ana Lopez", rendimiento: 90 },
  { name: "Luis Torrealba", rendimiento: 30 },
  { name: "Marcos Perez", rendimiento: 60 },
  { name: "Mario Casas", rendimiento: 80 }
]

export default function Dashboard() {
  return (
    <Sidebar title={"Dashboard"}>
      <div className="w-full h-full">
        <div className="w-full h-96 hidden lg:flex items-center justify-between gap-7">
          <div className="w-2/6 h-60 bg-white border-2 border-[#efefef]  rounded-2xl items-center flex-col p-5">
            <div className="w-full h-12 flex items-center justify-between mb-4">
              <div className="flex items-center justify-between gap-x-4">

              <h1 className="font-roboto font-bold text-primary text-2xl">
                Productividad
              </h1>
              <Tag title="Nuevo" style={{padding: "1px"}} color="bg-[#a3ddfc]"/>
              </div>

              <IconButton
                style={{
                  width: "32px",
                  height: "32px",
                  color: "#767873"
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </div>
            <Typography variant="h5">Empleados</Typography>
            <Typography variant="h2">80%</Typography>

          </div>
          <div className="w-2/6 h-60 bg-white border-2 border-[#efefef]  rounded-2xl items-center flex-col p-5">
            <div className="w-full h-12 flex items-center justify-between mb-4">
              <div className="flex items-center justify-between gap-x-4">

              <h1 className="font-roboto font-bold text-primary text-2xl">
                Tareas Completadas
              </h1>
              </div>

              <IconButton
                style={{
                  width: "32px",
                  height: "32px",
                  color: "#767873"
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </div>
            <Typography variant="h5">Tareas</Typography>
            <Typography variant="h2">76%</Typography>

          </div>
          <div className="w-2/4 h-60 bg-white border-2 border-[#efefef]  rounded-2xl items-center flex-col p-5">
            <h1 className="font-roboto font-bold text-primary text-2xl mb-4">
              Rendimiento
            </h1>
            <div className="w-full h-full relative">
              <div className="w-full h-full pb-10">
                <ResponsiveContainer width="100%" height={170}>
                  <BarChart data={data} barCategoryGap="30%">
                    <defs>
                      <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#035096" stopOpacity={1} />
                        <stop
                          offset="95%"
                          stopColor="#01a3b0"
                          stopOpacity={1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                    <YAxis />
                    <Tooltip cursor={{ fill: "#f2f2f2", opacity: 0.6 }} />
                    <Bar
                      dataKey="rendimiento"
                      fill="url(#colorUv2)"
                      radius={[80, 80, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <EmployesTable />
        </div>
      </div>
    </Sidebar>
  )
}
