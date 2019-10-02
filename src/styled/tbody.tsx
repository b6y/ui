import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll, flexCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export const TableBody = styled(React.forwardRef(
    (props: types.TableBodyProps, ref: React.Ref<HTMLTableSectionElement>) => {
        return <tbody ref={ref} {...clearAll(props)} />;
    },
))(
    ...baseCompose,
    themed("TableBody"),
);
