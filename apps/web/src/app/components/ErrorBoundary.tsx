"use client";
import React from "react";
import { useTranslation } from "react-i18next";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

function ErrorBoundaryMessage() {
  const { t } = useTranslation();
  return (
    <div className="text-red-500 font-display font-semibold mt-8 container mx-auto text-center">
      <p>{t("error_boundary.something_went_wrong")}</p>
    </div>
  );
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log error info here if needed
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorBoundaryMessage />;
    }
    return this.props.children;
  }
}
