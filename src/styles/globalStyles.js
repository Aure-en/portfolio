import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    width: 100vw;
    max-width: 100%;
    font-family: "Source Sans Pro", "Open Sans", "Trebuchet MS", sans-serif;
    font-size: 0.9375rem;
    background: ${({ theme }) => theme.bg_app};
    color: ${({ theme }) => theme.text_primary};
    font-weight: 300;
  }

  p {
    text-indent: 1rem;
    line-height: 1.5rem;
  }

  ul {
    line-height: 1.5rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    &:focus {
      outline: 1px solid transparent;
    }
  }
`;

export default GlobalStyles;
