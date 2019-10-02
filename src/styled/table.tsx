import styled from "@emotion/styled";
import { css } from "@emotion/core";
import React from "react";

import {baseCompose, clearAll, flexCompose} from "./base";
import { themed } from "./system";
import * as types from "./types";
import {TableRow} from "./tr";
import {TableCell} from "./td";

export const Table = styled(React.forwardRef(
    (props: types.TableProps, ref: React.Ref<HTMLTableElement>) => {
        return <table ref={ref} {...clearAll(props)} />;
    },
))(
    (props) => css`
      & > * > ${TableRow}:first-of-type > ${TableCell} {
        border-top: none;
      }
    `,
    ...baseCompose,
    themed("Table"),
);

Table.defaultProps = {
    width: 1,
    mb: 3,
};