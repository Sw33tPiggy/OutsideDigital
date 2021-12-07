import { memo, useState } from "react";
import styled, { css } from "styled-components";

interface IInputCoreProps {
  error?: boolean;
}

const InputCore = styled.input<IInputCoreProps>`
  padding: 8px 10px;
  border: 1px solid #dfe3e6;
  width: 100%;
  border-radius: 3px;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  --offset-left: 10px;

  outline: none;
  &::placeholder {
    color: #bec5cc;
  }

  &:hover {
    border: 1px solid #000000;
  }

  ${({ error }) =>
    error &&
    css`
      border: 1px solid #ea0029;
    `}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Error = styled.span`
  font-size: 10px;
  line-height: 12px;

  color: #ea0029;
`;

type IDeafultInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface IInputProps {
  error?: string;
  value?: string;
  onChange?: (newValue: string) => void;
  onFocus: IDeafultInputProps["onFocus"];
  onBlur: IDeafultInputProps["onBlur"];
  placeholder: IDeafultInputProps["placeholder"];
  className?: string;
}

export const Input = styled(
  ({ error, value, onChange, className, ...rest }: IInputProps) => {
    return (
      <Container className={className}>
        <InputCore
          error={!!error}
          value={value}
          onChange={(e) => {
            onChange?.(e.target.value);
          }}
          {...rest}
        />
        {error && <Error>{error}</Error>}
      </Container>
    );
  }
)``;
