import { select } from "@storybook/addon-knobs";
import React from "react";

import { BoxGroup } from "../src/core/BoxGroup";
import { Flex, Box, Theme, Text, getFgColor, Colors, Color } from "../src/styled";
import { wrap } from "./context";
import { useTheme } from "emotion-theming";
import { baseColors } from "../src/theme";

export const simple = wrap(() => {
  const theme = useTheme<Theme>();
  const fakeProps = { theme };

  console.log(theme.colors)

  return (
    <Box px={2}>
      <BoxGroup spacing={2} flexWrap="wrap">
        {
          Object.keys(baseColors).map((name: Color) => {
            return (
              <Flex justifyContent="center" alignContent="center" key={name} bg={name} width={1 / 6} p={4}>
                <Text fontSize={1} css={{ color: getFgColor(name, "dark")(fakeProps) }}>{name} ({theme.colors[name]})</Text>
              </Flex>
            );
          })
        }
      </BoxGroup>
    </Box>
  );
});

simple.story = {
  parameters: {},
};

export default {
  title: "Core|Colors"
};
