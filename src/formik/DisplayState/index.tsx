import styled from "@emotion/styled";
import { connect as formikConnect } from "formik";
import * as R from "ramda";
import React from "react";

const BaseDisplayFormikState = (props: any) => (
  <div style={{ margin: "1rem 0" }}>
    <h3 style={{ fontFamily: "monospace" }} />
    <pre
      style={{
        background: "#f6f8fa",
        fontSize: ".65rem",
        padding: ".5rem",
      }}
    >
      <strong>props</strong> ={" "}
      {JSON.stringify(
        R.dissocPath(["formik", "validationSchema"], props),
        null,
        2,
      )}
    </pre>
  </div>
);

BaseDisplayFormikState.propTypes = {};

export const DisplayFormikState = styled(formikConnect(BaseDisplayFormikState))();
