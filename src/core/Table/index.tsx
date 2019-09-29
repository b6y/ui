import styled from "@emotion/styled";
import PropTypes from "prop-types";

import { Box, BoxProps } from "../../styled";

import { getSpace } from "../../styled/system";

import { theme } from "styled-tools";

const TableBody = styled(Box.withComponent("tbody"))``;
const TableHead = styled(Box.withComponent("thead"))``;
const TableFoot = styled(Box.withComponent("tfoot"))``;

const TableRow = styled(Box.withComponent("tr"))``;

const TableColumn = styled(Box.withComponent("td"))`
padding: ${getSpace(2)};
border-top: 1px solid ${theme("colors.light")};
`;

TableColumn.defaultProps = {
  verticalAlign: "top",
};

const TableHeader = styled(Box.withComponent("th"))`
padding: ${getSpace(2)};
text-align: left;
`;

const Table = styled(Box.withComponent("table"))<BoxProps<React.HTMLAttributes<HTMLTableElement>>>`
  & > * > ${TableRow}:first-of-type > ${TableColumn} {
    border-top: none;
  }
`;

Table.defaultProps = {
  width: 1,
  mb: 3,
};

export { Table, TableBody, TableHead, TableFoot, TableRow, TableColumn, TableHeader };
