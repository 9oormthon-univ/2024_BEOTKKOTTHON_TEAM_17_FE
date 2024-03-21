import styled from "styled-components";
import Wallet from "../images/wallet.png";
import CustomImage from "./CustomImage";
import { useRef, useEffect, useState } from "react";

import {
  kakaotalkImg,
  behanceImg,
  blogImg,
  facebookImg,
  githubImg,
  instagramImg,
  linkedInImg,
  notefolioImg,
  tiktokImg,
  xImg,
  youtubeImg,
  contentImg,
  linkImg,
  organizationImg,
  phoneImg,
  mailImg,
} from "../uitls/snsImg";

const iconMapping = {
  instagram: instagramImg,
  youtube: youtubeImg,
  facebook: facebookImg,
  linkedIn: linkedInImg,
  organization: organizationImg,
  link: linkImg,
  content: contentImg,
  x: xImg,
  tiktok: tiktokImg,
  naver: blogImg,
  notefolio: notefolioImg,
  behance: behanceImg,
  github: githubImg,
  kakao: kakaotalkImg,
};

const Card = ({ userData }) => {
  const primaryInfoKey = userData.status !== null;

  // 나머지 정보 중 최대 4개 선택
  const secondaryInfoKeys = [
    "organization",
    "instagram",
    "youtube",
    "facebook",
    "x",
    "tiktok",
    "naver",
    "linkedIn",
    "notefolio",
    "behance",
    "github",
    "kakao",
    "content",
    "link",
  ];

  const secondaryInfos = secondaryInfoKeys
    .map((key) => ({ key, value: userData[key] }))
    .filter((info) => info.value !== null)
    .slice(0, 4);

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else {
      return ""; // 또는 다른 기본값으로 설정
    }
  };

  // 상대적인 스티커 좌표를 구하기 위함
  const cardRef = useRef();
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });

  // 카드 컴포넌트가 마운트될 때마다 카드 컴포넌트의 상대적 위치를 구함
  useEffect(() => {
    if (cardRef.current) {
      setCardDimensions({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });
    }
  }, []);

  const formatNameWithSpace = (name) => {
    if (!name) return "";
    return name.split("").join(" ");
  };

  return (
    <CardBox
      bgColor={userData.bgColor}
      textColor={userData.textColor}
      ref={cardRef}
    >
      <CardBoxIn>
        <CustomImage
          src={Wallet}
          alt="Example"
          x={cardDimensions.width * 0.46019553072625696}
          y={cardDimensions.height * 0.4296875}
          width={30}
          height={30}
          zIndex={-100}
        />

        <CardLeftRight>
          <CardNameSpace>
            <CardName>{formatNameWithSpace(userData.name)}</CardName>
            {primaryInfoKey && (
              <IconAndText>
                <CardText>{userData.status}</CardText>
              </IconAndText>
            )}
          </CardNameSpace>

          <CardRight>
            <CardSpace style={{ marginTop: "0" }}>
              <Logo src={mailImg} />
              <CardText>{userData.email}</CardText>
            </CardSpace>
            <CardContents>
              <CardSpace>
                <Logo src={phoneImg} />
                <CardText>{formatPhoneNumber(userData.phone)}</CardText>
              </CardSpace>

              {secondaryInfos.map((info) => (
                <CardSpace key={info.key}>
                  <Logo src={iconMapping[info.key]} />
                  <CardText>{info.value}</CardText>
                </CardSpace>
              ))}
            </CardContents>
          </CardRight>
        </CardLeftRight>
      </CardBoxIn>
    </CardBox>
  );
};

export default Card;

const CardBox = styled.div`
  width: calc(100vw - 32px);
  max-width: 580px;
  height: 200px;
  border-radius: 10px;
  background: ${(props) => props.bgColor || "#ffe3e7"};
  color: ${(props) => props.textColor || "#000"};
  box-shadow: 0 0 5px 0 #e8e8e8;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (hover: hover) and (pointer: fine) {
    width: 343px;
    height: 200px;
  }

  position: relative;
`;

const CardBoxIn = styled.div`
  width: calc(100% - 32px);
  height: calc(100% - 24px);

  display: flex;
  flex-direction: column;
  z-index: 100;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardSpace = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const IconAndText = styled.div`
  display: flex;
  align-items: center;
`;

const CardLeftRight = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const CardRight = styled.div`
  margin-left: 18px;
`;

const Logo = styled.img`
  width: 12px;
  height: auto;
`;
