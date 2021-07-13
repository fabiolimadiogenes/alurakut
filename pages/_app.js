import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`
  /*Reset CSS (Necolas Reset CSS)*/ 
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #cfd7ff;
    font-family: sans-serif;
  }

  #__next {
 display: flex;
 min-height: 100vh;
 flex-direction: column;
}

img{
  max-width: 100%;
  height: auto;
  display: block;
}

h1, h2{
  color: #ffffff;
}

${AlurakutStyles}
`



const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
