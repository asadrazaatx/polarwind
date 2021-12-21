import React from "react";
import { Theme } from "../ThemeProvider";
/**
 * App provider is a required component that enables sharing global settings throughout
 * the hierarchy of your application.
 */
export declare const AppProvider: ({ children, embedded, origin, ownHost, theme, }: {
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
    /**
     * Custom colors provided to select components
     */
    theme?: Theme;
}) => JSX.Element;
