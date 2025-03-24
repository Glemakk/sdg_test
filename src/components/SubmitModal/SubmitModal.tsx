import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import s from "./SubmitModal.module.css";
import { getAuthorization, putDating } from "../../api/api-dating";
import ExclamationMarkInRedCircle from "../../assets/icons/ExclamationMarkInRedCircle";

interface ISubmitModal {
  onClose: () => void;
  setOpenModal: (value: boolean) => void;
}

const SubmitModal = ({ onClose, setOpenModal }: ISubmitModal) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const TITLE =
    "To register, enter the mail to which our news is sent and set your password";
  const errorEmailMessage = "Please enter a valid e-mail";

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/i;
  let isValid = email.match(regex);
  const emailValid = isValid ? true : false;
  const isEmailInvalid = error && !emailValid;

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!emailValid) {
      setError(errorEmailMessage);
      setLoading(false);
      return;
    }

    try {
      // 1. try to authorize
      const authResponse = await getAuthorization(email, password);

      if (authResponse.status === 200) {
        const token = authResponse.headers["x-token"];
        if (token) {
          localStorage.setItem("authToken", token);
          window.location.href = `https://www.dating.com/people/#token=${token}`;
          return;
        } else {
          throw new Error("Token does not exist");
        }
      }
    } catch (authError: any) {
      const status = authError?.response?.status;

      if (status === 401 && emailValid) {
        // 2. client is not registered - try to register
        try {
          const response = await putDating({ email, password });

          if (response && response.id) {
            onClose();
            setOpenModal(true);
          }
        } catch (regError: any) {
          if (regError && regError.response?.status === 400) {
            return setError("Account with this email already exists.");
          }
          setError("Register error.");
        }
      } else {
        setError("Authorization error.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} text={""}>
      <h2>{TITLE}</h2>

      <form onSubmit={handleSubmit}>
        <div className={s.inputWrapper}>
          <input
            className={isEmailInvalid ? s.inputError : s.input}
            type="text"
            placeholder="Example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern='/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/i'
          />
          {isEmailInvalid && (
            <>
              <ExclamationMarkInRedCircle />
              <p className={s.errorMessage}>{errorEmailMessage}</p>
            </>
          )}
        </div>

        <div className={s.inputWrapper}>
          <input
            className={error ? s.inputError : s.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          {error && error !== errorEmailMessage && (
            <>
              <ExclamationMarkInRedCircle />
              <p className={s.errorMessage}>{error}</p>
            </>
          )}
        </div>

        <button className={s.submitBtn} type="submit" disabled={loading}>
          {loading ? "Sending..." : "SUBMIT"}
        </button>
      </form>
    </Modal>
  );
};

export default SubmitModal;
