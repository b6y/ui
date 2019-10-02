import styled from "@emotion/styled";
import React from "react";
import {theme} from "styled-tools";

import {baseCompose, clearAll, textCompose} from "./base";
import { css, themed } from "./system";
import * as types from "./types";

export const H2 = styled(React.forwardRef(
    (props: types.HeadingProps, ref: React.Ref<HTMLHeadingElement>) => {
        return <div ref={ref} {...clearAll(props)} />;
    },
))(
    ...baseCompose,
    ...textCompose,
    (props) => ({
        borderBottom: `1px solid ${theme("colors.light")(props)}`,
    }),
    themed("Heading"),
    css,
);

H2.defaultProps = {
    m: 0,
    p: 2,
    mb: 2,
    fontSize: 4,
    fontWeight: "400",
};
