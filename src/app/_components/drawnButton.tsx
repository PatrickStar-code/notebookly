import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "no_variant"
    | "cancel"
    | "outline";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  customRounded?: string;
  icon?: ReactNode;
  customColors?: {
    background?: string;
    hover?: string;
    text?: string;
    border?: string;
  };
}

export default function DrawnButton({
  children,
  variant = "no_variant",
  rounded = false,
  customRounded,
  icon,
  customColors,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "text-sm text-center px-6 py-2 font-extrabold border-2 shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out";

  const variantClasses = {
    primary:
      "bg-blue-200 hover:bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 text-black dark:text-white border-black dark:border-gray-700",
    secondary:
      "bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 text-black dark:text-white border-black dark:border-gray-700",
    danger:
      "bg-red-300 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-600 text-black dark:text-white border-black dark:border-gray-700",
    cancel:
      "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white",
    outline:
      "bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-800 text-black dark:text-white border-black dark:border-gray-700",
    no_variant: "",
  };

  const roundedClass =
    customRounded ||
    (rounded ? "rounded-full px-[0.6em] py-1" : "rounded-[0.4em]");

  const customColorClasses = customColors
    ? clsx(
        customColors.background,
        `hover:${customColors.hover}`,
        customColors.text,
        customColors.border
      )
    : variantClasses[variant];

  return (
    <button
      className={clsx(
        baseClasses,
        customColorClasses,
        roundedClass,
        "hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em]",
        className
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
