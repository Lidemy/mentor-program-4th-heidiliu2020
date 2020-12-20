import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { MEDIA_QUERY_MD } from "../../constants/style";
import { addNewPost } from "../../WebAPI";
import { LoadingContext } from "../../contexts";

const Root = styled.div`
  min-height: 100vh;
`;

const NewPostForm = styled.form`
  max-width: 600px;
  margin: 60px auto;
  padding: 40px 60px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  background: rgba(246, 246, 246, 0.9);
  font-size: 18px;

  ${MEDIA_QUERY_MD} {
    margin: 30px auto;
  }
`;
const NewPostLable = styled.div`
  margin: 10px 0;
  font-size: 20px;
`;

const NewPostTitleInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 18px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  letter-spacing: 1.5px;
`;

const NewPostTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  font-size: 18px;
  letter-spacing: 1.5px;
`;

const NewPostSubmit = styled.div`
  margin-top: 16px;
  text-align: center;

  button {
    color: #ddd;
    background-color: #343a40;
    border-radius: 4px;
    font-size: 16px;
    padding: 6px 16px;
    cursor: pointer;
    border-radius: 20px;
    border: 1px solid #555;
    outline: transparent;
  }
`;

const ErrorMessage = styled.div`
  color: #db4c3f;
  font-weight: 700;
`;

const NewPostLoading = styled.div`
  font-weight: 700;
  color: #555;
  padding: 9px;
`;

export default function NewPostPage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleInputFocus = () => {
    setErrorMessage(null);
  };

  const handleTextareaFocus = () => {
    setErrorMessage(null);
  };

  const handleNewPostSubmit = (e) => {
    // 阻止預設的表單發送行為
    e.preventDefault();
    setIsLoading(true);
    addNewPost(title, body)
      .then((data) => {
        setIsLoading(false);
        if (data.ok === 0) {
          setErrorMessage(data.message);
          return;
        }
        history.push("/");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <Root>
      <NewPostForm onSubmit={handleNewPostSubmit}>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <NewPostLable>文章標題</NewPostLable>
        <NewPostTitleInput
          value={title}
          onChange={handleTitleChange}
          onFocus={handleInputFocus}
        />
        <NewPostLable>文章內容</NewPostLable>
        <NewPostTextArea
          value={body}
          onChange={handleBodyChange}
          onFocus={handleTextareaFocus}
          rows={14}
        />
        <NewPostSubmit>
          {isLoading ? (
            <NewPostLoading>發布中...</NewPostLoading>
          ) : (
            <button>發布</button>
          )}
        </NewPostSubmit>
      </NewPostForm>
    </Root>
  );
}
