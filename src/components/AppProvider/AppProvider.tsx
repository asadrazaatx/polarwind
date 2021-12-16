import { OverlayProvider } from "@react-aria/overlays";
import { SSRProvider } from "@react-aria/ssr";
import React from "react";
import { EmbeddedContext } from "../../utils/embedded";
import { OriginContext } from "../../utils/origin";
import { OwnHostContext } from "../../utils/own-host";
import { ParentProvider } from "../ParentProvider";

/**
 * App provider is a required component that enables sharing global settings throughout
 * the hierarchy of your application.
 */
export const AppProvider = ({
  children,
  embedded = true,
  origin = "https://dashboard.envoy.com",
  ownHost = window?.location.origin,
}: {
  /**
   * Inner content of the application
   */
  children?: React.ReactNode;

  /**
   * Set whether running in embedded or standalone mode.
   */
  embedded: boolean;

  /**
   * Envoy Dashboard origin.
   *
   * Important for setting up the `iFrameResizer` `postMessage` permissions as well as
   * determining if a link belongs to the host app, so that the appropriate message can be
   * sent up to perform the navigation.
   */
  origin: string;

  /**
   * Hostname of where the embedded app is hosted.
   *
   * On client-side rendering, this is defaulted to `window.location` which is the iframe
   * src pointing to this app. If you use Polarwind in an SSR framework and you use
   * absolute URLs even for pointing to internal pages, you must set this value.
   * Otherwise, link handling will not be able to determine if it's an internal link and
   * set `target="_blank"` on the links.
   */
  ownHost: string;
}) => {
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
