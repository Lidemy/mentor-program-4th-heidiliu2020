import React, { useState, useContext } from "react";
import styled from "styled-components";
import { register, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { LoadingContext } from "../../contexts";

const Root = styled.div`
  height: 100vh;
`;

const RegisterForm = styled.form`
  max-width: 350px;
  margin: 100px auto;
  padding: 30px 50px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  background: rgba(246, 246, 246, 0.9);
  font-size: 18px;
`;

const RegisterTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 28px;
  text-align: center;
`;

const RegisterInput = styled.div`
  margin-bottom: 28px;

  & input {
    width: 100%;
    padding: 8px;
    font-size: 18px;
    outline: transparent;
    border: 1px solid #ddd;
    border-radius: 5px;
    letter-spacing: 1.5px;
    margin-top: 8px;
  }
`;

const RegisterSubmit = styled.div`
  display: flex;
  justify-content: space-evenly;

  & button {
    background: #555;
    color: #eee;
    outline: transparent;
  }

  & button,
  a {
    cursor: pointer;
    border-radius: 20px;
    font-size: 18px;
    padding: 6px 20px;
    border: 1px solid #555;
  }
`;

const LinkToLogin = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  background: #eee;
  color: #555;
`;

const ErrorMessage = styled.div`
  margin-bottom: 16px;
  color: #db4c3f;
  font-weight: 700;
`;

const SubmitLoading = styled.div`
  font-weight: 700;
  color: #555;
  padding: 10px;
`;

export default function RegisterPage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { setUser } = useContext(AuthContext);
  // 在 React 中 value 若是 undefined，等同於沒有傳 value
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  // 阻止送出表單
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    register({ username, password, nickname }).then((data) => {
      // 若 ok 為 0 代表錯誤
      if (data.ok === 0) {
        setIsLoading(false);
        return setErrorMessage(data.message);
      }
      // 成功的話就把 token 存到 localStorage
      setAuthToken(data.token);

      getMe().then((response) => {
        if (response.ok !== 1) {
          setIsLoading(false);
          // 在 getMe() 出錯代表還沒成功登入，因此要把 token 清空
          setAuthToken(null);
          setErrorMessage(response.toString());
        }
        setUser(response.data);
        // 並導回首頁
        history.push("/");
      });
    });
  };

  const handleInputFocus = () => {
    setErrorMessage(null);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Root>
      <RegisterForm onSubmit={handleSubmit}>
        <RegisterTitle>註冊</RegisterTitle>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <RegisterInput>
          nickname:
          <input
            value={nickname}
            onChange={handleNicknameChange}
            onFocus={handleInputFocus}
          />
        </RegisterInput>
        <RegisterInput>
          username:
          <input
            value={username}
            onChange={handleUsernameChange}
            onFocus={handleInputFocus}
          />
        </RegisterInput>
        <RegisterInput>
          password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onFocus={handleInputFocus}
          />
        </RegisterInput>
        <RegisterSubmit>
          {isLoading ? (
            <SubmitLoading>資料驗證中...</SubmitLoading>
          ) : (
            <>
              <LinkToLogin to="/login">已有帳號</LinkToLogin>
              <button>註冊</button>
            </>
          )}
        </RegisterSubmit>
      </RegisterForm>
    </Root>
  );
}
