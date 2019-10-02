import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll} from "./base";
import {getSpace, themed} from "./system";
import * as types from "./types";
import {theme} from "styled-tools";

export const TableCell = styled(React.forwardRef(
    (props: types.TableCellProps, ref: React.Ref<HTMLTableCellElement>) => {
        return <td ref={ref} {...clearAll(props)} />;
    },
))(
    (props) => ({
        padding: getSpace(2)(props),
        borderTop: `1px solid ${theme("colors.light")(props)}`
    }),
    ...baseCompose,
    themed("TableCell"),
);

TableCell.defaultProps = {
    verticalAlign: "top",
}
