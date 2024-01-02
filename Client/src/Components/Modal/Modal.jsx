import style from "./Modal.module.css";

const Modal = ({ title, message, actionName, actionFunc, cancelFunc}) => {
  return (
    <div className={style.overlay}>
      <div className={style.modalwrapper}>
        <h3>{title}</h3>
        <div className={style.message}>
          <p>{message}</p>
        </div>
          <div className={style.buttons}>
            <button onClick={actionFunc}>{actionName}</button>
            <button onClick={cancelFunc}>Cancel</button>
          </div>
      </div>
    </div>
  );
};

export default Modal;
