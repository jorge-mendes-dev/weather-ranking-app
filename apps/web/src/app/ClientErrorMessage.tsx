"use client";
import { ErrorMessage } from "./components/ErrorMessage";

export default function ClientErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ErrorMessage>{children}</ErrorMessage>;
}
