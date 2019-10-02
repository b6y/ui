import styled from "@emotion/styled";
import { connect, FormikContext } from "formik";
import React from "react";

import { Form as BaseForm, FormProps as BaseFormProps } from "../../styled";

export interface InnerFormProps extends BaseFormProps {
  formik: FormikContext<any>;
}

export interface FormProps extends BaseFormProps {}

class FormikForm extends React.PureComponent<InnerFormProps> {
  constructor(props: InnerFormProps) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  public render() {
    const { formik: _, onSubmit: _1, onReset: _2, ...props } = this.props;

    return <BaseForm onReset={this.onReset} onSubmit={this.onSubmit} {...props} />;
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const { formik: { handleSubmit } } = this.props;

    event.stopPropagation();

    return handleSubmit(event);
  }

  private onReset(event: React.FormEvent<HTMLFormElement>) {
    const { formik: { handleReset } } = this.props;

    return handleReset();
  }
}

export default connect<FormProps>(FormikForm);
