import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';
const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    overflow: hidden;
    color: #626262;
    font-size: 24px;
    font-family: 'Do Hyeon', sans-serif;
  }
  button, html [type="button"] {
    -webkit-appearance: none;   
  }
  * {
    box-sizing: border-box;
  }
`;
export default GlobalStyle;