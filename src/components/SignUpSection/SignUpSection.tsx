import { useState } from "react";
import s from "./SignUpSection.module.css";
import { SubmitModal } from "../SubmitModal";
const data = [
  "Subscribe to our News",
  "SIGN UP",
  "Check your email inbox",
  "Wait till September 22",
];

const SignUpSection = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const signUp = "SIGN UP";

  return (
    <div>
      <ul className={s.list}>
        {data.map((item, index) => (
          <li key={index} className={s.item}>
            <span className={s.itemNumber}>{`${index + 1}.`}</span>
            {item === signUp ? (
              <button onClick={() => setIsPopUpOpen(true)}>{signUp}</button>
            ) : (
              <>{item}</>
            )}
          </li>
        ))}
      </ul>
      {isPopUpOpen && <SubmitModal onClose={() => setIsPopUpOpen(false)} />}
    </div>
  );
};

export default SignUpSection;
