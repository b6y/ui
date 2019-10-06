import * as emotion from "@emotion/core";
import React from "react";

import { SingleValueProps } from "react-select/src/components/SingleValue";

export const CustomDisplayOption = (props: SingleValueProps<any>) => {
    const { children, className, cx, getStyles, isDisabled, innerProps } = props;
    return (
        <div
            className={cx(
                emotion.css(getStyles("singleValue", props)).styles,
                {
                    "single-value": true,
                    "single-value--is-disabled": isDisabled,
                },
                className,
            ) as string}
            {...innerProps}
        >
            {children}
        </div>
    );
};
