import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll, textCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export const Input = styled(React.forwardRef(
    (props: types.InputProps, ref: React.Ref<HTMLInputElement>) => {
        return <input ref={ref} {...clearAll(props)} />;
    },
))(
    ...baseCompose,
    ...textCompose,
    themed("Input"),
    css,
);
