import styled, { css } from "styled-components";

interface IButtonProps {
  primary?: boolean;
}

export const Button = styled.button<IButtonProps>`
  display: flex;

  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 6px;

  ${({ primary }) => aditionalButtonCSS(!!primary)}

  /* width: 280px; */
  /* height: 56px; */
  color: white;

  font-family: Lab Grotesque;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
`;

const aditionalButtonCSS = (primary: boolean) => {
  if (primary) {
    return css`
      border: none;
      box-shadow: 0px 0px 24px rgba(234, 0, 41, 0.33);
      background: linear-gradient(
          255.35deg,
          #dc3131 0.83%,
          rgba(255, 79, 79, 0) 108.93%
        ),
        #ff5e56;
      &:hover {
        background: #ea0029;
      }
    `;
  }
  return css`
    border: 1px solid #ffffff;
    filter: drop-shadow(0px 0px 44px #cfdae7);
    background: transparent;
    &:hover {
      background: white;
      color: black;
    }
  `;
};
