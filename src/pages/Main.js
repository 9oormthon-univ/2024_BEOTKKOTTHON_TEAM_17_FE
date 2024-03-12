import React from "react";
import { Flex } from "@chakra-ui/react";
import styled from "styled-components";

const Page = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const MainPage = styled.div`
  background: linear-gradient(#138eff, #006eee);

  width: 100vw;
  min-height: 100vh;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
  }
`;

function Main() {
  return (
    <Page>
      <Flex justify="center">
        <MainPage>
          <p>메인페이지</p>
        </MainPage>
      </Flex>
    </Page>
  );
}

export default Main;
