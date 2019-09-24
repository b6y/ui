import { FieldProps } from "formik";
import invariant from "invariant";
import memoize from "memoize-one";
import React from "react";

import BaseInput from "../../core/InlineDatePickerInput";
import Label from "../../core/Label";
import ErrorBag from "../ErrorBag";
import { genid } from "../commons";

import * as R from "ramda";
import { injectIntl, MessageDescriptor, WrappedComponentProps } from "react-intl";

export type InlineDatePickerInputProps = FieldProps & WrappedComponentProps & {
  fieldId: number;
  debugId: boolean;
  label: string | MessageDescriptor;
  placeholder: string | MessageDescriptor;
}

interface State {}

// eslint-disable-next-line react/prefer-stateless-function
class InlineDatePickerInput extends React.PureComponent<InlineDatePickerInputProps, State> {
  public id = memoize((actualId) => genid("inline-date-picker-input", actualId));

  constructor(props: InlineDatePickerInputProps) {
    super(props);

    this.changed = this.changed.bind(this);
  }

  public changed(value: any) {
    const { name } = this.props.field;
    const { setFieldValue } = this.props.form;

    setFieldValue(name, value);
  }

  public render() {
    const { fieldId, debugId, intl, field, ...props } = this.props;

    invariant(field, "Must be on Formik <Field/> or <FastField/>");

    const id = this.id(fieldId);

    let { placeholder, label } = props;

    if (!React.isValidElement(label) && R.is(Object, label)) {
      label = intl.formatMessage(label as MessageDescriptor);
    }

    if (label && !placeholder && typeof label === "string") {
      placeholder = label;
    }

    if (R.is(Object, placeholder)) {
      placeholder = intl.formatMessage(placeholder as MessageDescriptor);
    }

    let labelComponent = null;
    if (label) {
      labelComponent = (
        <Label htmlFor={id}>
          {label} {debugId ? <b>id: {id}</b> : null}
        </Label>
      );
    }

    const newProps = { ...props, label, placeholder, id };

    return (
      <div>
        {labelComponent}
        <BaseInput id={id} onChange={this.changed} value={field.value} {...newProps} />
        <ErrorBag mt={1} field={field.name} />
      </div>
    );
  }
}

export default injectIntl(InlineDatePickerInput);
