import { FieldProps } from "formik";
import invariant from "invariant";
import memoize from "memoize-one";
import * as R from "ramda";
import React from "react";
import { injectIntl, MessageDescriptor, WrappedComponentProps } from "react-intl";

import Label from "../../core/Label";
import BasePhoneInput from "../../core/PhoneInput";
import { genid } from "../commons";
import ErrorBag from "../ErrorBag";

export type PhoneInputProps = FieldProps & WrappedComponentProps & {
  fieldId: number;
  debugId: boolean;
  label: string | MessageDescriptor;
  placeholder: string | MessageDescriptor;
};

interface State {}

// eslint-disable-next-line react/prefer-stateless-function
class PhoneInput extends React.PureComponent<PhoneInputProps, State> {
  public id = memoize((actualId) => genid("text-input", actualId));

  constructor(props: PhoneInputProps) {
    super(props);

    this.changed = this.changed.bind(this);
    this.blurred = this.blurred.bind(this);
  }

  public changed(value: any) {
    const { name } = this.props.field;
    const { setFieldValue } = this.props.form;

    setFieldValue(name, value);
  }

  public blurred() {
    const { name } = this.props.field;
    const { handleBlur } = this.props.form;

    handleBlur(name);
  }

  public render() {
    const { fieldId, debugId, intl, field,  ...props } = this.props;

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
        <BasePhoneInput id={id} onBlur={this.blurred} onChange={this.changed} value={field.value} {...newProps} />
        <ErrorBag mt={1} field={field.name} />
      </div>
    );
  }
}

export default injectIntl(PhoneInput);
