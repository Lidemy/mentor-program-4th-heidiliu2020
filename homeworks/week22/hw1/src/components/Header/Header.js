import React, { useContext } from "react";
import styled from "styled-components";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";

import { AuthContext, LoadingContext } from "../../contexts";
import { setAuthToken } from "../../utils";
import { MEDIA_QUERY_MD } from "../../constants/style";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 8px rgb(199, 197, 197);
  padding: 0 32px;
  background: #fff;

  ${MEDIA_QUERY_MD} {
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const Brand = styled.div`
  font-size: 28px;
  white-space: nowrap;
  font-weight: 700;

  /* 可選取子層的 Link 元素 */
  a {
    text-decoration: none;
    color: #333;
    padding: 8px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 24px;
    padding: 6px 0;
  }
`;

const NavbarList = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  text-decoration: none;
  margin: 0;
  padding: 0;

  ${MEDIA_QUERY_MD} {
    font-size: 24px;
    justify-content: space-evenly;
  }
`;

const StyledLink = styled(NavLink)`
  height: 58px;
  width: 82px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #666;

  /* activeClassName: 設置選中樣式，預設為 active */
  &.${(props) => props.activeClassName} {
    background: #eee;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 18px;
    height: 32px;

    &.${(props) => props.activeClassName} {
      background: #fff;
      color: #999;
    }
  }
`;

const LoadingGetMe = styled.div`
  height: 58px;
  width: 164px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
`;

export default function Header() {
  const { isLoadingGetMe } = useContext(LoadingContext);
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();

  const history = useHistory();

  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") {
      history.push("/");
    }
  };

  return (
    <HeaderContainer>
      <Brand>
        {/* 加上 replace: 避免出現錯誤 -> "Hash history cannot PUSH the same path" */}
        <Link to="/" replace>
          Heidi's Blog
        </Link>
      </Brand>
      <NavbarList>
        <StyledLink exact to="/about" replace activeClassName="active">
          關於我
        </StyledLink>
        <StyledLink to="/post-list/" replace activeClassName="active">
          文章列表
        </StyledLink>
        {isLoadingGetMe ? (
          <LoadingGetMe>資料讀取中...</LoadingGetMe>
        ) : (
          <>
            {!user && (
              <StyledLink to="/register" replace activeClassName="active">
                註冊
              </StyledLink>
            )}
            {!user && (
              <StyledLink to="/login" replace activeClassName="active">
                登入
              </StyledLink>
            )}
            {user && (
              <StyledLink to="/new-post" replace activeClassName="active">
                發布文章
              </StyledLink>
            )}
            {user && (
              <StyledLink to="" replace onClick={handleLogout}>
                登出
              </StyledLink>
            )}
          </>
        )}
      </NavbarList>
    </HeaderContainer>
  );
}
