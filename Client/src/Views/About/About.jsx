import myphoto from "../../Images/MyPhoto.jpg";
import homeVideo from "../../video/home.mp4";

import style from "./About.module.css";

const About = () => {
  return (
    <div className={style.about}>
      <h1 className={style.title}>MORE INFO ABOUT ME</h1>
      <div className={style.wrapper}>
        <div className={style.photo}>
          <img
            src={myphoto}
            alt="Agustin looking to the side like he's thinking"
          />
        </div>
        <div className={style.databox}>
          <span>Name:</span>
          <span className={style.valuebox}>Agustin Fleitas.</span>
        </div>
        <div className={style.databox}>
          <span>Origin:</span>
          <span className={style.valuebox}>Argentina.</span>
        </div>
        <div className={style.databox}>
          <span>Location:</span>
          <span className={style.valuebox}>Spain.</span>
        </div>
        <div className={style.databox}>
          <span>Age (at 2023):</span>
          <span className={style.valuebox}>26.</span>
        </div>
        <div className={style.description}>
          <span className={style.descripTitle}>Description:</span>
          <span className={style.valuebox}>
            I was born in Argentina, at the age of 25, I moved to Spain. In
            2023, I started my studies in web development. This is one of the
            projects we designed during the Fullstack programming bootcamp at
            SoyHenry. It's an integrative project that we keep updating and
            enhancing as the classes progress.
            <br></br>
            In Argentina, I studied and worked in photography for about 4 years.
            At the same time, I had a job as an Administrative Assistant in an
            office. After meeting my current partner online, I moved to Spain to
            start a new life.
          </span>
        </div>
        <div className={style.social}>
          <span>Contact me:</span>
          <div>
            <a
              href='https://www.linkedin.com/in/agustin-fleitas-faes/'
              target='_blank'
              rel='noreferrer'
            >
              <box-icon
                type='logo'
                name='linkedin-square'
                color='rgba(255, 255, 255, 0.6)'
                size='lg'
              ></box-icon>
            </a>
            <a
              href='https://github.com/AgusFleitas'
              target='_blank'
              rel='noreferrer'
            >
              <box-icon
                type='logo'
                name='github'
                color='rgba(255, 255, 255, 0.6)'
                size='lg'
              ></box-icon>
            </a>
          </div>
        </div>
      </div>
      <div className={style.videoWrapper}>
        <video src={homeVideo} autoPlay muted loop className={style.bgVideo} />
      </div>
    </div>
  );
};

export default About;
