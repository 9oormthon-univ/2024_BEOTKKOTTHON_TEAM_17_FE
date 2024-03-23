// AdditionalInfoPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SmileImg from "../images/smile.png";
import "../styles/Main.css";
import BackHeader from "../components/BackHeader";
import { MainText, GuideText } from "../styles/Title";
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
} from "../utils/snsImg";

const customOptions = [
  { key: "organization", label: "소속", icon: organizationImg },
  { key: "content", label: "직접 추가", icon: contentImg },
];
const snsOptions = [
  { key: "instagram", label: "인스타그램", icon: instagramImg },
  { key: "youtube", label: "유튜브", icon: youtubeImg },
  { key: "facebook", label: "페이스북", icon: facebookImg },
  { key: "x", label: "X", icon: xImg },
  { key: "tiktok", label: "틱톡", icon: tiktokImg },
  { key: "naver", label: "네이버 블로그", icon: blogImg },
  { key: "linkeIn", label: "링크드인", icon: linkedInImg },
  { key: "notefolio", label: "노트폴리오", icon: notefolioImg },
  { key: "behance", label: "비핸스", icon: behanceImg },
  { key: "github", label: "깃허브", icon: githubImg },
  { key: "kakao", label: "카카오톡", icon: kakaotalkImg },
  { key: "link", label: "링크", icon: linkImg },
];

const AdditionalInfoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 이전 페이지에서 전달된 선택된 항목들
  const [selectedOptions, setSelectedOptions] = useState(location.state?.selected || []);

  useEffect(() => {
    window.scrollTo(0, 0);

    // 이미 선택된 항목들을 최대 선택 가능한 항목 수에 맞추어 상태를 설정
    if (selectedOptions.length > 4) {
      setSelectedOptions(selectedOptions.slice(0, 4));
    }
  }, []);

  const toggleSelection = (key) => {
    setSelectedOptions(
      (prevSelected) =>
        prevSelected.includes(key)
          ? prevSelected.filter((selectedKey) => selectedKey !== key)
          : [...prevSelected, key].slice(0, 4) // 최대 4개까지만 선택 가능
    );
  };

  const handleSubmit = () => {
    window.scrollTo(0, 0); // 스크롤을 맨 위로 변경
    // 선택된 항목들을 다음 페이지에 전달
    navigate("/mypage/edit/additional/detail", { state: { selected: selectedOptions } });
  };

  return (
    <div className="page">
      <div className="center">
        <PageBack>
          <div className="page-space">
            <BackHeader redirectTo={"/mypage/edit"} />
            <MainText>추가 정보 입력</MainText>
            <GuideText style={{ marginBottom: "19px" }}>최대 4개의 카테고리를 선택하실 수 있어요.</GuideText>
            <Section>
              <CustomGuide>커스텀 정보</CustomGuide>
              <BlocksContainer>
                {customOptions.map((option) => (
                  <Block
                    key={option.key}
                    selected={selectedOptions.includes(option.key)}
                    onClick={() => toggleSelection(option.key)}
                  >
                    <Img src={option.icon} alt={option.label} />
                    {option.label}
                  </Block>
                ))}
              </BlocksContainer>
            </Section>
            <Section>
              <CustomGuide>SNS</CustomGuide>
              <BlocksContainer>
                {snsOptions.map((option) => (
                  <Block
                    key={option.key}
                    selected={selectedOptions.includes(option.key)}
                    onClick={() => toggleSelection(option.key)}
                  >
                    <Img src={option.icon} alt={option.label} />
                    {option.label}
                  </Block>
                ))}
              </BlocksContainer>
            </Section>
            <PageCenter>
              <CompleteBtn onClick={handleSubmit}>완료</CompleteBtn>
            </PageCenter>
          </div>
        </PageBack>
      </div>
    </div>
  );
};

export default AdditionalInfoPage;
const PageBack = styled.div`
  background: #fff;
`;

const Img = styled.img`
  width: 15px;
  height: 15px;
  margin-bottom: 10px;
`;
const Section = styled.div`
  margin-bottom: 17px;
`;

const CustomGuide = styled(GuideText)`
  font-weight: 700;
  margin-bottom: 10px;
`;

const BlocksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start; // 블록이 상단에 정렬
`;

const Block = styled.div`
  width: 86px;
  height: 66px;
  margin-left: 16px;
  margin-bottom: 17px;

  border-radius: 5px;
  background: #f8f8f8;
  box-shadow: ${({ selected }) =>
    selected ? "0px 0px 4px 0px rgba(19, 142, 255, 0.80)" : "0px 0px 2px 0px rgba(140, 140, 140, 0.50);"};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:nth-child(3n) {
    margin-right: 0; // 한 줄에 세 번째 블록의 우측 간격을 제거
  }
`;

const PageCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CompleteBtn = styled.div`
  margin-top: 19px;
  margin-bottom: 20px;
  cursor: pointer;

  width: calc(100vw - 32px);
  height: 42px;
  border-radius: 100px;
  background: #138eff;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;

  @media (hover: hover) and (pointer: fine) {
    width: 343px;
  }
`;
