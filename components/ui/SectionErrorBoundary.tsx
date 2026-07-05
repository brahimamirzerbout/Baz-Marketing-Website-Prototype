"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(`[SectionErrorBoundary${this.props.name ? `:${this.props.name}` : ""}]`, error.message, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="py-8 text-center" role="alert">
          <p className="text-sm text-muted-foreground">This section encountered an error and was skipped.</p>
          {process.env.NODE_ENV === "development" && (
            <p className="mt-1 text-xs text-red-500">{this.state.error?.message}</p>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
