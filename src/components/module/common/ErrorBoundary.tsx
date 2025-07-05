// src/pages/ErrorBoundary.tsx
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <div>
          <h1 className="text-3xl font-bold">Oops!</h1>
          <p className="text-lg text-gray-600 mb-4">
            {error.status} - {error.statusText}
          </p>
          <p className="text-sm">{error.data}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-4">
      <div>
        <h1 className="text-3xl font-bold">Something went wrong.</h1>
        <p className="text-gray-600 mt-2">
          {(error as Error)?.message ?? "Unknown error"}
        </p>
      </div>
    </div>
  );
};

export default ErrorBoundary;
