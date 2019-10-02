import styled from "@emotion/styled";
import React from "react";

import {baseCompose, clearAll, flexCompose} from "./base";
import {css, getSpace, themed} from "./system";
import * as types from "./types";
import {theme} from "styled-tools";

export const TableHead = styled(React.forwardRef(
    (props: types.TableHeadProps, ref: React.Ref<HTMLTableSectionElement>) => {
        return <thead ref={ref} {...clearAll(props)} />;
    },
))(
    (props) => ({
        textAlign: 'left',
        padding: getSpace(2)(props),
    }),
    ...baseCompose,
    themed("TableHead"),
);
