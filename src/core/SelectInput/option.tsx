import styled from "@emotion/styled";
import React from "react";

import { OptionProps } from "react-select/src/components/Option";
import { css } from "../../styled";

const CustomOptionWrapper = styled.div(css);

export const CustomOption = (props: OptionProps<any>) => {
    const {
        children,
        className,
        cx,
        getStyles,
        isDisabled,
        isFocused,
        isSelected,
        innerRef,
        innerProps,
    } = props;
    return (
        <CustomOptionWrapper
            css={getStyles("option", props)}
            className={(cx as any)(
                {
                    "option": true,
                    "option--is-disabled": isDisabled,
                    "option--is-focused": isFocused,
                    "option--is-selected": isSelected,
                },
                className,
            )}
            ref={innerRef}
            {...innerProps}
        >
            {children}
        </CustomOptionWrapper>
    );
};
