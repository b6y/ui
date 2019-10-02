import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll, textCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export const Text = styled(React.forwardRef(
    (props: types.TextProps, ref: React.Ref<HTMLParagraphElement>) => {
        return <div ref={ref} {...clearAll(props)} />;
    },
))(
    ...baseCompose,
    ...textCompose,
    themed("Text"),
    css,
);
