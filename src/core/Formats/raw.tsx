import React from "react";

import PropTypes from "prop-types";

interface RawComponentProps {
  input?: { value: string },
  defaultValue?: string
}

const RawComponent = (props: RawComponentProps) => {
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

  return <span>{value}</span>;
};

RawComponent.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
  }),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

RawComponent.defaultProps = {
  defaultValue: "Vázio",
};

export default RawComponent;
