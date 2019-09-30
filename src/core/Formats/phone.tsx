import React from "react";

import PropTypes from "prop-types";

interface PhoneComponentProps {
  input?: { value: string },
  defaultValue?: string
}

const PhoneComponent = (props: PhoneComponentProps) => {
  const {
    input,
    defaultValue,
  } = props;

  let value: string | undefined = undefined;

  if (input) {
    value = input.value;
  }

  if (!value) {
    return <span>{defaultValue}</span>;
  }

  const phone = value.replace(/([0-9]{2})([0-9]{4,5})([0-9]{4})/, "($1) $2-$3");

  return <span>{phone}</span>;
};

PhoneComponent.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
  }),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

PhoneComponent.defaultProps = {
  defaultValue: "Vázio",
};

export default PhoneComponent;
