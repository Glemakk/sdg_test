import { ReactNode } from "react";
import s from "./ParticipateSection.module.css";

const ParticipateSection = ({ children }: { children: ReactNode }) => {
  return <div className={s.wrapper}>{children}</div>;
};

export default ParticipateSection;
