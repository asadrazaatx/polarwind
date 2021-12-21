import React from "react";
import type { PartialDeep } from "type-fest";
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
declare type PartialTheme = PartialDeep<Theme>;
declare const useTheme: (overrides?: import("@callstack/react-theme-provider").$DeepPartial<Theme>) => Theme;
/**
 * Use theme provider to share global theme settings throughout the hierarchy of your
 * application. Theme provider is included by default as a child of the `AppProvider`
 * component but can be used independently to apply a base theme or to override a parent
 * theme in its children.
 */
declare const ThemeProvider: ({ children, theme: partialTheme, }: {
    /** Inner content of the application */
    children?: React.ReactNode;
    /** Custom colors provided to select components */
    theme?: PartialTheme;
}) => JSX.Element;
export { ThemeProvider, useTheme };
export type { Theme };
