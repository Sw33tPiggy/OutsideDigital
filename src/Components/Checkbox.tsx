import { useState } from "react";
import styled, { css } from "styled-components";

// const _CheckBox = styled.input.attrs(() => ({
//   type: "checkbox",
// }))`
//   background: linear-gradient(
//       255.35deg,
//       #dc3131 0.83%,
//       rgba(255, 79, 79, 0) 108.93%
//     ),
//     #ff5e56;
//   border-radius: 6px;
// `;

interface ICheckboxProps {
  value?: boolean;
  onChange?: (newValue: boolean) => void;
}

export const Checkbox = (props: ICheckboxProps) => {
  const [checked, setChecked] = useState(props.value || false);
  return (
    <Container checked={checked}>
      <HiddenInput
        onChange={() => {
          setChecked((prev) => {
            props.onChange?.(!prev);
            return !prev;
          });
        }}
      />
      <Checkmark />
    </Container>
  );
};

const HiddenInput = styled.input.attrs(() => ({
  type: "checkbox",
}))`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const Container = styled.label<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  cursor: pointer;
  border: 1px solid #dfe3e6;
  background: #ffffff;

  border-radius: 6px;
  

  &:hover {
    border: 1px solid #000000;
  }

  ${({ checked }) =>
    checked &&
    css`
      background: linear-gradient(
          255.35deg,
          #dc3131 0.83%,
          rgba(255, 79, 79, 0) 108.93%
        ),
        #ff5e56;
    `}
`;

const Checkmark = () => (
  <svg
    width="14"
    height="11"
    viewBox="0 0 14 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.45455 8.70149L1.11364 5.25373L0 6.40299L4.45455 11L14 1.14925L12.8864 0L4.45455 8.70149Z"
      fill="white"
    />
  </svg>
);
