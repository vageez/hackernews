import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { media } from '../media.query'

const StyledComment = styled.div`
  font-size: 0.8em;
  ${media.MOBILE`{font-size:0.7em}`};
  padding: 1px 7px;
  border-left: 1px solid #ffffff;
  margin-bottom: 5px;
  background-color: #f7f7f7;
  p {
    word-break: break-all;
  }
`

const Comment = ({ by, text, time }) => (
  <StyledComment>
    <p>
      <i>
        <b>{`${time} by ${by}`}</b>
      </i>
    </p>
    <p>{text}</p>
  </StyledComment>
)

const Comments = ({
  storyComments,
  display_comments,
}) => (
  <div>
    {display_comments.cata({
      On: () => storyComments.map(comment => <Comment key={comment.id} {...comment} />),
      Off: () => ''
    })}
  </div>
)

export default connect(
  state => ({
    comments: state.stories.comments
  }),
  null,
)(Comments)
