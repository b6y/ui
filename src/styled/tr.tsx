import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll, flexCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export const TableRow = styled(React.forwardRef(
    (props: types.TableRowProps, ref: React.Ref<HTMLTableRowElement>) => {
        return <tr ref={ref} {...clearAll(props)} />;
    },
))(
    ...baseCompose,
    themed("TableRow"),
);
