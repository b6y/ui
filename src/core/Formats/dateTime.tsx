import React from "react";

import { DateTime } from "luxon";
import PropTypes from "prop-types";

interface DateTimeComponentProps {
  input?: { value: string },
  defaultValue?: string
}

const DateTimeComponent = (props: DateTimeComponentProps) => {
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

  return (
    <span>
      {DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)}
    </span>
  );
};

DateTimeComponent.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
  }),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

DateTimeComponent.defaultProps = {
  defaultValue: "Vázio",
};

export default DateTimeComponent;
