import React from 'react'
import { connect } from 'react-redux'
import { toggleComments } from 'Reducer'
import styled from 'styled-components'
import { media } from '../media.query'

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

const StyledComment = styled.div`
  font-size:0.8em;
  ${media.MOBILE`{font-size:0.7em}`};
  padding: 0 0 0 10px;
  border-left: 1px solid #ffffff;
  margin-bottom: 5px;
  p {
    word-break: break-all;
  }
`

const Comment = ({ by, text, time }) => (
  <StyledComment>
    <p>
      <i><b>{`${time} by ${by}`}</b></i>
    </p>
    <p>{text}</p>
  </StyledComment>
)

const Comments = ({ id, comments, num_comments, toggleComments }) => (
  <div>
    <CommentHeader>
      <CommentTitle>{`${num_comments} Comments`}</CommentTitle>
      {comments[id] &&
        comments[id].toggle.cata({
          On: () => (
            <CommentExpand onClick={() => toggleComments({ id })}>
              -
            </CommentExpand>
          ),
          Off: () => (
            <CommentExpand onClick={() => toggleComments({ id })}>
              +
            </CommentExpand>
          )
        })}
    </CommentHeader>
    {comments[id] &&
      comments[id].toggle.cata({
        On: () =>
          comments[id].items.cata({
            Just: comments =>
              comments.map(comment => (
                <Comment key={comment.id} {...comment} />
              )),
            Nothing: () => 'No comments'
          }),
        Off: () => ''
      })}
  </div>
)

export default connect(
  state => ({
    comments: state.stories.comments
  }),
  { toggleComments }
)(Comments)
