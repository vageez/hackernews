import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { FormattedMessage, IntlProvider } from 'react-intl'
import Cookie from 'js-cookie'
import { store } from './store'
import { media } from './media.query'
import Stories from './components/Stories.jsx'
import messages_fr from './translations/fr.json'
import messages_en from './translations/en.json'

const messages = {
  fr: messages_fr,
  en: messages_en
}

const AppWrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin: 5px 10px;
`
const H1 = styled.h1`
  font-size: 1.5em;
  ${media.MOBILE`{font-size:1.2em}`};
`

const locale = Cookie.get('locale') || 'en'

const App = () => (
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages[locale]}>
      <AppWrapper>
        <H1>
          <FormattedMessage
            id={`app.hackerNewsH1`}
            defaultMessage={`Hackernews Top 10 Stories!`}
            description={`Hackernews H1 Title Tag`}
          />
        </H1>
        <Stories />
      </AppWrapper>
    </IntlProvider>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
