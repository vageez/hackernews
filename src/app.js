import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { store } from './store'
import { media } from './media.query'
import Stories from './components/Stories.jsx'

const AppWrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin: 5px 10px;
`
const H1 = styled.h1`
  font-size: 1.5em;
  ${media.MOBILE`{font-size:1.2em}`};
`
const App = () => (
  <Provider store={store}>
    <AppWrapper>
      <H1>{`Hackernews Top 10 Stories!`}</H1>
      <Stories />
    </AppWrapper>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
