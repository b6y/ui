import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import { Box, BoxProps } from "../../styled";
import { getSpace } from "../../styled/system";

export interface BoxGroupProps extends BoxProps {
  spacing: number;
}

const Wrapper = React.forwardRef((props: BoxGroupProps, ref: React.Ref<HTMLDivElement>) => {
  const { spacing, ...otherProps } = props;

  return <Box ref={ref} {...otherProps} />;
});

/**
 * Styles children in a such way to normalize `padding-left` and `padding-right`
 * also applying an outer `margin-left` and `margin-right`
 */
export const BoxGroup = styled(Wrapper)`
  display: flex;
  margin-left: ${(props) => getSpace(-props.spacing)(props)};
  margin-right: ${(props) => getSpace(-props.spacing)(props)};
  & > * {
    padding-left: ${(props) => getSpace(props.spacing)(props)};
    padding-right: ${(props) => getSpace(props.spacing)(props)};
  }
`;

BoxGroup.defaultProps = {
  spacing: 2,
};
