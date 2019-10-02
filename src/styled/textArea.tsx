import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll, textCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export const TextArea = styled(React.forwardRef(
    (props: types.TextAreaProps, ref: React.Ref<HTMLTextAreaElement>) => {
        return <textarea ref={ref} {...clearAll(props)} />;
    },
))(
    ...baseCompose,
    ...textCompose,
    themed("TextArea"),
    css,
);
