import s from "./MainContainer.module.css";
import { ReactNode } from "react";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return <div className={s.container}>{children}</div>;
};

export default MainContainer;
