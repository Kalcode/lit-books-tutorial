import { createGlobalStyle } from 'styled-components'
import { Colors } from './Colors';

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${Colors.black};
    background-color: ${Colors.lightblue};
  }
`