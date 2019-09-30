import styled from "@emotion/styled";
import PropTypes from "prop-types";

import { Box, BoxProps } from "../../styled";
import { getSpace } from "../../styled/system";

type BoxGroupProps = BoxProps & {
  spacing: number;
};

const BoxGroup = styled(Box)<BoxGroupProps>`
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

export default BoxGroup;
