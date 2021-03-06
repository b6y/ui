import { FieldProps } from "formik";
import invariant from "invariant";
import memoize from "memoize-one";
import * as R from "ramda";
import React from "react";
import { injectIntl, MessageDescriptor, WrappedComponentProps } from "react-intl";

import { Label } from "../../core/Label";
import {
  TextInput as BaseTextInput,
  TextInputProps as BaseTextInputProps,
} from "../../core/TextInput";
import { genid } from "../commons";
import { ErrorBag } from "../ErrorBag";

export interface TextInputProps extends FieldProps, WrappedComponentProps {
  fieldId: number;
  debugId: boolean;
  disabled: boolean;
  label: string | MessageDescriptor;
  placeholder: string | MessageDescriptor;
  disabledValue: string | MessageDescriptor;
  inputProps?: BaseTextInputProps;
}

interface State {}

// eslint-disable-next-line react/prefer-stateless-function
class TextInputWrapper extends React.PureComponent<TextInputProps, State> {
  public id = memoize((actualId: string) => genid("text-input", actualId));

  public render() {
    const { fieldId, debugId, intl, ...props } = this.props;

    invariant(props.field, "Must be on Formik <Field/> or <FastField/>");

    const id = this.id(fieldId.toString());

    const { disabled, disabledValue } = props;
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

    if (disabled) {
      if (R.isNil(newProps.field.value) && disabledValue) {
        if (!React.isValidElement(disabledValue) && R.is(Object, disabledValue)) {
          newProps.field.value = intl.formatMessage(disabledValue as MessageDescriptor);
        } else {
          newProps.field.value = disabledValue;
        }
      } else {
        newProps.field.value = R.isNil(newProps.field.value) ? "" : String(newProps.field.value);
      }

    } else {
      newProps.field.value = R.isNil(newProps.field.value) ? "" : String(newProps.field.value);
    }

    return (
      <div>
        {labelComponent}
        <BaseTextInput id={id} type="text" {...newProps.field} />
        <ErrorBag mt={1} field={props.field.name} />
      </div>
    );
  }
}

export const TextInput = injectIntl(TextInputWrapper);
