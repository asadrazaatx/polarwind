import PropTypes from "prop-types";
import { forwardRef } from "react";
import { UnstyledLink } from "../UnstyledLink";

/**
 * Internal component to choose between a UnstyledLink or button
 */
const Linkable = forwardRef(({ children, url, ...rest }, ref) => {
  return url ? (
    <UnstyledLink {...rest} ref={ref} url={url}>
      {children}
    </UnstyledLink>
  ) : (
    <button {...rest} ref={ref} type="button">
      {children}
    </button>
  );
});

Linkable.displayName = "Linkable";

Linkable.propTypes = {
  /** The content to display inside the link */
  children: PropTypes.node,
  /** The url to link to */
  url: PropTypes.string,
};

export { Linkable };
