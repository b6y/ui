import styled from "@emotion/styled";
import ButtonOutline from "../ButtonOutline";
import RouterLink from "../RouterLink";

const ButtonLinkOutline = styled(ButtonOutline)();

ButtonLinkOutline.defaultProps = {
  as: RouterLink,
  textDecoration: "none",
  type: null,
};

export default ButtonLinkOutline;
