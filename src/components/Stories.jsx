import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getTopStories } from 'Reducer'
import Story from './Story.jsx'

const Stories = ({ getTopStories, items }) => {
  useEffect(() => getTopStories(), [])
  return items.cata({
    Just: stories => <section>{stories.map(story => <Story key={story.id} {...story} />)}</section>,
    Nothing: () => <div>{`Fetching Top 20 Stories`}</div>
  })
}

export default connect(
  state => ({ items: state.stories.items }),
  { getTopStories }
)(Stories)
