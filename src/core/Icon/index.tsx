import styled from "@emotion/styled";
import React from "react";
import { ColorAlias, getBgColor, getColor, getFgColor, WithStyled } from "../../styled";

export interface SvgIconProps extends
  WithStyled,
  Omit<JSX.IntrinsicElements["svg"], "color" | "css" | "ref"> {
  mr?: number;
  ml?: number;
  /**
   * _N_o line-height fix _M_argin
   */
  nm?: boolean;
  color?: string;
}

const StyledSvg = styled.svg``;

const SvgIconWrapper = (props: SvgIconProps) => {
  const { color, mr, ml, nm, ...filteredProps } = props;

  return <StyledSvg {...filteredProps} />;
}

export const SvgIcon = styled(SvgIconWrapper)(
  (props) => ({
    marginLeft: `${props.ml}px`,
    marginRight: `${props.mr}px`,
    shapeRendering: "geometricPrecision",
    marginBottom: props.nm ? "0" : ".125rem",
  }),
  (props) => {
    if (props.color) {
      return { color: getBgColor(props.color as ColorAlias)(props) };
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

export const Icon = React.forwardRef(function Icon(
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
