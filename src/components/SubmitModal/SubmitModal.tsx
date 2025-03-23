import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import s from "./SubmitModal.module.css";
import { ThankYouModal } from "../ThankYouModal";
import { getAuthorization, putDating } from "../../api/api-dating";
import ExclamationMarkInRedCircle from "../../assets/icons/ExclamationMarkInRedCircle";

interface ISubmitModal {
  onClose: () => void;
}

const SubmitModal = ({ onClose }: ISubmitModal) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const TITLE =
    "To register, enter the mail to which our news is sent and set your password";

  console.log(openModal);

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

      if (status === 401) {
        // 2. client is not registered - try to register
        try {
          const response = await putDating({ email, password });

          if (response.status === 201) {
            const token = response.headers["x-token"];
            if (token) {
              localStorage.setItem("authToken", token);
            }

            setOpenModal(true);
            onClose();
          } else {
            throw new Error("Registration does not succeed");
          }
        } catch (regError) {
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
    <>
      <Modal onClose={onClose} text={""}>
        <h2>{TITLE}</h2>

        <form onSubmit={handleSubmit}>
          <div className={s.inputWrapper}>
            <input
              className={error ? s.inputError : s.input}
              type="email"
              placeholder="Example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern='/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/i'
            />
            {error && <ExclamationMarkInRedCircle />}
            {error && (
              <p className={s.errorMessage}>Please enter a valid e-mail</p>
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
            {error && <ExclamationMarkInRedCircle />}
          </div>

          {error && <p className={s.errorMessage}>{error}</p>}

          <button className={s.submitBtn} type="submit" disabled={loading}>
            {loading ? "Sending..." : "SUBMIT"}
          </button>
        </form>
      </Modal>

      {openModal && <ThankYouModal onClose={() => setOpenModal(false)} />}
    </>
  );
};

export default SubmitModal;
