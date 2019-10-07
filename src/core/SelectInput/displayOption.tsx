import styled from "@emotion/styled";
import * as emotion from "@emotion/core";
import React from "react";

import { SingleValueProps } from "react-select/src/components/SingleValue";
import { css } from "../../styled";

const CustomDisplayOptionWrapper = styled.div(css);

export const CustomDisplayOption = (props: SingleValueProps<any>) => {
    const { children, className, cx, getStyles, isDisabled, innerProps } = props;
    return (
        <CustomDisplayOptionWrapper
            css={getStyles("singleValue", props)}
            className={(cx as any)(
                {
                    "single-value": true,
                    "single-value--is-disabled": isDisabled,
                },
                className,
            )}
            {...innerProps}
        >
            {children}
        </CustomDisplayOptionWrapper>
    );
};
