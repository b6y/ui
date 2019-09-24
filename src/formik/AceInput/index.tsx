import { FieldProps } from "formik";
import invariant from "invariant";
import memoize from "memoize-one";
import * as R from "ramda";
import React from "react";
import { FormattedMessage, InjectedIntl, injectIntl } from "react-intl";

import Label from "../../core/Label";
import BaseAceInput from "../../ace/index";
import * as types from "../../styled/types";
import { genid } from "../commons";
import ErrorBag from "../ErrorBag";

interface Props extends types.Box, FieldProps {
  extraLibs?: { [name: string]: string };
  mode: string;
  fieldId: number;
  debugId: boolean;
  isClearable: boolean;
  label: string | FormattedMessage.MessageDescriptor;
  placeholder: string | FormattedMessage.MessageDescriptor;
  intl: InjectedIntl;
}
interface State {}

class AceInput extends React.PureComponent<Props, State> {
  public static defaultProps = {
    isClearable: true,
  };

  public id = memoize((actualId) => genid("ace-input", actualId));

  public render() {
    const { fieldId, debugId, intl, ...props } = this.props;

    invariant(props.field, "Must be on Formik <Field/> or <FastField/>");

    const id = this.id(fieldId);

    let { placeholder, label } = props;

    if (!React.isValidElement(label) && R.is(Object, label)) {
      label = intl.formatMessage(label as FormattedMessage.MessageDescriptor);
    }

    if (label && !placeholder && typeof label === "string") {
      placeholder = label;
    }

    if (R.is(Object, placeholder)) {
      placeholder = intl.formatMessage(placeholder as FormattedMessage.MessageDescriptor);
    }

    let labelComponent = null;
    if (label) {
      labelComponent = (
        <Label htmlFor={id}>
          {label} {debugId ? <b>id: {id}</b> : null}
        </Label>
      );
    }

    // const newProps = { ...props, label, placeholder, id };

    return (
      <div>
        {labelComponent}
        <BaseAceInput
          extraLibs={props.extraLibs}
          name={props.field.name}
          value={props.field.value || ""}
          mode={props.mode}
          onChange={(value) => props.form.setFieldValue(props.field.name, value)}
          onBlur={() => props.form.setFieldTouched(props.field.name, true) }
        />
        <ErrorBag mt={1} field={props.field.name} />
      </div>
    );
  }
}

export default injectIntl(AceInput);
