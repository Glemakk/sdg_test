import heroMobileImg from "../../assets/img/HeroImgMobile.jpg";
import heroMobileImgWebp from "../../assets/img/HeroImgMobile.webp";
import heroMobileImg2x from "../../assets/img/HeroImgMobile@2x.jpg";
import heroMobileImg2xWebp from "../../assets/img/HeroImgMobile@2x.webp";
import HeroImg from "../../assets/img/HeroImgDesctop.jpg";
import HeroImgWebp from "../../assets/img/HeroImgDesctop.webp";
import HeroImg2x from "../../assets/img/HeroImgDesctop@2x.jpg";
import HeroImg2xWebp from "../../assets/img/HeroImgDesctop@2x.webp";
import s from "./HeroPicture.module.css";

const HeroPicture = () => {
  return (
    <picture>
      <source
        srcSet={`
      ${heroMobileImgWebp} 320w, 
      ${heroMobileImg2xWebp} 960w, 
      ${HeroImgWebp} 1920w,
      ${HeroImg2xWebp} 2100w
      `}
        type="image/webp"
        className={s.heroPicture}
      />

      <img
        srcSet={`
      ${heroMobileImg} 320w, 
      ${heroMobileImg2x} 640w, 
      ${HeroImg} 1920w,
      ${HeroImg2x} 2100w`}
        src={heroMobileImg}
        alt="Hero"
        className={s.heroPicture}
        sizes="(min-width: 1920px) 25vw, (min-width: 1280px) 30vw, (min-width: 960px) 35vw, (min-width: 960px) 50vw, 90vw"
      />
    </picture>
  );
};

export default HeroPicture;
