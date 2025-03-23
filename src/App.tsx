import { MainContainer } from "./components/MainContainer";
import { TitleSection } from "./components/TitleSection";
import heroMobileImg from "./assets/img/HeroImgMobile.jpg";
import heroMobileImg2x from "./assets/img/HeroImgMobile@2x.jpg";
import HeroImg from "./assets/img/HeroImgDesctop.jpg";
import HeroImg2x from "./assets/img/HeroImgDesctop@2x.jpg";
import s from "./components/MainContainer/MainContainer.module.css";
import { SignUpSection } from "./components/SignUpSection";
import { ParticipateSection } from "./components/ParticipateSection";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      window.location.href = `https://www.dating.com/people/#token=${token}`;
    }
  }, []);

  return (
    <div className="App">
      <MainContainer>
        <img
          srcSet={`
            ${heroMobileImg} 320w, 
            ${heroMobileImg2x} 640w, 
            ${HeroImg} 960w,
            ${HeroImg2x} 1281w`}
          src={heroMobileImg}
          alt="Hero"
          className={s.hero}
          sizes="(min-width: 1920px) 50vw, 100vw"
        />
        <ParticipateSection>
          <TitleSection />

          <SignUpSection />
        </ParticipateSection>
      </MainContainer>
    </div>
  );
}

export default App;
