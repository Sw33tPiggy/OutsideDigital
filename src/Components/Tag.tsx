import styled, { css } from "styled-components";

interface ITagProps {
  active?: boolean;
}

export const Tag = styled.span<ITagProps>`
  padding: 6px 12px;

  ${({ active }) => {
    return active
      ? css`
          background: linear-gradient(
              255.35deg,
              #dc3131 0.83%,
              rgba(255, 79, 79, 0) 108.93%
            ),
            #ff5e56;
          color: #ffffff;
        `
      : css`
          background: #eef0f2;
          color: #000000;
        `;
  }}

  border-radius: 50px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */

  display: flex;
  align-items: center;
  text-align: center;
`;
