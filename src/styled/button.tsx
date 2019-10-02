import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll, textCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export const Button = styled(React.forwardRef(
    (props: types.ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
        return <button ref={ref} {...clearAll(props)} />;
    },
))(
    ...baseCompose,
    ...textCompose,
    themed("Button"),
    css,
);
