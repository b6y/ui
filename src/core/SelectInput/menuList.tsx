import * as emotion from "@emotion/core";
import React from "react";
import { MenuListComponentProps } from "react-select/src/components/Menu";

export const CustomMenuList = (props: MenuListComponentProps<any>) => {
    const { children, className, cx, getStyles, isMulti, innerRef } = props;
    return (
      <div
        className={cx(
          emotion.css(getStyles("menuList", props)).styles,
          {
            "menu-list": true,
            "menu-list--is-multi": isMulti,
          },
          className,
        ) as string}
        ref={innerRef}
      >
        {children}
      </div>
    );
  };
