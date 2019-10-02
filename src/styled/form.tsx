import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll, textCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export const Form = styled(React.forwardRef(
    (props: types.FormProps, ref: React.Ref<HTMLFormElement>) => {
        return <form ref={ref} {...clearAll(props)} />;
    },
))(
    ...baseCompose,
    themed("Form"),
    css,
);
