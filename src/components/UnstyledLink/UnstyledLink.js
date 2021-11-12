import PropTypes from "prop-types";
import { forwardRef, useCallback, useContext } from "react";
import { EmbeddedContext } from "../../utils/embedded";
import { OriginContext } from "../../utils/origin";
import { OwnHostContext } from "../../utils/own-host";
import { useParent } from "../../utils/parent";

function isAbsoluteUrlFor(url, host) {
  return url.startsWith(host);
}

function isAbsolutePath(url) {
  return url.startsWith("/");
}

function isOwnUrl(url, ownHost) {
  return isAbsolutePath(url) || isAbsoluteUrlFor(url, ownHost);
}

/**
 * An internal component used by components that are link-like, like `Link` and `Button`.
 * It provides behaviors when dealing with internal and external links, and sending
 * navigation events to the parent if run in an embedded way.
 */
const UnstyledLink = forwardRef(function UnstyledLink(
  { children, download, external, onClick, url, ...rest },
  ref
) {
  const origin = useContext(OriginContext);
  const embedded = useContext(EmbeddedContext);
  const ownHost = useContext(OwnHostContext);
  const { sendMessage } = useParent();

  const isHostUrl = isAbsoluteUrlFor(url, origin);
  const isThirdPartyUrl = !isOwnUrl(url, ownHost) && !isHostUrl;
  // popup when explicitly set. if it's not set, popup when it's a third party url in
  // embedded mode. but if download is set, ignore all of that.
  const shouldPopup = download
    ? false
    : external ?? (embedded && isThirdPartyUrl);
  const shouldSendMessage = embedded && isHostUrl;

  const handleClick = useCallback(
    (e) => {
      onClick && onClick(e);
      if (shouldSendMessage) {
        e.preventDefault();
        sendMessage({
          event: "navigate",
          url: e.currentTarget.href,
        });
      }
    },
    [shouldSendMessage, sendMessage, onClick]
  );

  const target = shouldPopup ? "_blank" : undefined;
  const rel = shouldPopup ? "noopener noreferrer" : undefined;

  return (
    <a
      {...rest}
      download={download}
      href={url}
      ref={ref}
      rel={rel}
      target={target}
      onClick={handleClick}
    >
      {children}
    </a>
  );
});

UnstyledLink.propTypes = {
  /** The content to display inside the link */
  children: PropTypes.node,
  /** Instructs the browser to download the file */
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Makes the link open in a new tab */
  external: PropTypes.bool,
  /** Callback when a link is clicked */
  onClick: PropTypes.func,
  /** The url to link to */
  url: PropTypes.string.isRequired,
};

UnstyledLink.displayName = "UnstyledLink";

export { UnstyledLink };
