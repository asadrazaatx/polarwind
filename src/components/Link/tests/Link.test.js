import { render, screen } from "@testing-library/react";
import { Link } from "../Link";
import styles from "../Link.module.css";

test("when monochrome is true, underline is set automatically", () => {
  render(
    <Link monochrome url="/">
      Home
    </Link>
  );
  expect(screen.getByRole("link")).toHaveClass(styles.underlined);
});

test("when monochrome is true, underline can be disabled explicitly", () => {
  render(
    <Link monochrome underlined={false} url="/">
      Home
    </Link>
  );
  expect(screen.getByRole("link")).not.toHaveClass(styles.underlined);
});

test("supports the download prop", () => {
  render(
    <Link download url="/">
      Home
    </Link>
  );
  expect(screen.getByRole("link")).toHaveAttribute("download");
});

test("aliases href prop to url", () => {
  render(<Link href="/">Home</Link>);
  expect(screen.getByRole("link")).toHaveAttribute("href", "/");
});

test("url wins when both href and url are defined", () => {
  render(
    <Link href="/loser" url="/winner">
      Home
    </Link>
  );
  expect(screen.getByRole("link")).toHaveAttribute("href", "/winner");
});
