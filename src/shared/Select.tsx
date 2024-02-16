import React, { FC, SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  sizeClass?: string;
}

const Select: FC<SelectProps> = ({
  className = "",
  sizeClass = "h-11",
  children,
  ...args
}) => {
  return (
    <select
      className={`nc-Select ${sizeClass} ${className} block w-full text-sm
       rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring 
       focus:ring-primary-200 focus:ring-opacity-50 bg-white`   }
      {...args}
    >
      {children}
    </select>
  );
};

export default Select;
