import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll, flexCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export const TableFoot = styled(React.forwardRef(
    (props: types.TableFootProps, ref: React.Ref<HTMLTableSectionElement>) => {
        return <tfoot ref={ref} {...clearAll(props)} />;
    },
))(
    ...baseCompose,
    themed("TableFoot"),
);
