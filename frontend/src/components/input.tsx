import {
  Controller,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import type { InputHTMLAttributes } from "react";

export const RhfInput = <T extends FieldValues>({
  control,
  name,
  title,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  control: UseFormReturn<T>["control"];
  name: FieldPath<T>;
  title: string;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <fieldset className="fieldset">
          <legend className="fieldset-legend">{title}</legend>
          <input {...props} className="input" {...field} />
          {error && <p className="label">{error.message}</p>}
        </fieldset>
      )}
    />
  );
};
