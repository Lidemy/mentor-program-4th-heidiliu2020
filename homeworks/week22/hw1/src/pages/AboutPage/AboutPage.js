import React from "react";
import styled from "styled-components";

const Root = styled.div`
  min-height: 100vh;
`;

const AboutContainter = styled.div`
  max-width: 500px;
  margin: 100px auto;
  padding: 40px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  background: rgba(246, 246, 246, 0.9);
`;

const AboutTitle = styled.h2`
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const AboutContent = styled.div`
  line-height: 1.5;
  font-size: 20px;
`;

export default function AboutPage() {
  return (
    <Root>
      <AboutContainter>
        <AboutTitle>關於我</AboutTitle>
        <AboutContent>
          <p>
            嗨，我是
            Heidi，和阿爾卑斯山上的海蒂同名，夢想是走遍世界各處，留下自己的腳印。
          </p>
          <p>
            因緣際會之下，從 2020 年 3 月開始學習寫程式，目前是 Lidemy
            程式導師計畫第四期的學生，目標在明年初成功轉職成為一名前端工程師。
          </p>
        </AboutContent>
      </AboutContainter>
    </Root>
  );
}
