import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll, textCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export const Link = styled(React.forwardRef(
    (props: types.LinkProps, ref: React.Ref<HTMLAnchorElement>) => {
        return <a ref={ref} {...clearAll(props)} />;
    },
))(
    ...baseCompose,
    ...textCompose,
    themed("Link"),
    css,
);
