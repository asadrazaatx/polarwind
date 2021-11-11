import { OverlayProvider } from "@react-aria/overlays";
import { SSRProvider } from "@react-aria/ssr";
import PropTypes from "prop-types";
import { EmbeddedContext } from "../../utils/embedded";
import { OriginContext } from "../../utils/origin";
import { OwnHostContext } from "../../utils/own-host";
import { ParentProvider } from "../ParentProvider";

/**
 * App provider is a required component that enables sharing global settings throughout
 * the hierarchy of your application.
 */
export const AppProvider = (props) => {
  // NOTE: destructuring the props in the argument causes weirdness in Storybook,
  // probably due to knobs. All the default values are sent as string expressions instead
  // of being evaluated. Instead, we destructure it inside the function body.
  const {
    children,
    embedded = true,
    origin = "https://dashboard.envoy.com",
    ownHost = typeof window !== "undefined"
      ? window.location.origin
      : undefined,
  } = props;
  return (
    <EmbeddedContext.Provider value={embedded}>
      <OriginContext.Provider value={origin}>
        <OwnHostContext.Provider value={ownHost}>
          <ParentProvider>
            <SSRProvider>
              <OverlayProvider>{children}</OverlayProvider>
            </SSRProvider>
          </ParentProvider>
        </OwnHostContext.Provider>
      </OriginContext.Provider>
    </EmbeddedContext.Provider>
  );
};

AppProvider.propTypes = {
  /** Inner content of the application */
  children: PropTypes.node,
  /** Set whether running in embedded or standalone mode. Defaults to true. */
  embedded: PropTypes.bool,
  /**
   * Envoy Dashboard origin, defaults to https://dashboard.envoy.com. Important for
   * setting up the iframeResizer postMessage permissions as well as determining if a link
   * belongs to the host app, so that the appropriate message can be sent up to perform
   * the navigation.
   **/
  origin: PropTypes.string,
  /**
   * Hostname of where the embedded app is hosted. On client-side rendering, this is
   * defaulted to window.location which is the iframe src pointing to this app. If you use
   * Polarwind in an SSR framework and you use absolute URLs even for pointing to internal
   * pages, you must set this value. Otherwise, link handling will not be able to
   * determine if it's an internal link and set target="_blank" on the links.
   **/
  ownHost: PropTypes.string,
};
