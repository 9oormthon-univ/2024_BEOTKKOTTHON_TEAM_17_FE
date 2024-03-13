import React from "react";
import styled from "styled-components";
import "../styles/Main.css";

import MainHeader from "../components/MainHeader";

const MainPage = styled.div`
  background-image: linear-gradient(#138eff, #006eee);
`;

function Main() {
  return (
    <div className="page">
      <div className="center">
        <MainPage>
          <div className="page-space">
            <MainHeader />
            <p>메인페이지</p>
          </div>
        </MainPage>
      </div>
    </div>
  );
}

export default Main;
