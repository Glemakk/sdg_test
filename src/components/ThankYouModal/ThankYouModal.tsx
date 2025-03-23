import { Modal } from "../Modal";
import s from "./ThankYouModal.module.css";
interface IThankYouModal {
  onClose: () => void;
}

const ThankYouModal = ({ onClose }: IThankYouModal) => {
  const TITLE = "Thank You";
  const TEXT = "To complete registration, please check your e-mail";

  return (
    <Modal onClose={onClose} text={""}>
      <div className={s.textWrapper}>
        <h1 className={s.title}>{TITLE}</h1>
        <p className={s.text}>{TEXT}</p>
      </div>
    </Modal>
  );
};

export default ThankYouModal;
