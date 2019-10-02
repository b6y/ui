import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll, textCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export const Box = styled(React.forwardRef(
    (props: types.BoxProps, ref: React.Ref<HTMLDivElement>) => {
        return <div ref={ref} {...clearAll(props)} />;
    },
))(
    ...baseCompose,
    themed("Box"),
    css,
);
