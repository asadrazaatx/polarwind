import { render, screen } from "@testing-library/react";
import { Button } from "../Button";

test("aliases href prop to url", () => {
  render(<Button href="/">Home</Button>);
  expect(screen.getByRole("link")).toHaveAttribute("href", "/");
});

test("url wins when both href and url are defined", () => {
  render(
    <Button href="/loser" url="/winner">
      Home
    </Button>
  );
  expect(screen.getByRole("link")).toHaveAttribute("href", "/winner");
});
