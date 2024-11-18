import { createGlobalStyle  } from 'styled-components'
import MainPageNav from './components/MainPageNav'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #0a0b0b;
    color: #aaa;
    letter-spacing: 0.15px;
    font-weight: 500;
    font-size: 22px;
    font-family: "Michroma", sans-serif;
  }
  p {
    font-family: "Michroma", sans-serif;
  }
`

const App = () => {

  return (
    <div>
      <GlobalStyle />
      <MainPageNav />
    </div>
  )
}

export default App
