import { Link } from "@envoy/polarwind";
import NextLink from "next/link";

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>
        Go back{" "}
        <NextLink href="/">
          <Link>home</Link>
        </NextLink>
      </p>
    </div>
  );
}
