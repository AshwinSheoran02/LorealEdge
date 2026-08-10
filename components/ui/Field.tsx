import { type InputHTMLAttributes, useId } from "react";

/* ── Text input ────────────────────────────────────────── */

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function TextField({ label, className = "", id: idProp, ...rest }: TextFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-caption text-stone">
        {label}
      </label>
      <input
        id={id}
        className={[
          "w-full rounded-sm border border-sage-pale bg-transparent px-3 py-2.5",
          "text-body text-forest placeholder:text-sage-pale",
          "focus:border-sage focus:outline-none transition-colors duration-150",
        ].join(" ")}
        {...rest}
      />
    </div>
  );
}

/* ── Checkbox ──────────────────────────────────────────── */

export interface CheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  description?: string;
}

export function CheckboxField({
  label,
  description,
  className = "",
  id: idProp,
  ...rest
}: CheckboxFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <input
        id={id}
        type="checkbox"
        className={[
          "mt-0.5 h-4.5 w-4.5 rounded-sm border border-sage-pale",
          "accent-sage focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2",
        ].join(" ")}
        {...rest}
      />
      <div className="flex flex-col">
        <label htmlFor={id} className="text-body text-forest cursor-pointer">
          {label}
        </label>
        {description && (
          <span className="text-caption text-stone">{description}</span>
        )}
      </div>
    </div>
  );
}
