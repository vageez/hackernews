import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getComments } from 'Reducer'
import Comments from './Comments.jsx'
import { media } from '../media.query'

const StoryWrapper = styled.article`
 padding:5px;
 background-color: #f1f1f1;
 margin: 0 0 15px 0;
 padding: 5px 15px 10px;
 border-bottom: 1px solid #d1d1d1;
`
const StoryInfo = styled.p`
  font-size:0.8em;
  color:#666666;
  b {
    color:green;
  }
`
const StoryTitle = styled.div`
  font-size:1.2em;
  ${media.MOBILE`{font-size:1em}`};
`

const Story = ({
  getComments,
  by,
  id,
  score,
  title,
  url,
  kids,
  num_comments,
  display_time,
}) => {
  useEffect(() => kids ? getComments({ id, kids }) : undefined, [id])
  return (
    <StoryWrapper>
      <StoryTitle><a href={url} title={title}>{title}</a></StoryTitle>
      <StoryInfo><b>{score}</b> <i>{`points by ${by} ${display_time}`}</i></StoryInfo>
      <Comments id={id} num_comments={num_comments}/>
    </StoryWrapper>
  )
}

export default connect(
  null,
  { getComments }
)(Story)
