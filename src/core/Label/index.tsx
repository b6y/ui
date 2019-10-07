import styled from "@emotion/styled";

import { Box } from "../../styled";

export const Label = styled(Box.withComponent("label"))`
  display: block;
  font-weight: 500;
`;

Label.defaultProps = {
  mb: 1,
};

Label.displayName = "Label";
