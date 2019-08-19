import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getComments, toggleComments } from 'Reducer'
import Comments from './Comments.jsx'
import { media } from '../media.query'

const StoryWrapper = styled.article`
  padding: 5px;
  background-color: #f1f1f1;
  margin: 0 0 15px 0;
  padding: 5px 15px 10px;
  border-bottom: 1px solid #d1d1d1;
`
const StoryInfo = styled.p`
  font-size: 0.8em;
  color: #666666;
  b {
    color: green;
  }
`
const StoryTitle = styled.div`
  font-size: 1.2em;
  ${media.MOBILE`{font-size:1em}`};
`
const CommentHeader = styled.div`
  font-weight: bold;
  font-size: 0.8em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`
const CommentTitle = styled.div`
  width: 90%;
`
const CommentExpand = styled.div`
  width: 10%;
  cursor: pointer;
  text-align: right;
  font-size: 1.5em;
`
const Story = ({
  by,
  id,
  score,
  title,
  url,
  kids,
  num_comments,
  display_time,
  display_comments,
  comments_requested,
  hasComments,
  comments,
  toggleComments,
  getComments
}) => (
  <StoryWrapper>
    <StoryTitle>
      <a href={url} title={title}>
        {title}
      </a>
    </StoryTitle>
    <StoryInfo>
      <b>{score}</b> <i>{`points by ${by} ${display_time}`}</i>
    </StoryInfo>
    {hasComments.cata({
      Yes: () => (
        <>
          <CommentHeader>
            <CommentTitle>{`${num_comments} Comments`}</CommentTitle>
            {display_comments.cata({
              On: () => (
                <CommentExpand onClick={() => toggleComments({ id })}>
                  -
                </CommentExpand>
              ),
              Off: () =>
                comments_requested.cata({
                  Yes: () => (
                    <CommentExpand onClick={() => toggleComments({ kids, id })}>
                      +
                    </CommentExpand>
                  ),
                  No: () => (
                    <CommentExpand onClick={() => getComments({ kids, id })}>
                      +
                    </CommentExpand>
                  )
                })
            })}
          </CommentHeader>
          <Comments
            display_comments={display_comments}
            storyComments={comments}
          />
        </>
      ),
      No: () => (
        <CommentHeader>
          <CommentTitle>{`0 Comments`}</CommentTitle>
        </CommentHeader>
      )
    })}
  </StoryWrapper>
)

export default connect(
  null,
  { getComments, toggleComments }
)(Story)
