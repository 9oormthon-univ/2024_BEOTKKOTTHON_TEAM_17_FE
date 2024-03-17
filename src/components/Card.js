import styled from "styled-components";
import Mail from "../images/message.png";

import {
  FaPhoneAlt,
  FaSchool,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaLink,
  FaPencilAlt,
  FaTiktok,
  FaLinkedin,
  FaBehance,
  FaGithub,
} from "react-icons/fa";
import { SiNaver, SiDeepnote } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const iconMapping = {
  instagram: <FaInstagram color="#E1306C" />,
  youtube: <FaYoutube />,
  facebook: <FaFacebook />,
  linkedIn: <FaLinkedin />,
  organization: <FaSchool />,
  link: <FaLink />,
  content: <FaPencilAlt />,
  x: <FaSquareXTwitter />,
  tiktok: <FaTiktok />,
  naver: <SiNaver />,
  notefolio: <SiDeepnote />,
  behance: <FaBehance />,
  github: <FaGithub />,
  kakao: <RiKakaoTalkFill color="#FEE500" />,
};

const Card = ({ userData }) => {
  // 'organization', 'content', 'link' 중 하나 선택
  const primaryInfoKey = ["organization", "content", "link"].find((key) => userData[key] !== null);

  // 나머지 정보 중 최대 3개 선택
  const secondaryInfoKeys = [
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
  ];

  const secondaryInfos = secondaryInfoKeys
    .map((key) => ({ key, value: userData[key] }))
    .filter((info) => info.value !== null)
    .slice(0, 3);

  return (
    <CardBox
      bgColor={userData.bgColor}
      textColor={userData.textColor}
    >
      {/* <CustomImage
        src={School}
        alt="Example"
        x={298}
        y={0}
        width={30}
        height={30}
      /> */}
      <CardNameSpace>
        <CardName>{userData.name}</CardName>
        {primaryInfoKey && (
          <IconAndText>
            {iconMapping[primaryInfoKey]}
            <CardText>{userData[primaryInfoKey]}</CardText>
          </IconAndText>
        )}
      </CardNameSpace>

      <CardSpace style={{ marginTop: "10px" }}>
        <MdEmail />
        <CardText>{userData.email}</CardText>
      </CardSpace>
      <CardContents>
        <CardSpace>
          <FaPhoneAlt />
          <CardText>{userData.phone}</CardText>
        </CardSpace>
        {secondaryInfos.map((info) => (
          <CardSpace key={info.key}>
            {iconMapping[info.key]}
            <CardText>{info.value}</CardText>
          </CardSpace>
        ))}
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
  background: ${(props) => props.bgColor || "#ffe3e7"};
  color: ${(props) => props.textColor || "#000"};
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

const IconAndText = styled.div`
  display: flex;
  align-items: center;
`;
