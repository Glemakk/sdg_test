import React from "react";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  ariaLabel: string;
}

const IconButton = ({ icon, ariaLabel, ...props }: IconButtonProps) => (
  <button
    type="button"
    aria-label={ariaLabel}
    {...props}
    style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      borderRadius: "50%",
    }}
  >
    {icon}
  </button>
);

export default IconButton;
