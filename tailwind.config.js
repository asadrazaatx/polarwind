const hexRgb = require("hex-rgb");

function rgba(hex, alpha) {
  const { blue, green, red } = hexRgb(hex);
  return `rgba(${[red, green, blue, alpha]})`;
}

module.exports = {
  presets: [require("@envoy/tailwind")],
  mode: "jit",
  theme: {
    // it's hard to extend boxShadow since it needs the complete string including color,
    // which is why the best place to define it is by overriding the entire boxShadow
    // theme
    boxShadow: (theme) => ({
      DEFAULT: "0px 1px 2px rgba(0, 0, 0, 0.08)",
      none: "none",
      medium: "0px 2px 4px rgba(0, 0, 0, 0.08)",
      large: "0px 4px 8px rgba(0, 0, 0, 0.12)",
      xl: "0px 4px 16px rgba(0, 0, 0, 0.16)",
      outline: `0 0 0 2px ${theme("colors.carbon.10")}`,
      "outline-red-50": `0 0 0 2px ${rgba(theme("colors.red.50"), 0.3)}`,
      "outline-toggle": `0 0 0 2px ${theme("colors.carbon.20")}`,
      toggle: "0px 2px 6px rgba(0, 0, 0, 0.48)",
    }),
    lineHeight: {
      skinny: 1.15,
      normal: 1.5,
    },
    extend: {
      borderWidth: {
        6: "6px",
      },
      colors: {
        /**
         * Themeable design tokens
         *
         * If you add a new token here, be sure to set it's default value in common.css
         * `:root` selector
         */
        primary: "var(--pw-colors-primary)",
      },
      flex: {
        fill: "1 0",
      },
      maxWidth: {
        banner: "624px",
      },
      minWidth: {
        min: "min-content",
        fit: "fit-content",
      },
      opacity: {
        40: ".4",
        65: ".65",
      },
      spacing: {
        2.5: "0.604rem",
        2.75: "0.6666rem",
        15: "3.75rem",
      },
    },
  },
  plugins: [
    require("./src/plugins/fontMetrics")({
      emSquare: 1000,
      ascender: 756,
      descender: -244,
      capitalHeight: 689,
    }),
  ],
  corePlugins: {
    fontSize: false,
    lineHeight: false,
    verticalAlign: false,
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    placeholderOpacity: false,
    divideOpacity: false,
  },
  purge: {
    content: ["./src/**/*.js", "./src/**/*.ts", "./src/**/*.tsx"],
  },
};
