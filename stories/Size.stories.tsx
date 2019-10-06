import { select } from "@storybook/addon-knobs";
import React, { useMemo, useState } from "react";

import { BoxGroup } from "../src/core/BoxGroup";
import { Button } from "../src/core/Button";
import { ButtonOutline } from "../src/core/ButtonOutline";
import { ButtonTransparent } from "../src/core/ButtonTransparent";
import { DatePickerInput } from "../src/core/DatePickerInput";
import { ArrayAdapter, SelectInput } from "../src/core/SelectInput";
import { TextInput } from "../src/core/TextInput";
import { TextAreaInput } from "../src/core/TextAreaInput";
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
];

export const simple = wrap(() => {
  const [selectValue, setSelectValue] = useState(2);
  const [textInputValue, setTextInputValue] = useState("2");
  const [textAreaInputValue, setTextAreaInputValue] = useState("2");
  const [datePickerValue, setDatePickerValue] = useState(undefined as string);

  const spacing = select("spacing", [0, 1, 2, 3, 4, 5, 6], 2);
  const size = select("size", ["xs", "sm", "md", "lg", "xlg", "xxlg", "xxxlg"], "md");
  const state = select("state", ["brand", "default", "primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "muted", "black", "white"], "primary");
  const background = select("background", ["black", "alphablack", "white", "alphawhite", "darker", "alphadarker", "darken", "alphadarken", "grayer", "alphagrayer", "gray", "alphagray", "light", "alphalight", "blue", "alphablue", "darkblue", "lightblue", "alphalightblue", "alphadarkblue", "indigo", "alphaindigo", "darkindigo", "lightindigo", "alphalightindigo", "alphadarkindigo", "violet", "alphaviolet", "darkviolet", "lightviolet", "alphalightviolet", "alphadarkviolet", "fuchsia", "alphafuchsia", "darkfuchsia", "lightfuchsia", "alphalightfuchsia", "alphadarkfuchsia", "pink", "alphapink", "darkpink", "lightpink", "alphalightpink", "alphadarkpink", "red", "alphared", "darkred", "lightred", "alphalightred", "alphadarkred", "orange", "alphaorange", "darkorange", "lightorange", "alphalightorange", "alphadarkorange", "yellow", "alphayellow", "darkyellow", "lightyellow", "alphalightyellow", "alphadarkyellow", "lime", "alphalime", "darklime", "lightlime", "alphalightlime", "alphadarklime", "green", "alphagreen", "darkgreen", "lightgreen", "alphalightgreen", "alphadarkgreen", "teal", "alphateal", "darkteal", "lightteal", "alphalightteal", "alphadarkteal", "cyan", "alphacyan", "darkcyan", "lightcyan", "alphalightcyan", "alphadarkcyan", "brand", "alphabrand", "darkbrand", "lightbrand", "alphalightbrand", "alphadarkbrand"], "light");

  const options = useMemo(() => {
    return new ArrayAdapter(defaultOptions);
  }, []);

  return (
    <Box bg="black" p={spacing}>
      <Box bg="darker" py={spacing}>
        <BoxGroup spacing={spacing}>
          <Box bg={background} width={1}>
            <SelectInput
              placeholder="SelectInput"
              state={state}
              inputSize={size}
              isClearable={true}
              options={options}
              value={selectValue}
              onChange={(value) => setSelectValue(value)}
            />
          </Box>
          <Box bg={background} width={1}>
            <TextInput
              placeholder="TextInput"
              state={state}
              inputSize={size}
              value={textInputValue}
              onChange={(evt) => setTextInputValue(evt.target.value)}
            />
          </Box>
          <Box bg={background} width={1}>
            <DatePickerInput
              placeholder="DatePickerInput"
              state={state}
              inputSize={size}
              value={datePickerValue}
              onChange={(value) => setDatePickerValue(value)}
            />
          </Box>
          <Box bg={background} width={1}>
            <TextAreaInput
              placeholder="TextAreaInput"
              rows={1}
              state={state}
              inputSize={size}
              value={textAreaInputValue}
              onChange={(evt) => setTextAreaInputValue(evt.target.value)}
            />
          </Box>
          <Box bg={background} width={1}>
            <Button width={1} size={size} state={state}>Test</Button>
          </Box>
          <Box bg={background} width={1}>
            <ButtonOutline width={1} size={size} state={state}>Test</ButtonOutline>
          </Box>
          <Box bg={background} width={1}>
            <ButtonTransparent width={1} size={size} state={state}>Test</ButtonTransparent>
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
  title: "Core|Size",
};
