import Button from "@/components/Button";
import React from "react";

export interface ButtonPrimaryProps {
  children: React.ReactNode;
  className?: string
  type?: string
  onClick?: () => void
}



const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({

  className = "",
  type = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
