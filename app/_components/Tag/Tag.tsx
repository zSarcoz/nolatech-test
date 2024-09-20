import React from "react"
import Chip from "@mui/material/Chip"
import { SvgIconProps } from "@mui/material/SvgIcon"

interface TagProps {
  title: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
  onDelete?: () => void
  deleteIcon?: React.ReactElement<SvgIconProps>
  style?: React.CSSProperties
  color?: string
}

export default function Tag({
  title,
  onClick,
  onDelete,
  deleteIcon,
  style,
  color
}: TagProps) {
  return (
    <Chip
      className={`font-roboto text-primary font-bold bg-[#a3ddfc]`}
      sx={{
        fontSize: "0.75rem",
        height: "20px",
        ...style,
        backgroundColor: color ? "#a3ddfc" : color,
        color: "#035096"
      }}
      label={title}
      onClick={onClick}
      onDelete={onDelete}
      deleteIcon={deleteIcon}
    />
  )
}
