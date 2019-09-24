import styled from "@emotion/styled";
import { connect, FormikContext } from "formik";
import React from "react";

import { FormBox } from "../../styled";
import * as types from "../../styled/types";

type FormBoxProps = types.BoxProps<React.HTMLAttributes<HTMLFormElement>>;

type BaseFormProps =
  & FormBoxProps
  & { formik: FormikContext<any> };

export type FormProps = BaseFormProps & Exclude<
  keyof BaseFormProps,
  "onReset" | "onSubmit"
>;

const Form = styled(FormBox)``;

class FormikForm extends React.PureComponent<FormProps> {
  constructor(props: FormProps) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  public render() {
    const { formik: _, onSubmit: _1, onReset: _2, ...props } = this.props;

    return <Form onReset={this.onReset} onSubmit={this.onSubmit} {...props} />;
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

export default connect(FormikForm);
