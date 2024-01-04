import "boxicons";

import style from "./Notification.module.css";

const Notification = ({ title, message, actionName, cancelFunc}) => {
  return (
    <div className={style.overlay}>
      <div className={style.notifwrapper}>
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
          <button className={style.cancelbutton} onClick={cancelFunc}>
            {actionName}
          </button>
      </div>
    </div>
  );
};

export default Notification;
