"use client";

import { cn } from "@/lib/cn";
import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className, wrapperClassName, id: externalId, ...rest }, ref) => {
    const autoId = useId();
    const id = externalId ?? autoId;

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label htmlFor={id} className="font-sans text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-3.5 py-2.5 font-sans text-sm leading-normal text-foreground bg-background",
            "border border-border-strong rounded-md",
            "transition-colors duration-fast",
            "hover:border-foreground/60",
            "focus:outline-none focus:border-primary-border focus:shadow-[0_0_0_var(--ring-offset)_var(--bg),0_0_0_calc(var(--ring-width)+var(--ring-offset))_var(--ring-color)]",
            "placeholder:text-foreground/40",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted",
            error && "border-danger focus:border-danger focus:shadow-[0_0_0_var(--ring-offset)_var(--bg),0_0_0_calc(var(--ring-width)+var(--ring-offset))_var(--danger)]",
            className,
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...rest}
        />
        {hint && !error && (
          <p id={`${id}-hint`} className="font-sans text-xs text-foreground/60">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} className="font-sans text-xs text-danger-fg" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className, wrapperClassName, id: externalId, ...rest }, ref) => {
    const autoId = useId();
    const id = externalId ?? autoId;

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label htmlFor={id} className="font-sans text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full px-3.5 py-2.5 font-sans text-sm leading-normal text-foreground bg-background",
            "border border-border-strong rounded-md min-h-[6rem] resize-vertical",
            "transition-colors duration-fast",
            "hover:border-foreground/60",
            "focus:outline-none focus:border-primary-border focus:shadow-[0_0_0_var(--ring-offset)_var(--bg),0_0_0_calc(var(--ring-width)+var(--ring-offset))_var(--ring-color)]",
            "placeholder:text-foreground/40",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted",
            error && "border-danger focus:border-danger focus:shadow-[0_0_0_var(--ring-offset)_var(--bg),0_0_0_calc(var(--ring-width)+var(--ring-offset))_var(--danger)]",
            className,
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...rest}
        />
        {hint && !error && (
          <p id={`${id}-hint`} className="font-sans text-xs text-foreground/60">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} className="font-sans text-xs text-danger-fg" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, id: externalId, ...rest }, ref) => {
    const autoId = useId();
    const id = externalId ?? autoId;

    return (
      <label htmlFor={id} className="inline-flex items-center gap-2 font-sans text-sm text-foreground cursor-pointer">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className={cn(
            "size-4.5 appearance-none border border-border-strong rounded-sm bg-background cursor-pointer",
            "transition-colors duration-fast flex-shrink-0",
            "checked:bg-primary checked:border-primary",
            "checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:size-1.5 checked:after:w-1.5 checked:after:h-2.5 checked:after:border-r-2 checked:after:border-b-2 checked:after:border-primary-foreground checked:after:rotate-45 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2",
            "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
            "relative",
            className,
          )}
          {...rest}
        />
        <span>{label}</span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
