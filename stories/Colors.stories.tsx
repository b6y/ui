import { select } from "@storybook/addon-knobs";
import React from "react";

import { useTheme } from "emotion-theming";
import { BoxGroup } from "../src/core/BoxGroup";
import { Box, ColorAlias, Colors, Flex, getFgColor, Text, Theme } from "../src/styled";
import { colorsMeta } from "../src/theme";
import { wrap } from "./context";

export const simple = wrap(() => {
  return (
    <Box px={2}>
      <BoxGroup spacing={2} flexWrap="wrap">
        {
          colorsMeta.map((meta) => {
            const name = meta.name as ColorAlias;
            return (
              <Flex key={name} width={1}>
                <Flex
                  justifyContent="center"
                  alignContent="center"
                  width={1}
                  p={4}
                  style={{ backgroundColor: meta.bg, minWidth: 250 }}>
                  <Text textAlign="center" fontSize={1} style={{ color: meta.fg }}>
                    {name}
                    <br />
                    ({meta.bg})
                  </Text>
                </Flex>
                {meta.variants.map((variant) => {
                  const colorVariantName = (variant.name + name) as ColorAlias;
                  return (
                    <Flex
                      style={{ backgroundColor: variant.bg, minWidth: 250 }}
                      key={variant.name}
                      justifyContent="center"
                      alignContent="center"
                      width={1}
                      p={4}>
                      <Text
                        textAlign="center"
                        fontSize={1}
                        style={{ color: variant.fg }}>
                        {colorVariantName}
                        <br />
                        ({variant.bg})
                      </Text>
                    </Flex>
                  );
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
  title: "Core|Colors",
};
