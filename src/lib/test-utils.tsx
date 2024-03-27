import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

function customRender(
  ui: React.ReactElement,
  { route = "/" } = {},
  options = {}
) {
  window.history.pushState({}, "Test page", route);
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: BrowserRouter,

    ...options,
  });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

const getElementByText = (text: string, exact = false) =>
  screen.getByText(text, { exact });
// override render export
export { getElementByText, customRender as render };
