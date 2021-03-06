import { FieldProps } from "formik";
import invariant from "invariant";
import memoize from "memoize-one";
import * as R from "ramda";
import React from "react";
import { injectIntl, MessageDescriptor, WrappedComponentProps } from "react-intl";

import { Label } from "../../core/Label";
import {
  TextAreaInput as BaseTextAreaInput,
  TextAreaInputProps as BaseTextAreaInputProps,
} from "../../core/TextAreaInput";
import { genid } from "../commons";
import { ErrorBag } from "../ErrorBag";

export type TextAreaInputProps = FieldProps & WrappedComponentProps & {
  fieldId: number;
  debugId: boolean;
  label: string | MessageDescriptor;
  placeholder: string | MessageDescriptor;
  inputProps: BaseTextAreaInputProps
};

interface State {}

// eslint-disable-next-line react/prefer-stateless-function
class TextAreaInputWrapper extends React.PureComponent<TextAreaInputProps, State> {
  public id = memoize((actualId) => genid("text-area-input", actualId));

  public render() {
    const { fieldId, debugId, intl, ...props } = this.props;

    invariant(props.field, "Must be on Formik <Field/> or <FastField/>");

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

    newProps.field.value = R.isNil(newProps.field.value) ? "" : String(newProps.field.value);

    return (
      <div>
        {labelComponent}
        <BaseTextAreaInput id={id} {...newProps.field} {...(newProps.inputProps || {})} />
        <ErrorBag mt={1} field={props.field.name} />
      </div>
    );
  }
}

export const TextAreaInput = injectIntl(TextAreaInputWrapper);
