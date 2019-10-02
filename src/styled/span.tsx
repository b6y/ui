import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll, textCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export const Span = styled(React.forwardRef(
    (props: types.SpanProps, ref: React.Ref<HTMLSpanElement>) => {
        return <span ref={ref} {...clearAll(props)} />;
    },
))(
    ...baseCompose,
    ...textCompose,
    themed("SpanBox"),
    css,
);
