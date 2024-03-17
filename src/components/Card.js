import styled from "styled-components";
import Mail from "../images/message.png";
import School from "../images/school.png";
import Phone from "../images/call.png";
import { useUserInfo } from "../store/store";
import CustomImage from "./CustomImage";

const Card = () => {
  const { userInfo } = useUserInfo();

  return (
    <CardBox>
      <CustomImage
        src={School}
        alt="Example"
        x={130.6}
        y={42}
        width={30}
        height={30}
      />
      <CardNameSpace>
        <CardName>김 구 름</CardName>
        <SchoolSpace>
          <img
            src={School}
            alt="학교"
            style={{ height: "10px" }}
          />
          <CardText>구름대학교</CardText>
        </SchoolSpace>
      </CardNameSpace>

      <CardSpace style={{ marginTop: "10px" }}>
        <img
          src={Mail}
          alt="메일"
          style={{ width: "15px" }}
        />
        <CardText>cloud1234@naver.com</CardText>
      </CardSpace>
      <CardContents>
        <CardSpace>
          <img
            src={Phone}
            alt="전화번호"
            style={{ width: "15px" }}
          />
          <CardText>010-1234-5678</CardText>
        </CardSpace>
        <CardSpace>
          <img
            src={Phone}
            alt="전화번호"
            style={{ width: "15px" }}
          />
          <CardText>cloud1234_</CardText>
        </CardSpace>
        <CardSpace>
          <img
            src={Phone}
            alt="전화번호"
            style={{ width: "15px" }}
          />
          <CardText>cloud1234@naver.com</CardText>
        </CardSpace>
        <CardSpace>
          <img
            src={Phone}
            alt="전화번호"
            style={{ width: "15px" }}
          />
          <CardText>https://blog.naver.com/cloud/223377506812</CardText>
        </CardSpace>
      </CardContents>
    </CardBox>
  );
};

export default Card;

const CardBox = styled.div`
  width: calc(100vw - 32px);
  max-width: 580px;
  height: 200px;
  border-radius: 10px;
  background: #ffe3e7;
  box-shadow: 0 0 5px 0 #e8e8e8;
  display: flex;
  flex-direction: column;

  @media (hover: hover) and (pointer: fine) {
    width: 343px;
    height: 200px;
  }

  position: relative;
`;

const CardName = styled.div`
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-right: 7px;
`;

const CardText = styled.div`
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 7px;
`;

const CardContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardNameSpace = styled.div`
  display: flex;
  align-items: flex-end;
`;

const CardSpace = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const SchoolSpace = styled.div`
  display: flex;
  align-items: center;
`;
