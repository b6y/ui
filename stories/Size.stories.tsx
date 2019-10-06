import { select } from "@storybook/addon-knobs";
import React, { useMemo } from "react";

import { BoxGroup } from "../src/core/BoxGroup";
import { SelectInput, ArrayAdapter } from "../src/core/SelectInput";
import { TextInput } from "../src/core/TextInput";
import { Button } from "../src/core/Button";
import { Box } from "../src/styled";
import { wrap } from "./context";

const defaultOptions = [
  { label: "Value 1", value: 1 },
  { label: "Value 2", value: 2 },
  { label: "Value 3", value: 3 },
  { label: "Value 4", value: 4 },
  { label: "Value 5", value: 5 },
  { label: "Value 6", value: 6 },
  { label: "Value 7", value: 7 },
  { label: "Value 8", value: 8 },
  { label: "Value 9", value: 9 },
  { label: "Value 10", value: 10 },
]

export const simple = wrap(() => {
  const spacing = select("spacing", [0, 1, 2, 3, 4, 5, 6], 2);

  const options = useMemo(() => {
    return new ArrayAdapter(defaultOptions);
  }, []);

  return (
    <Box bg="black" p={spacing}>
      <Box bg="darker" py={spacing}>
        <BoxGroup spacing={spacing}>
          <Box bg="red" width={1}>
            <SelectInput
              size="md"
              isClearable={true}
              options={options}
              value={2}
            />
          </Box>
          <Box bg="red" width={1}>
            <TextInput
              size="md"
              state="default"
              value={2}
            />
          </Box>
          <Box bg="red" width={1}>
            <Button width={1} size="md" state="default">Test</Button>
          </Box>
        </BoxGroup>
      </Box>
    </Box>
  );
});

simple.story = {
  parameters: {},
};

export default {
  title: "Core|Size"
};
