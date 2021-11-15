import {
  Button,
  ButtonGroup,
  Card,
  FormLayout,
  Heading,
  Link,
  Page,
  Select,
  Stack,
  TextField,
  TextStyle,
  UnstyledLink,
} from "@envoy/polarwind";
import NextLink from "next/link";
import { Fragment } from "react";

const links = [
  { url: "https://dashboard.envoy.com/entries", title: "Dashboard route" },
  {
    url: "https://dashboard.envoy.com/invites?date=2020-04-20",
    title: "Dashboard route with query params",
  },
  {
    url: "https://dashboard.envoy.com/cybertruck",
    title: "Dashboard route that doesn't exist",
  },
  {
    url: "http://localhost:3000/about",
    title: "Internal link absolute URL",
  },
  {
    url: "/about",
    title: "Internal link relative URL",
  },
  {
    url: "https://www.google.com",
    title: "External link",
  },
];

function App() {
  return (
    <Page>
      <FormLayout>
        <Select
          label="Visitor type"
          options={["Visitor", "Interview", "Meeting"]}
          required
        />
        <FormLayout.Group>
          <TextField label="Arrival date" required />
          <TextField label="Arrival time" required />
        </FormLayout.Group>
        <TextField label="Full name" />
        <TextField label="Email" />
        <TextField label="Private notes" multiline={3} />
        <Stack distribution="equalSpacing">
          <ButtonGroup>
            <Button>Invite</Button>
            <Button outline>Invite and add another</Button>
          </ButtonGroup>
          <Button plain>Cancel</Button>
        </Stack>
        <Card>
          <Stack vertical>
            <Heading>next/link with Link test</Heading>
            <dl style={{ display: "flex", flexWrap: "wrap" }}>
              {links.map(({ url, title }) => (
                <Fragment key={url}>
                  <dt style={{ width: "50%" }}>
                    <NextLink href={url} passHref>
                      <Link>{title}</Link>
                    </NextLink>
                  </dt>
                  <dd style={{ width: "50%" }}>
                    <TextStyle variation="subdued">{url}</TextStyle>
                  </dd>
                </Fragment>
              ))}
              <dt style={{ width: "50%" }}>
                <NextLink
                  href={{
                    pathname: "/blog/[slug]",
                    query: { slug: "my-post" },
                  }}
                  passHref
                >
                  <Link>next/link with URL object</Link>
                </NextLink>
              </dt>
              <dd style={{ width: "50%" }}>
                <TextStyle variation="subdued">/blog/my-post</TextStyle>
              </dd>
            </dl>
          </Stack>
        </Card>
        <Card>
          <Stack vertical>
            <Heading>next/link with Button test</Heading>
            <dl style={{ display: "flex", flexWrap: "wrap", rowGap: "2px" }}>
              {links.map(({ url, title }) => (
                <Fragment key={url}>
                  <dt style={{ width: "50%" }}>
                    <NextLink href={url} passHref>
                      <Button size="slim">{title}</Button>
                    </NextLink>
                  </dt>
                  <dd style={{ width: "50%" }}>
                    <TextStyle variation="subdued">{url}</TextStyle>
                  </dd>
                </Fragment>
              ))}
            </dl>
          </Stack>
        </Card>
        <Stack distribution="fillEvenly" spacing="extraLoose">
          <NextLink href="/about" passHref>
            <UnstyledLink>
              <Card>
                <Heading size="small">Linkable card</Heading>
              </Card>
            </UnstyledLink>
          </NextLink>
          <NextLink href="/about" passHref>
            <UnstyledLink>
              <Card>
                <Heading size="small">Linkable card</Heading>
              </Card>
            </UnstyledLink>
          </NextLink>
          <NextLink href="/about" passHref>
            <UnstyledLink>
              <Card>
                <Heading size="small">Linkable card</Heading>
              </Card>
            </UnstyledLink>
          </NextLink>
        </Stack>
      </FormLayout>
    </Page>
  );
}

export default App;
