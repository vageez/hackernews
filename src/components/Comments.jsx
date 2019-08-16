import React from 'react'
import { connect } from 'react-redux'

const Comment = ({ by, text, time }) => (
  <div>
    <h4>{`User: ${by}`}</h4>
    <div>{`posted: ${time}`}</div>
    <div>{text}</div>
  </div>
)

const Comments = ({ id, comments }) => (
  <div>
    <h3>{`Comments`}</h3>
    {comments[id] && comments[id].cata({
      Just: comments => comments.map(comment => <Comment {...comment} />),
      Nothing: () => 'No comments'
    })}
  </div>
)

export default connect(
  state => ({
    comments: state.stories.comments
  }),
  null
)(Comments)
