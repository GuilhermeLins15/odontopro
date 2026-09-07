"use client";

import * as React from "react";

import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext =
  React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);

  const { formState } = useFormContext();

  const error = formState.errors[fieldContext.name];

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error,
  };
}

type FormItemContextValue = {
  id: string;
};

const FormItemContext =
  React.createContext<FormItemContextValue>({} as FormItemContextValue);

function FormItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  const { error, formItemId } = useFormField();

  return (
    <label
      data-slot="form-label"
      htmlFor={formItemId}
      className={cn(
        "text-sm font-medium",
        error && "text-destructive",
        className,
      )}
      {...props}
    />
  );
}

const FormControl = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ ...props }, ref) => {
  const {
    error,
    formItemId,
    formDescriptionId,
    formMessageId,
  } = useFormField();

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? formDescriptionId
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});

FormControl.displayName = "FormControl";

function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();

  const body = error
    ? String(error.message ?? "")
    : children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
};

