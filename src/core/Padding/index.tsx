import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import { Box, BoxProps } from "../../styled";
import { getSpace } from "../../styled/system";

export interface PaddingProps extends BoxProps {
  inverse?: boolean;
  spacing?: number;
};

const Wrapper = React.forwardRef((props: PaddingProps, ref: React.Ref<HTMLDivElement>) => {
  const { inverse, spacing, ...cleanProps } = props;
  return <Box {...cleanProps} />;
})

export const Padding = styled(Wrapper)`
  display: flex;
  flex-direction: ${(props) => props.inverse ? "row-reverse" : "row"};
  & > * {
    ${(props) => props.inverse ? "margin-left" : "margin-right"}: ${(props) => getSpace(props.spacing)(props)};
  }
`;

Padding.defaultProps = {
  spacing: 2,
  inverse: false,
};

export default Padding;
