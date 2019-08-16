import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getComments } from 'Reducer'
import Comments from './Comments.jsx'

const Story = ({
  getComments,
  by,
  descendants,
  id,
  score,
  time,
  title,
  type,
  url,
  kids
}) => {
  useEffect(() => getComments({ id, kids }), [id])
  return (
    <div>
      <h2>{title}</h2>
      <div>
        Author: {by} / {id}
      </div>
      <div>Score: {score}</div>
      <div>Time: {time}</div>
      <div>{descendants}</div>
      <Comments id={id} />
    </div>
  )
}

export default connect(
  state => state,
  { getComments }
)(Story)
