import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config.js";
import type { Theme } from "../ThemeProvider";

const fullConfig = resolveConfig(tailwindConfig);

export const theme: Theme = {
  colors: {
    primary: fullConfig.theme.colors.red[50],
  },
};
