import React from "react";

import { Button } from "../src/core/Button";
import { Modal } from "../src/core/Modal";
import { wrap } from "./context";

export const simple = wrap(() => {
  const [visible, setVisible] = React.useState(false);

  const toggle = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Button state="default" size="md" onClick={toggle}>
        Show modal
      </Button>
      <Modal visible={visible} borderColor="primary">
        <Modal.Header>
          <div>Hello</div>
        </Modal.Header>
        <Modal.Body>
          <b>World</b>
        </Modal.Body>
        <Modal.Footer>
          <Button state="warning" size="md" onClick={toggle}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

simple.story = {
  parameters: {},
};

export default {
  title: "Core|Modal",
  component: Modal,
};
