/* eslint-disable jest/no-conditional-expect */
/* eslint-disable react/prop-types */

import { fireEvent, render, screen } from "@testing-library/react";
import { useParent } from "../../../utils/parent";
import { AppProvider } from "../../AppProvider/AppProvider";
import { UnstyledLink } from "../UnstyledLink";

const sendMessage = jest.fn();

const external = "https://www.google.com/about";
const host = "https://dashboard.envoy.com/about";
const internal = "/about";
const absoluteInternal = "http://localhost/about"; // jest provides window.location as localhost
const sendMessageLink = "sendMessageLink";
const popupLink = "popupLink";
const defaultLink = "defaultLink";
const downloadLink = "downloadLink";

// TestComponent is here mostly so that we can use the useParent hook to access setParent
function TestComponent({ children, embedded, ownHost }) {
  const { setParent } = useParent();
  setParent({ sendMessage });

  return (
    <AppProvider embedded={embedded} ownHost={ownHost}>
      {children}
    </AppProvider>
  );
}

describe.each`
  url                 | externalProp | downloadProp | expected
  ${host}             | ${undefined} | ${undefined} | ${sendMessageLink}
  ${host}             | ${undefined} | ${true}      | ${downloadLink}
  ${host}             | ${undefined} | ${false}     | ${sendMessageLink}
  ${host}             | ${undefined} | ${"a.txt"}   | ${downloadLink}
  ${host}             | ${true}      | ${undefined} | ${popupLink}
  ${host}             | ${true}      | ${true}      | ${downloadLink}
  ${host}             | ${true}      | ${false}     | ${popupLink}
  ${host}             | ${true}      | ${"a.txt"}   | ${downloadLink}
  ${host}             | ${false}     | ${undefined} | ${sendMessageLink}
  ${host}             | ${false}     | ${true}      | ${downloadLink}
  ${host}             | ${false}     | ${false}     | ${sendMessageLink}
  ${host}             | ${false}     | ${"a.txt"}   | ${downloadLink}
  ${external}         | ${undefined} | ${undefined} | ${popupLink}
  ${external}         | ${undefined} | ${true}      | ${downloadLink}
  ${external}         | ${undefined} | ${false}     | ${popupLink}
  ${external}         | ${undefined} | ${"a.txt"}   | ${downloadLink}
  ${external}         | ${true}      | ${undefined} | ${popupLink}
  ${external}         | ${true}      | ${true}      | ${downloadLink}
  ${external}         | ${true}      | ${false}     | ${popupLink}
  ${external}         | ${true}      | ${"a.txt"}   | ${downloadLink}
  ${external}         | ${false}     | ${undefined} | ${defaultLink}
  ${external}         | ${false}     | ${true}      | ${downloadLink}
  ${external}         | ${false}     | ${false}     | ${defaultLink}
  ${external}         | ${false}     | ${"a.txt"}   | ${downloadLink}
  ${internal}         | ${undefined} | ${undefined} | ${defaultLink}
  ${internal}         | ${undefined} | ${true}      | ${downloadLink}
  ${internal}         | ${undefined} | ${false}     | ${defaultLink}
  ${internal}         | ${undefined} | ${"a.txt"}   | ${downloadLink}
  ${internal}         | ${true}      | ${undefined} | ${popupLink}
  ${internal}         | ${true}      | ${true}      | ${downloadLink}
  ${internal}         | ${true}      | ${false}     | ${popupLink}
  ${internal}         | ${true}      | ${"a.txt"}   | ${downloadLink}
  ${internal}         | ${false}     | ${undefined} | ${defaultLink}
  ${internal}         | ${false}     | ${true}      | ${downloadLink}
  ${internal}         | ${false}     | ${false}     | ${defaultLink}
  ${internal}         | ${false}     | ${"a.txt"}   | ${downloadLink}
  ${absoluteInternal} | ${undefined} | ${undefined} | ${defaultLink}
  ${absoluteInternal} | ${undefined} | ${true}      | ${downloadLink}
  ${absoluteInternal} | ${undefined} | ${false}     | ${defaultLink}
  ${absoluteInternal} | ${undefined} | ${"a.txt"}   | ${downloadLink}
  ${absoluteInternal} | ${true}      | ${undefined} | ${popupLink}
  ${absoluteInternal} | ${true}      | ${true}      | ${downloadLink}
  ${absoluteInternal} | ${true}      | ${false}     | ${popupLink}
  ${absoluteInternal} | ${true}      | ${"a.txt"}   | ${downloadLink}
  ${absoluteInternal} | ${false}     | ${undefined} | ${defaultLink}
  ${absoluteInternal} | ${false}     | ${true}      | ${downloadLink}
  ${absoluteInternal} | ${false}     | ${false}     | ${defaultLink}
  ${absoluteInternal} | ${false}     | ${"a.txt"}   | ${downloadLink}
`(
  "in embedded mode, when url is $url and the external prop is $externalProp",
  ({ downloadProp, expected, externalProp, url }) => {
    test(`will ${expected}`, () => {
      let props = { url };
      if (typeof externalProp === "boolean") {
        props = {
          ...props,
          external: externalProp,
        };
      }
      if (downloadProp) {
        props = {
          ...props,
          download: downloadProp,
        };
      }

      render(
        <TestComponent embedded>
          <UnstyledLink {...props}>Click here</UnstyledLink>
        </TestComponent>
      );

      switch (expected) {
        case sendMessageLink:
          fireEvent.click(screen.getByRole("link"));
          expect(sendMessage).toHaveBeenCalledWith({
            event: "navigate",
            url,
          });
          expect(screen.getByRole("link")).not.toHaveAttribute("rel");
          expect(screen.getByRole("link")).not.toHaveAttribute("target");
          expect(screen.getByRole("link")).not.toHaveAttribute("download");
          break;
        case popupLink:
          expect(screen.getByRole("link")).toHaveAttribute(
            "rel",
            "noopener noreferrer"
          );
          expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
          expect(screen.getByRole("link")).not.toHaveAttribute("download");
          expect(sendMessage).not.toHaveBeenCalled();
          break;
        case downloadLink:
          expect(screen.getByRole("link")).not.toHaveAttribute("rel");
          expect(screen.getByRole("link")).not.toHaveAttribute("target");
          expect(screen.getByRole("link")).toHaveAttribute(
            "download",
            typeof downloadProp === "string" ? downloadProp : ""
          );
          expect(sendMessage).not.toHaveBeenCalled();
          break;
        case defaultLink:
          expect(screen.getByRole("link")).not.toHaveAttribute("rel");
          expect(screen.getByRole("link")).not.toHaveAttribute("target");
          expect(screen.getByRole("link")).not.toHaveAttribute("download");
          expect(sendMessage).not.toHaveBeenCalled();
      }
    });
  }
);

