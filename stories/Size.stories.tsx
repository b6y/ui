import { select } from "@storybook/addon-knobs";
import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";

import { BoxGroup } from "../src/core/BoxGroup";
import { Button } from "../src/core/Button";
import { ButtonOutline } from "../src/core/ButtonOutline";
import { ButtonTransparent } from "../src/core/ButtonTransparent";
import { DatePickerInput } from "../src/core/DatePickerInput";
import { MultiSelectInput } from "../src/core/MultiSelectInput";
import { ArrayAdapter, SelectInput } from "../src/core/SelectInput";
import { TextAreaInput } from "../src/core/TextAreaInput";
import { TextInput } from "../src/core/TextInput";
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

const BoxLabel = styled(Box)`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  align-content: center;
  width: 160px;
`;

const Section = (props: React.PropsWithChildren<{ spacing: number }>) => {
  return (
    <Box bg="black" p={props.spacing} mb={3}>
      <Box bg="alphalight" py={props.spacing}>
        {props.children}
      </Box>
    </Box>
  )
}

export const simple = wrap(() => {
  const [selectValue, setSelectValue] = useState(2);
  const [multiSelectValue, setMultiSelectValue] = useState([]);
  const [textInputValue, setTextInputValue] = useState(null);
  const [textAreaInputValue, setTextAreaInputValue] = useState("2");
  const [datePickerValue, setDatePickerValue] = useState(undefined as string);

  const spacing = select("spacing", [0, 1, 2, 3, 4, 5, 6], 2);
  const size = select("size", ["xs", "sm", "md", "lg", "xlg", "xxlg", "xxxlg"], "md");
  const state = select("state", ["brand", "default", "primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "muted", "black", "white"], "primary");
  const background = select("background", ["black", "alphablack", "white", "alphawhite", "darker", "alphadarker", "darken", "alphadarken", "grayer", "alphagrayer", "gray", "alphagray", "light", "alphalight", "blue", "alphablue", "darkblue", "lightblue", "alphalightblue", "alphadarkblue", "indigo", "alphaindigo", "darkindigo", "lightindigo", "alphalightindigo", "alphadarkindigo", "violet", "alphaviolet", "darkviolet", "lightviolet", "alphalightviolet", "alphadarkviolet", "fuchsia", "alphafuchsia", "darkfuchsia", "lightfuchsia", "alphalightfuchsia", "alphadarkfuchsia", "pink", "alphapink", "darkpink", "lightpink", "alphalightpink", "alphadarkpink", "red", "alphared", "darkred", "lightred", "alphalightred", "alphadarkred", "orange", "alphaorange", "darkorange", "lightorange", "alphalightorange", "alphadarkorange", "yellow", "alphayellow", "darkyellow", "lightyellow", "alphalightyellow", "alphadarkyellow", "lime", "alphalime", "darklime", "lightlime", "alphalightlime", "alphadarklime", "green", "alphagreen", "darkgreen", "lightgreen", "alphalightgreen", "alphadarkgreen", "teal", "alphateal", "darkteal", "lightteal", "alphalightteal", "alphadarkteal", "cyan", "alphacyan", "darkcyan", "lightcyan", "alphalightcyan", "alphadarkcyan", "brand", "alphabrand", "darkbrand", "lightbrand", "alphalightbrand", "alphadarkbrand"], "light");

  const options = useMemo(() => {
    return new ArrayAdapter(defaultOptions);
  }, []);

  const input = (
    <TextInput
      placeholder="Reference size"
      state={state}
      inputSize={size}
      value={textInputValue}
      onChange={(evt) => setTextInputValue(evt.target.value)}
    />
  );

  return (
    <Box css={{ maxWidth: "600px" }}>
      <Section spacing={spacing}>
        <BoxGroup spacing={spacing}>
          <BoxLabel bg={background}>
            SelectInput
            </BoxLabel>
          <Box bg={background} width={1}>
            {input}
          </Box>
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
        </BoxGroup>
      </Section>
      <Section spacing={spacing}>
        <BoxGroup spacing={spacing}>
          <BoxLabel bg={background}>
            MultiSelectInput
            </BoxLabel>
          <Box bg={background} width={1}>
            {input}
          </Box>

          <Box bg={background} width={1}>
            <MultiSelectInput
              placeholder="MultiSelectInput"
              state={state}
              inputSize={size}
              isClearable={true}
              options={options}
              values={multiSelectValue}
              onChange={(value) => setMultiSelectValue(value)}
            />
          </Box>
        </BoxGroup>
      </Section>
      <Section spacing={spacing}>
        <BoxGroup spacing={spacing}>
          <BoxLabel bg={background}>
            DatePickerInput
            </BoxLabel>
          <Box bg={background} width={1}>
            {input}
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
        </BoxGroup>
      </Section>
      <Section spacing={spacing}>
        <BoxGroup spacing={spacing}>
          <BoxLabel bg={background}>
            TextAreaInput
            </BoxLabel>
          <Box bg={background} width={1}>
            {input}
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
        </BoxGroup>
      </Section>
      <Section spacing={spacing}>
        <BoxGroup spacing={spacing}>
          <BoxLabel bg={background}>
            Button
            </BoxLabel>
          <Box bg={background} width={1}>
            {input}
          </Box>

          <Box bg={background} width={1}>
            <Button width={1} size={size} state={state}>Button</Button>
          </Box>
        </BoxGroup>
      </Section>
      <Section spacing={spacing}>
        <BoxGroup spacing={spacing}>
          <BoxLabel bg={background}>
            ButtonOutline
            </BoxLabel>
          <Box bg={background} width={1}>
            {input}
          </Box>

          <Box bg={background} width={1}>
            <ButtonOutline width={1} size={size} state={state}>ButtonOutline</ButtonOutline>
          </Box>
        </BoxGroup>
      </Section>
      <Section spacing={spacing}>
        <BoxGroup spacing={spacing}>
          <BoxLabel bg={background}>
            ButtonTransparent
            </BoxLabel>
          <Box bg={background} width={1}>
            {input}
          </Box>

          <Box bg={background} width={1}>
            <ButtonTransparent width={1} size={size} state={state}>ButtonTransparent</ButtonTransparent>
          </Box>
        </BoxGroup>
      </Section>
    </Box>
  );
});

simple.story = {
  parameters: {},
};

export default {
  title: "Core|Size",
};
