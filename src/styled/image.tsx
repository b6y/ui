import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll, flexCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export const Image = styled(React.forwardRef(
    (props: types.ImageProps, ref: React.Ref<HTMLImageElement>) => {
        return <img ref={ref} {...clearAll(props)} />;
    },
))(
    ...baseCompose,
    {
        maxWidth: "100%",
        height: "auto",
    },
    themed("Image"),
);

Image.defaultProps = {
    m: 0,
};
