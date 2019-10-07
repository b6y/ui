import * as emotion from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import { PlaceholderProps } from "react-select/src/components/Placeholder";

import { css } from "../../styled";

const CustomPlaceholderWrapper = styled.div(css);
const CustomPlaceholderContent = styled.div(css);

export const CustomPlaceholder = (props: PlaceholderProps<any>) => {
    const { children, className, cx, getStyles, innerProps } = props;

    const placeholderStyles: emotion.InterpolationWithTheme<any> = getStyles("placeholder", props);

    const wrapperStyles: emotion.InterpolationWithTheme<any> = {
        ...(placeholderStyles.wrapper as {} || {}),
    };

    return (
        <>
            <CustomPlaceholderContent
                css={{...placeholderStyles, margin: 0}}
                className={(cx as any)(
                    {
                        placeholder: true,
                    },
                    className,
                )}
                {...innerProps}
            >
                {children}
            </CustomPlaceholderContent>
            <CustomPlaceholderWrapper css={wrapperStyles}>
                &nbsp;
            </CustomPlaceholderWrapper>
        </>
    );
};
