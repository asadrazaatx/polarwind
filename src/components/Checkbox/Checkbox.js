import classnames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { Label } from "../Label";
import styles from "./Checkbox.module.css";

const cx = classnames.bind(styles);

/**
 * Use in forms to toggle the state of something on or off. Default checkboxes can appear
 * in two states: selected and disabled, or unselected.
 */
export const Checkbox = ({
  checked,
  disabled,
  label,
  onBlur,
  onChange,
  onFocus,
}) => {
  const isIndeterminate = checked === "indeterminate";
  const isChecked = !isIndeterminate && Boolean(checked) && checked !== "false";
  const ref = useRef();
  const className = cx("form-checkbox", "Checkbox");
  const ariaAttributes = {
    "aria-checked": isIndeterminate ? "mixed" : isChecked,
    "aria-disabled": disabled,
  };

  const handleOnChange = () => {
    onChange && onChange(isIndeterminate ? false : !isChecked);
  };

  const handleOnBlur = () => {
    onBlur && onBlur();
  };

  const handleOnFocus = () => {
    onFocus && onFocus();
  };

  const handleClick = (event) => {
    if (ref.current) {
      ref.current.indeterminate = event.currentTarget.value === "indeterminate";
    }
  };

  useEffect(() => {
    ref.current.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  return (
    <Label className={styles.Label} label={label}>
      <input
        checked={isChecked}
        className={className}
        disabled={disabled}
        ref={ref}
        type="checkbox"
        value={checked}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onClick={handleClick}
        onFocus={handleOnFocus}
        {...ariaAttributes}
      />
    </Label>
  );
};

Checkbox.propTypes = {
  /** Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox */
  checked: PropTypes.oneOf([true, false, "indeterminate"]).isRequired,
  /** Disable input */
  disabled: PropTypes.bool,
  /** Label for the checkbox */
  label: PropTypes.node.isRequired,
  /** Callback when focus is removed */
  onBlur: PropTypes.func,
  /** Callback when checkbox is toggled */
  onChange: PropTypes.func,
  /** Callback when checkbox is focused */
  onFocus: PropTypes.func,
};
