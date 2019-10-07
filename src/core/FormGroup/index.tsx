import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";

interface WrapperProps {
  compact: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  margin-bottom: ${({ compact }) => (compact ? "0px" : "15px")};
`;

const Label = styled.label`
  font-size: 12px;
  display: block;
  margin-bottom: 5px;
`;

export interface FormGroupProps {
  label: string | React.ReactNode;
  children?: React.ReactNode;
  compact?: boolean;
}

export const FormGroup = ({ label, children, compact }: FormGroupProps) => (
  <Wrapper compact={!!compact}>
    <Label>{label}</Label>
    {children}
  </Wrapper>
);

FormGroup.defaultProps = {
  compact: false,
};