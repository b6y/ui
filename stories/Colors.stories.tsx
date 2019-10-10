import { select } from "@storybook/addon-knobs";
import React from "react";

import { BoxGroup } from "../src/core/BoxGroup";
import { Flex, Box, Theme, Text, getFgColor, Colors, Color } from "../src/styled";
import { wrap } from "./context";
import { useTheme } from "emotion-theming";
import { colorsMeta } from "../src/theme";

export const simple = wrap(() => {
  const theme = useTheme<Theme>();
  const fakeProps = { theme };

  console.log(theme.colors);

  return (
    <Box px={2}>
      <BoxGroup spacing={2} flexWrap="wrap">
        {
          colorsMeta.map((meta) => {
            const name = meta.name as Color;
            return (
              <Flex key={name} width={1}>
                <Flex bg={name} justifyContent="center" alignContent="center" width={1} p={4}>
                  <Text textAlign="center" fontSize={1} css={{ color: getFgColor(name, "dark")(fakeProps) }}>
                    {name}
                    <br />
                    ({theme.colors[name]})
                  </Text>
                </Flex>
                {meta.variants.map((variant) => {
                  const colorVariantName = (variant.name + name) as Color;
                  return (
                    <Flex
                      bg={colorVariantName}
                      key={variant.name}
                      justifyContent="center"
                      alignContent="center"
                      width={1}
                      p={4}>
                      <Text
                        textAlign="center"
                        fontSize={1}
                        css={{ color: getFgColor(name, "dark")(fakeProps) }}>
                        {colorVariantName}
                        <br />
                        ({theme.colors[colorVariantName]})
                      </Text>
                    </Flex>
                  )
                })}
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
