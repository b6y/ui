import styled from "@emotion/styled";
import React from "react";
import { Color, getBgColor, getColor, getFgColor, WithStyled } from "../../styled";

type SvgIconProps = WithStyled & {
  mr?: number;
  ml?: number;
  /**
   * _N_o line-height fix _M_argin
   */
  nm?: boolean;
  color?: string;
}

const SvgIcon = styled("svg")<SvgIconProps>(
  (props) => ({
    marginLeft: `${props.ml}px`,
    marginRight: `${props.mr}px`,
    shapeRendering: "geometricPrecision",
    marginBottom: props.nm ? "0" : ".125rem",
  }),
  (props) => {
    if (props.color) {
      return { color: getBgColor(props.color as Color)(props) };
    }

    return {};
  },
);

export type IconProps = React.SVGProps<SVGSVGElement> & WithStyled & {
  name: string;
  size?: number;
  mr?: number;
  ml?: number;
  nm?: boolean;
};

const Icon = React.forwardRef(function Icon(
  props: IconProps,
  ref: React.Ref<SVGSVGElement>,
) {
  const {
    name, size = 16, mr = 0, ml = 0, nm = false,
  } = props;

  return (
    <SvgIcon ref={ref} {...props} width={size} height={size}>
      <use xlinkHref={`#${name}`} />
    </SvgIcon>
  );
});

export { SvgIcon };

export default Icon;
