import React from 'react';
import { Button as MuiButton } from "@mui/material"



interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;     
  // className?: string;       
  disabled?: boolean;       
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties 
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  // className = '',
  disabled = false,
  type = 'button',
  style={}
}) => {
  // const disabledStyles = disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary';

  return (
    <MuiButton
      type={type}
      className="font-roboto"
      sx={{
        ...style,
        padding: ".5rem 1rem .5rem 1rem ",
        width: "100%",
        backgroundColor: "#035096",
        mt: 4,
        color: "white",
        fontFamily: "Roboto",
        borderRadius:"100px",
        "&:hover": {
          backgroundColor: "#01a3b0",
        },

      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </MuiButton>
  );
};

export default CustomButton;
