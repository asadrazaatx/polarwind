/**
 * Provide the Link class as a non-SSR dynamic component because it uses window.location
 * in a function that determines whether an absolute link belongs to the same domain as
 * where the Link is presented. This can be removed once Polarwind is updated to not use
 * window.location.
 */
import dynamic from "next/dynamic";

const Link = dynamic(() => import("@envoy/polarwind").then((mod) => mod.Link), {
  ssr: false,
});

export { Link };
