import "boxicons";

import style from "./Modal.module.css";

const Modal = ({ title, message, actionName, actionFunc, cancelFunc }) => {
  return (
    <div className={style.overlay}>
      <div className={style.modalwrapper}>
        <h3>{title}</h3>
        <box-icon
          type='solid'
          name='error'
          size='md'
          color='rgb(217, 187, 100)'
        ></box-icon>
        <div className={style.message}>
          <p>{message}</p>
        </div>
        <div className={style.buttons}>
          <button className={style.actionbutton} onClick={actionFunc}>
            {actionName}
          </button>
          <button className={style.cancelbutton} onClick={cancelFunc}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
