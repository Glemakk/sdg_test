import React, { useEffect } from "react";
import s from "./Modal.module.css";
import IconButton from "../IconButton/IconButton";
import CloseIcon from "../../assets/icons/CloseIcon";

interface IModal {
  onClose: () => void;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

const Modal = ({ onClose, text, children }: IModal) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={s.backdrop}>
      <div className={`${s.popup} `}>
        <IconButton
          className={s.closeBtn}
          icon={<CloseIcon />}
          ariaLabel="Close popup"
          onClick={onClose}
        />
        <>{children}</>
      </div>
    </div>
  );
};

export default Modal;
