"use client";

import { useSearchParams } from "next/navigation";

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  return (
    <>
      {error && (
        <p className="mt-4 p-4 rounded-lg bg-destructive text-white text-center">
          {error}
        </p>
      )}
      {message && (
        <div>
          <p className="mt-4 p-4 bg-destructive/50 text-white text-center">
            {message}
          </p>
          <p className="mt-4 p-4 rounded-lg bg-destructive text-white text-center">
            {error}
          </p>
        </div>
      )}
    </>
  );
}
