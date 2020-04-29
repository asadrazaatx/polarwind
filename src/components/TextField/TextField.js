import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./TextField.module.css";
import { Label } from "./components";
import { TextStyle } from "../TextStyle";
import { Caption } from "../Caption";

const cx = classNames.bind(styles);

/**
 * A text field is an input field that users can type into. It has a range of options and
 * supports several text formats including numbers.
 */
export const TextField = ({
  disabled,
  error,
  focused,
  helpText,
  label,
  onBlur,
  onChange,
  onFocus,
  success,
  required,
  type = "text",
  value,
}) => {
  // == LABEL ==
  const labelHidden = type === "search";

  // == CAPTION ==
  // The disabled state overrides any inflight error or success state to present a
  // pristine input.
  if (disabled) {
    error = null;
    success = null;
  }
  const helpTextMarkup = helpText && (
    <TextStyle variation="subdued">{helpText}</TextStyle>
  );
  const successMarkup = success && (
    <TextStyle variation="positive">{success}</TextStyle>
  );
  const errorMarkup = error && (
    <TextStyle variation="warning">{error}</TextStyle>
  );
  const hasCaption = errorMarkup || successMarkup || helpTextMarkup;
  const captionMarkup = hasCaption && <Caption>{hasCaption}</Caption>;

  // == INPUT ==
  const handleFocus = () => {
    onFocus && onFocus();
  };
  const handleBlur = () => {
    onBlur && onBlur();
  };
  const handleChange = (event) => {
    onChange && onChange(event.currentTarget.value);
  };
  const className = cx(
    {
      TextField: true,
      error,
      hasCaption,
      focused,
    },
    "form-input"
  );

  return (
    <Label
      hidden={labelHidden}
      required={required}
      label={label}
      className={styles.Label}
    >
      <input
        className={className}
        type={type}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={labelHidden ? label : undefined}
        value={value}
        disabled={disabled}
      />
      {captionMarkup}
    </Label>
  );
};

TextField.propTypes = {
  /** Disable the input */
  disabled: PropTypes.bool,
  /** Error to display beneath the label */
  error: PropTypes.string,
  /** Forces the focused state of the input */
  focused: PropTypes.bool,
  /** Additional hint text to display */
  helpText: PropTypes.string,
  /** Label for the input */
  label: PropTypes.string.isRequired,
  /** Callback when focus is removed */
  onBlur: PropTypes.func,
  /** Callback when value is changed */
  onChange: PropTypes.func,
  /** Callback when input is focused */
  onFocus: PropTypes.func,
  /** Mark the field as required */
  required: PropTypes.bool,
  /** Success message to display beneath the label */
  success: PropTypes.string,
  /** Determines the type of input */
  type: PropTypes.oneOf(["text", "search"]),
  /** Initial value for the input */
  value: PropTypes.string,
};
