import { Link, Page } from "@envoy/polarwind";
import NextLink from "next/link";

export default function About() {
  return (
    <Page title="About">
      <p>
        Go back{" "}
        <NextLink href="/" passHref>
          <Link>home</Link>
        </NextLink>
      </p>
    </Page>
  );
}
