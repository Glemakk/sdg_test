import { MainContainer } from "./components/MainContainer";
import { TitleSection } from "./components/TitleSection";
import { SignUpSection } from "./components/SignUpSection";
import { ParticipateSection } from "./components/ParticipateSection";
import { useEffect } from "react";
import { HeroPicture } from "./components/HeroPicture";

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
        <HeroPicture />

        <ParticipateSection>
          <TitleSection />
          <SignUpSection />
        </ParticipateSection>
      </MainContainer>
    </div>
  );
}

export default App;
