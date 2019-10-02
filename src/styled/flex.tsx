import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll, flexCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export const Flex = styled(React.forwardRef(
    (props: types.FlexProps, ref: React.Ref<HTMLDivElement>) => {
        return <div ref={ref} {...clearAll(props)} />;
    },
))(
    ...baseCompose,
    ...flexCompose,
    {
        display: "flex",
    },
    themed("Flex"),
);
