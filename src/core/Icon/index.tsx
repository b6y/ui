import styled from "@emotion/styled";
import React from "react";
import { getColor, getFgColor, getBgColor, Color } from "../../styled/system";

interface ISvgIconProps extends React.SVGProps<SVGSVGElement> {
  mr?: number;
  ml?: number;
  /**
   * _N_o line-height fix _M_argin
   */
  nm?: boolean;
  color?: string;
}
const SvgIcon = styled.svg<ISvgIconProps>(
  `
    margin-right: ${({ mr }) => `${mr}px`};
    margin-left: ${({ ml }) => `${ml}px`};
    shape-rendering: geometricPrecision;
    margin-bottom: ${({nm}) => nm ? "0" : ".125rem"};
  `,
  (props) => {
    if (props.color) {
      return { color: getBgColor(props.color as Color)(props) };
    }

    return {};
  },
);

interface IProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  mr?: number;
  ml?: number;
  nm?: boolean;
}

const Icon = React.forwardRef(function Icon(
  props: IProps,
  ref: React.Ref<SVGSVGElement>,
) {
  const {
    name, size = 16, mr = 0, ml = 0, nm = false
  } = props;

  return (
    <SvgIcon ref={ref} {...props} width={size} height={size}>
      <use xlinkHref={`#${name}`} />
    </SvgIcon>
  );
})

export { SvgIcon };

export default Icon;
