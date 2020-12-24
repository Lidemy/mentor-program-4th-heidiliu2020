import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { MEDIA_QUERY_MD } from "../../constants/style";
import { getPost } from "../../WebAPI";
import { LoadingContext } from "../../contexts";
import Loading from "../../components/Loading";

const Root = styled.div`
  min-height: 100vh;
`;

const PostContainer = styled.div`
  padding: 60px;
  max-width: 900px;
  margin: 00px auto;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  background: rgba(246, 246, 246, 0.9);

  ${MEDIA_QUERY_MD} {
    padding: 40px 20px;
  }
`;

const PostTitle = styled.div`
  font-size: 36px;
  font-weight: 700;
`;

const PostHeader = styled.div`
  margin: 16px 0;
  padding: 8px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);

  & div {
    margin-top: 8px;
  }
`;

const PostAuthor = styled.div``;

const PostDate = styled.div``;

const PostBody = styled.div`
  font-size: 20px;
  letter-spacing: 3px;
  line-height: 1.5;
  word-break: break-all;
  white-space: pre-line;
`;

export default function PostPage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPost(id)
      .then((post) => setPost(post[0]))
      .then(() => setIsLoading(false));
  }, [setIsLoading]);

  return (
    <Root>
      {isLoading ? (
        <Loading />
      ) : (
        <PostContainer>
          {/* post &&: 確認陣列裡面有東西才會執行 */}
          <PostTitle>{post && post.title}</PostTitle>
          <PostHeader>
            <PostAuthor>作者：{post && post.user.username}</PostAuthor>
            <PostDate>
              時間：{post && new Date(post.createdAt).toLocaleString()}
            </PostDate>
          </PostHeader>
          <PostBody>{post && post.body}</PostBody>
        </PostContainer>
      )}
    </Root>
  );
}
