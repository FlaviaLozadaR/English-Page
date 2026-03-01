import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ErrorBoundary } from "../shared/components/ErrorBoundary";
import { PageLoader } from "../shared/components/Loading";

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}
