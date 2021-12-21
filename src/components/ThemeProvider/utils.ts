import React from "react";
import { Theme } from "./ThemeProvider";

export function themeToStyle(theme: Theme): React.CSSProperties {
  const style =
    theme &&
    Object.entries(theme).reduce(
      (memo, [section, properties]) => ({
        ...memo,
        ...toCustomProperties(section, properties),
      }),
      {}
    );
  return style || {};
}

function toCustomProperties(
  section: string,
  properties: { [key: string]: string }
) {
  return Object.entries(properties).reduce(
    (memo, [key, value]) => ({
      ...memo,
      [`--pw-${section}-${key}`]: value,
    }),
    {}
  );
}
