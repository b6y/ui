import styled from "@emotion/styled";
import { connect as formikConnect, FormikContext } from "formik";
import React from "react";
import { injectIntl, MessageDescriptor, WrappedComponentProps } from "react-intl";

import { messages as errorMessages } from "../../messages/errors";
import { Box, Text } from "../../styled";
import * as types from "../../styled/types";

interface ErrorBagProps extends types.BoxProps, WrappedComponentProps {
  field?: string;
}

interface State {}

class BaseErrorBag extends React.PureComponent<ErrorBagProps & { formik: FormikContext<any> }, State> {
  public static defaultProps = {
    field: "$",
  };

  public static cache: { [key: string]: any } = {};

  public render() {
    const { formik, field, children, ...props } = this.props;

    if (field && formik.errors && formik.errors[field]) {
      const originalError = formik.errors[field];
      let error = originalError;

      if (typeof originalError === "string") {
        if (BaseErrorBag.cache[originalError]) {
          error = BaseErrorBag.cache[originalError];
        } else {

          if (typeof error === "string" && error.startsWith("#")) {
            const errorKey = error.slice(1);

            if (errorMessages.hasOwnProperty(errorKey)) {
              error = this.props.intl.formatMessage(
                // TODO: !!!
                (errorMessages as any)[errorKey],
              );
            } else {
              error = this.props.intl.formatMessage({
                id: `errors.${error.slice(1)}`,
                defaultMessage: "INVALID_MESSAGE",
              });
            }

            if (error === "INVALID_MESSAGE") {
              console.warn("[INVALID_MESSAGE]", originalError);
              error = originalError;
            }
          }
          BaseErrorBag.cache[originalError] = error;
        }
      }

      return (
        <Box {...props}>
          <Text color="red">
            {error}
          </Text>
        </Box>
      );
    }

    return null;
  }
}

export const ErrorBag = styled(injectIntl(formikConnect<ErrorBagProps>(BaseErrorBag)))();
