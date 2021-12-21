import { createTheming } from "@callstack/react-theme-provider";
import React from "react";
import type { PartialDeep } from "type-fest";
import { theme as defaultTheme } from "./themes/default";
import { themeToStyle } from "./utils";

/**
 * The interface for defining an entire theme. Useful when we support future themes to
 * ensure all the properties are defined.
 */
interface Theme {
  colors: {
    primary: string;
  };
}

/** The friendly type that we expose to users as props */
type PartialTheme = PartialDeep<Theme>;

const { ThemeProvider: ReactThemeProvider, useTheme } =
  createTheming<Theme>(defaultTheme);

/**
 * Use theme provider to share global theme settings throughout the hierarchy of your
 * application. Theme provider is included by default as a child of the `AppProvider`
 * component but can be used independently to apply a base theme or to override a parent
 * theme in its children.
 */
const ThemeProvider = ({
  children,
  theme: partialTheme,
}: {
  /** Inner content of the application */
  children?: React.ReactNode;

  /** Custom colors provided to select components */
  theme?: PartialTheme;
}) => {
  // We're constructing the full theme object by passing in the partial theme into the
  // useTheme hook. The reason we do this is because we want to allow users to pass in a
  // partial theme whenever they use `<AppProvider theme={...} />` or `<ThemeProvider
  // theme={...} />`.
  // Another reason we're using useTheme here is because we want Storybook to be able to
  // get the documentation. Storybook struggles to get the documentation for a HOC created
  // using withTheme.
  const fullTheme = useTheme(partialTheme);

  return (
    <ReactThemeProvider theme={fullTheme}>
      <CustomProperties>{children}</CustomProperties>
    </ReactThemeProvider>
  );
};

/**
 * Converts a theme to a style object containing custom properties. This is defined as a
 * separate component instead of being inlined in ThemeProvider above so that the theme we
 * get is the merged theme from the parent.
 */
const CustomProperties = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const style = themeToStyle(theme);
  return <div style={style}>{children}</div>;
};

export { ThemeProvider, useTheme };
export type { Theme };
