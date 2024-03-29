import { storiesOf } from "@storybook/react";
import classnames from "classnames/bind";
import ColorCheck from "color";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import styles from "./colors.module.css";

const cx = classnames.bind(styles);

const {
  theme: { colors },
} = resolveConfig(tailwindConfig);

// eslint-disable-next-line
function Color({ color, hex }) {
  const className = cx(
    "first:rounded-t",
    "last:rounded-b",
    "p-4",
    "justify-between",
    "flex",
    "w-1/3",
    {
      "text-carbon-70": ColorCheck(hex).isLight(),
      "text-white": ColorCheck(hex).isDark(),
    }
  );
  // eslint-disable-next-line react/prop-types
  const [colorName, colorScale] = color.split("-");
  return (
    <div
      className={className}
      style={{ backgroundColor: colors[colorName][colorScale] }}
    >
      <span>{color}</span>
      <span>{hex}</span>
    </div>
  );
}

const stories = storiesOf("Design / Colors", module);

Object.entries(colors)
  .filter(([key]) => !["transparent", "current", "primary"].includes(key))
  .forEach(([key, value]) => {
    if (typeof value === "string") {
      stories.add(key, () => <Color color={key} hex={value} />);
    } else {
      stories.add(key, () => (
        <>
          {Object.entries(value).map(([subkey, subvalue]) => {
            const color = subkey === "default" ? key : `${key}-${subkey}`;
            return <Color color={color} hex={subvalue} key={color} />;
          })}
        </>
      ));
    }
  });
