import { FieldProps } from "formik";
import invariant from "invariant";
import memoize from "memoize-one";
import * as R from "ramda";
import React from "react";
import { injectIntl, MessageDescriptor, WrappedComponentProps } from "react-intl";

import { Label } from "../../core/Label";
import {
  MultiSelectInput as BaseMultiSelectInput,
  MultiSelectInputProps as BaseMultiSelectInputProps,
} from "../../core/MultiSelectInput";
import { genid } from "../commons";
import { ErrorBag } from "../ErrorBag";

export type MultiSelectInputProps = BaseMultiSelectInputProps & FieldProps & WrappedComponentProps & {
  fieldId: number;
  debugId: boolean;
  isClearable: boolean;
  label: string | MessageDescriptor;
  placeholder: string | MessageDescriptor;
};

interface State {}

class MultiSelectInputWrapper extends React.PureComponent<MultiSelectInputProps, State> {
  public static defaultProps = {
    isClearable: true,
  };

  public id = memoize((actualId) => genid("multi-select-input", actualId));

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

    return (
      <div>
        {labelComponent}
        <BaseMultiSelectInput {...newProps} />
        <ErrorBag mt={1} field={props.field.name} />
      </div>
    );
  }
}


export const MultiSelectInput = injectIntl(MultiSelectInputWrapper);