describe.each`
  url                 | externalProp | downloadProp | expected
  ${host}             | ${undefined} | ${undefined} | ${defaultLink}
  ${host}             | ${undefined} | ${true}      | ${downloadLink}
  ${host}             | ${undefined} | ${false}     | ${defaultLink}
  ${host}             | ${undefined} | ${"a.txt"}   | ${downloadLink}
  ${host}             | ${true}      | ${undefined} | ${popupLink}
  ${host}             | ${true}      | ${true}      | ${downloadLink}
  ${host}             | ${true}      | ${false}     | ${popupLink}
  ${host}             | ${true}      | ${"a.txt"}   | ${downloadLink}
  ${host}             | ${false}     | ${undefined} | ${defaultLink}
  ${host}             | ${false}     | ${true}      | ${downloadLink}
  ${host}             | ${false}     | ${false}     | ${defaultLink}
  ${host}             | ${false}     | ${"a.txt"}   | ${downloadLink}
  ${external}         | ${undefined} | ${undefined} | ${defaultLink}
  ${external}         | ${undefined} | ${true}      | ${downloadLink}
  ${external}         | ${undefined} | ${false}     | ${defaultLink}
  ${external}         | ${undefined} | ${"a.txt"}   | ${downloadLink}
  ${external}         | ${true}      | ${undefined} | ${popupLink}
  ${external}         | ${true}      | ${true}      | ${downloadLink}
  ${external}         | ${true}      | ${false}     | ${popupLink}
  ${external}         | ${true}      | ${"a.txt"}   | ${downloadLink}
  ${external}         | ${false}     | ${undefined} | ${defaultLink}
  ${external}         | ${false}     | ${true}      | ${downloadLink}
  ${external}         | ${false}     | ${false}     | ${defaultLink}
  ${external}         | ${false}     | ${"a.txt"}   | ${downloadLink}
  ${internal}         | ${undefined} | ${undefined} | ${defaultLink}
  ${internal}         | ${undefined} | ${true}      | ${downloadLink}
  ${internal}         | ${undefined} | ${false}     | ${defaultLink}
  ${internal}         | ${undefined} | ${"a.txt"}   | ${downloadLink}
  ${internal}         | ${true}      | ${undefined} | ${popupLink}
  ${internal}         | ${true}      | ${true}      | ${downloadLink}
  ${internal}         | ${true}      | ${false}     | ${popupLink}
  ${internal}         | ${true}      | ${"a.txt"}   | ${downloadLink}
  ${internal}         | ${false}     | ${undefined} | ${defaultLink}
  ${internal}         | ${false}     | ${true}      | ${downloadLink}
  ${internal}         | ${false}     | ${false}     | ${defaultLink}
  ${internal}         | ${false}     | ${"a.txt"}   | ${downloadLink}
  ${absoluteInternal} | ${undefined} | ${undefined} | ${defaultLink}
  ${absoluteInternal} | ${undefined} | ${true}      | ${downloadLink}
  ${absoluteInternal} | ${undefined} | ${false}     | ${defaultLink}
  ${absoluteInternal} | ${undefined} | ${"a.txt"}   | ${downloadLink}
  ${absoluteInternal} | ${true}      | ${undefined} | ${popupLink}
  ${absoluteInternal} | ${true}      | ${true}      | ${downloadLink}
  ${absoluteInternal} | ${true}      | ${false}     | ${popupLink}
  ${absoluteInternal} | ${true}      | ${"a.txt"}   | ${downloadLink}
  ${absoluteInternal} | ${false}     | ${undefined} | ${defaultLink}
  ${absoluteInternal} | ${false}     | ${true}      | ${downloadLink}
  ${absoluteInternal} | ${false}     | ${false}     | ${defaultLink}
  ${absoluteInternal} | ${false}     | ${"a.txt"}   | ${downloadLink}
`(
  "in standalone mode, when url is $url and the external prop is $externalProp",
  ({ downloadProp, expected, externalProp, url }) => {
    test(`will ${expected}`, () => {
      let props = { url };
      if (typeof externalProp === "boolean") {
        props = {
          ...props,
          external: externalProp,
        };
      }
      if (downloadProp) {
        props = {
          ...props,
          download: downloadProp,
        };
      }

      render(
        <TestComponent embedded={false}>
          <UnstyledLink {...props}>Click here</UnstyledLink>
        </TestComponent>
      );

      switch (expected) {
        case "sendMessageLink":
          fireEvent.click(screen.getByRole("link"));
          expect(sendMessage).toHaveBeenCalledWith({
            event: "navigate",
            url,
          });
          expect(screen.getByRole("link")).not.toHaveAttribute("rel");
          expect(screen.getByRole("link")).not.toHaveAttribute("target");
          expect(screen.getByRole("link")).not.toHaveAttribute("download");
          break;
        case "popupLink":
          expect(screen.getByRole("link")).toHaveAttribute(
            "rel",
            "noopener noreferrer"
          );
          expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
          expect(screen.getByRole("link")).not.toHaveAttribute("download");
          expect(sendMessage).not.toHaveBeenCalled();
          break;
        case downloadLink:
          expect(screen.getByRole("link")).not.toHaveAttribute("rel");
          expect(screen.getByRole("link")).not.toHaveAttribute("target");
          expect(screen.getByRole("link")).toHaveAttribute(
            "download",
            typeof downloadProp === "string" ? downloadProp : ""
          );
          expect(sendMessage).not.toHaveBeenCalled();
          break;
        case "defaultLink":
          expect(screen.getByRole("link")).not.toHaveAttribute("rel");
          expect(screen.getByRole("link")).not.toHaveAttribute("target");
          expect(screen.getByRole("link")).not.toHaveAttribute("download");
          expect(sendMessage).not.toHaveBeenCalled();
      }
    });
  }
);

