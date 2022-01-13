/* eslint-disable react/prop-types */
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Checkbox } from "../Checkbox";

const BASIC_CHECKBOX_LABEL = "Basic checkbox";
const SELECT_ALL_LABEL = "Select all";

// TestComponent is here to test out the Checkbox being controlled by some parent component
const TestingCheckboxComponent = ({ initialState, label }) => {
  const [checked, setChecked] = useState(initialState || false);

  const handleChange = (newChecked) => setChecked(newChecked);

  return <Checkbox checked={checked} label={label} onChange={handleChange} />;
};

describe("checkbox properly behaves in isolation", () => {
  test("checkbox value is set correctly", () => {
    const { rerender } = render(
      <Checkbox checked={true} label={BASIC_CHECKBOX_LABEL} />
    );
    expect(screen.getByRole("checkbox").value).toBe("true");
    rerender(<Checkbox checked={false} label={BASIC_CHECKBOX_LABEL} />);
    expect(screen.getByRole("checkbox").value).toBe("false");
    rerender(<Checkbox checked="indeterminate" label={BASIC_CHECKBOX_LABEL} />);
    expect(screen.getByRole("checkbox").value).toBe("indeterminate");
  });

  test("fires the onClick handler with the to-be value when checkbox's input element is clicked", () => {
    const handleClick = jest.fn();
    render(
      <Checkbox
        checked={true}
        label={BASIC_CHECKBOX_LABEL}
        onChange={handleClick}
      />
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleClick).toHaveBeenCalledWith(false);
  });

  test("fires the onClick handler with the to-be value when checkbox's label element is clicked", () => {
    const handleClick = jest.fn();
    render(
      <Checkbox
        checked={false}
        label={BASIC_CHECKBOX_LABEL}
        onChange={handleClick}
      />
    );
    fireEvent.click(screen.getByLabelText(BASIC_CHECKBOX_LABEL));
    expect(handleClick).toHaveBeenCalledWith(true);
  });

  test("when indeterminate, fires the onClick handler with false when clicked", () => {
    const handleClick = jest.fn();
    render(
      <Checkbox
        checked="indeterminate"
        label={BASIC_CHECKBOX_LABEL}
        onChange={handleClick}
      />
    );
    fireEvent.click(screen.getByLabelText(BASIC_CHECKBOX_LABEL));
    expect(handleClick).toHaveBeenCalledWith(false);
  });

  test("checkbox's input element's checked value stays true when Checkbox's checked prop is set to true", () => {
    render(<Checkbox checked={true} label={BASIC_CHECKBOX_LABEL} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("checkbox's input element's checked value stays false when Checkbox's checked prop is set to false", () => {
    render(<Checkbox checked={false} label={BASIC_CHECKBOX_LABEL} />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    fireEvent.click(screen.getByLabelText(BASIC_CHECKBOX_LABEL));
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("checkbox remains indeterminate when Checkbox's checked prop is set to indeterminate", () => {
    render(<Checkbox checked="indeterminate" label={SELECT_ALL_LABEL} />);
    expect(screen.getByRole("checkbox")).toBePartiallyChecked();
    expect(screen.getByRole("checkbox").indeterminate).toBe(true);
    fireEvent.click(screen.getByLabelText(SELECT_ALL_LABEL));
    expect(screen.getByRole("checkbox")).toBePartiallyChecked();
    expect(screen.getByRole("checkbox").indeterminate).toBe(true);
  });

  test("checkbox remains unchecked when Checkbox's checked prop is NOT set", () => {
    // NOTE: this test will output a warning when run, because the checked prop is
    // required. temporarily silence the warning.
    const originalError = console.error;
    console.error = jest.fn();

    render(<Checkbox label={BASIC_CHECKBOX_LABEL} />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    fireEvent.click(screen.getByLabelText(BASIC_CHECKBOX_LABEL));
    expect(screen.getByRole("checkbox")).not.toBeChecked();

    console.error = originalError;
  });
});

describe("checkbox properly behaves according to the onChange callback passed by TestingCheckboxComponent", () => {
  test("alternates between checked & unchecked when clicking the input box of basic checkbox", () => {
    render(<TestingCheckboxComponent label={BASIC_CHECKBOX_LABEL} />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).toBeChecked();
    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("indeterminate checkbox transitions to unchecked on click", () => {
    render(
      <TestingCheckboxComponent
        initialState="indeterminate"
        label={BASIC_CHECKBOX_LABEL}
      />
    );
    expect(screen.getByRole("checkbox")).toBePartiallyChecked();
    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).not.toBePartiallyChecked();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).not.toBePartiallyChecked();
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
