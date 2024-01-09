import background from "../Images/errorpage.png"

import style from "./ErrorPage.module.css"

const ErrorPage = () => {
  return (
    <div className={style.error}>
      <img src={background} alt="Rick with a message expressing the frustration of finding nothing."/>
    </div>
  )
}

export default ErrorPage;
