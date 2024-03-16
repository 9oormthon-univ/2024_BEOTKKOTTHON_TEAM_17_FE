import { useNavigate } from "react-router-dom";
import BackQRHeader from "../components/BackQRHeader";
import Card from "../components/Card";
import "../styles/Main.css";
import styled from "styled-components";

import Pencil from "../images/pencil.png";

const MyPage = () => {
  const navigate = useNavigate();

  const linkToMyPageEdit = () => {
    navigate("/mypage/edit");
  };

  const linkToCustom = () => {
    navigate("/mypage/custom");
  };

  return (
    <div className="page">
      <div className="center">
        <MyPageBack>
          <div className="page-space">
            <BackQRHeader />
            <MyPageCenter>
              <CardTitle>김구름님의 명함</CardTitle>
              <CardContent>정보를 입력하고 명함을 등록해보세요.</CardContent>
              <Card />
              <EditBtnSpace>
                <CardEditBtn onClick={linkToCustom}>
                  <img
                    src={Pencil}
                    alt="편집"
                    style={{ height: "18px" }}
                  />
                </CardEditBtn>
              </EditBtnSpace>
              <BtnSpace>
                <CardBtn onClick={linkToMyPageEdit}>명함 정보 입력하기</CardBtn>
                <CardBtn>나의 QR</CardBtn>
              </BtnSpace>
            </MyPageCenter>
          </div>
        </MyPageBack>
      </div>
    </div>
  );
};

export default MyPage;

const MyPageBack = styled.div`
  background: #fff;
`;

const MyPageCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardTitle = styled.div`
  margin-top: 100px;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
`;

const CardContent = styled.div`
  margin-top: 11px;
  margin-bottom: 24px;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
`;

const BtnSpace = styled.div`
  margin-top: 15px;
`;

const CardBtn = styled.div`
  margin-top: 9px;
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

const EditBtnSpace = styled.div`
  width: 100vw;
  display: flex;
  justify-content: flex-end;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
    height: 200px;
  }
`;

const CardEditBtn = styled.div`
  margin-top: -38px;
  margin-right: 6vw;

  width: 28px;
  height: 28px;
  background-color: #fff;
  border-radius: 100%;
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.25));

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    margin-right: calc(375px * 0.04);
  }
`;