test("onClick does not interfere with sendMessage", () => {
  const url = "https://dashboard.envoy.com/about";
  const onClick = jest.fn();

  render(
    <TestComponent embedded>
      <UnstyledLink url={url} onClick={onClick}>
        Click here
      </UnstyledLink>
    </TestComponent>
  );

  fireEvent.click(screen.getByRole("link"));
  expect(sendMessage).toHaveBeenCalledWith({
    event: "navigate",
    url,
  });
  expect(onClick).toHaveBeenCalled();
});

describe.each`
  url                 | ownHost                   | expected
  ${internal}         | ${undefined}              | ${defaultLink}
  ${internal}         | ${"http://localhost"}     | ${defaultLink}
  ${internal}         | ${"http://app.envoy.dev"} | ${defaultLink}
  ${absoluteInternal} | ${undefined}              | ${defaultLink}
  ${absoluteInternal} | ${"http://localhost"}     | ${defaultLink}
  ${absoluteInternal} | ${"http://app.envoy.dev"} | ${popupLink}
`(
  "in embedded mode and a user-supplied ownHost, when url is $url",
  ({ expected, ownHost, url }) => {
    test(`will ${expected}`, () => {
      const props = { url };

      render(
        <TestComponent embedded ownHost={ownHost}>
          <UnstyledLink {...props}>Click here</UnstyledLink>
        </TestComponent>
      );

      switch (expected) {
        case popupLink:
          expect(screen.getByRole("link")).toHaveAttribute(
            "rel",
            "noopener noreferrer"
          );
          expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
          expect(screen.getByRole("link")).not.toHaveAttribute("download");
          expect(sendMessage).not.toHaveBeenCalled();
          break;
        case defaultLink:
          expect(screen.getByRole("link")).not.toHaveAttribute("rel");
          expect(screen.getByRole("link")).not.toHaveAttribute("target");
          expect(screen.getByRole("link")).not.toHaveAttribute("download");
          expect(sendMessage).not.toHaveBeenCalled();
      }
    });
  }
);
