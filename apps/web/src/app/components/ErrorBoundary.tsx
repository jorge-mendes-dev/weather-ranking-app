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
    <div className="text-red-600 font-display text-lg font-bold mt-10 text-center bg-red-50/60 border border-red-200 rounded-xl px-6 py-4 shadow-sm">
      <p>{t("error_boundary.something_went_wrong")}</p>
    </div>
  );
}

/**
 * Error boundary component to catch and display errors in the React tree.
 * @class
 * @extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>
 */
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
