import { useRouteError } from "react-router-dom";
import { Button } from "./components/ui/button";

export default function ErrorPage() {
  const error = useRouteError() as Error & { statusText?: string };
  console.error(error);

  return (
    <div className="grid place-items-center place-content-center h-screen space-y-2">
      <h1 className="text-3xl font-bold">Oops!</h1>
      <p className="font-medium">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button onClick={() => (window.location.href = "/")}>Back to home</Button>
    </div>
  );
}
