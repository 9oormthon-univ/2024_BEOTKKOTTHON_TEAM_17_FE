import styled from "styled-components";
import Wallet from "../images/wallet.png";
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
import CustomImage from "./CustomImage";

const iconMapping = {
  instagram: <FaInstagram color="#E1306C" />,
  youtube: <FaYoutube color="#fff" />,
  facebook: <FaFacebook color="#fff" />,
  linkedIn: <FaLinkedin color="#fff" />,
  organization: <FaSchool color="#fff" />,
  link: <FaLink color="#000" />,
  content: <FaPencilAlt color="#000" />,
  x: <FaSquareXTwitter color="#fff" />,
  tiktok: <FaTiktok color="#fff" />,
  naver: <SiNaver color="#fff" />,
  notefolio: <SiDeepnote color="#3BC1CC" />,
  behance: <FaBehance color="#1769FF" />,
  github: <FaGithub color="#fff" />,
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

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else {
      return ""; // 또는 다른 기본값으로 설정
    }
  };

  return (
    <CardBox
      bgColor={userData.bgColor}
      textColor={userData.textColor}
    >
      <CardBoxIn>
        <CustomImage
          src={Wallet}
          alt="Example"
          x={298}
          y={170}
          width={30}
          height={30}
        />

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
          <MdEmail color="#000" />
          <CardText>{userData.email}</CardText>
        </CardSpace>
        <CardContents>
          <CardSpace>
            <FaPhoneAlt color="#000" />
            <CardText>{formatPhoneNumber(userData.phone)}</CardText>
          </CardSpace>
          {secondaryInfos.map((info) => (
            <CardSpace key={info.key}>
              {iconMapping[info.key]}
              <CardText>{info.value}</CardText>
            </CardSpace>
          ))}
        </CardContents>
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
