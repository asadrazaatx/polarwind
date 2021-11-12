/**
 * These are thin adapters that translate the href prop that next/link sends when used
 * with passHref and the url prop that Polarwind Link and Button expects.
 */
import { forwardRef } from "react";
import { Link as PwLink, Button as PwButton } from "@envoy/polarwind";

const Link = forwardRef(({ href, children, ...rest }, ref) => {
  return (
    <PwLink url={href} {...rest} ref={ref}>
      {children}
    </PwLink>
  );
});

const Button = forwardRef(({ href, children, ...rest }, ref) => {
  return (
    <PwButton url={href} {...rest} ref={ref}>
      {children}
    </PwButton>
  );
});

export { Link, Button };
