import { getElementByText, render } from "@/lib/test-utils";
import AuthenticationPage from "./auth";

describe("AuthenticationPage", () => {
  it("should render the auth component", () => {
    render(<AuthenticationPage />);
    expect(getElementByText("projects management")).toBeInTheDocument();
  });
});
