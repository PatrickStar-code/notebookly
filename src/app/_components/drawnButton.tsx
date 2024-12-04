import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "danger";
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
  variant = "primary",
  rounded = false,
  customRounded,
  icon,
  customColors,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "text-sm text-center  font-extrabold border-2 shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out flex items-center";

  // text-sm text-center px-8 bg-blue-200 hover:bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 py-2 rounded-[0.4em] border-2 border-black dark:border-gray-700 font-extrabold text-black dark:text-white shadow-[0.1em_0.1em] transition-all duration-100 ease-in-out hover:shadow-[0.15em_0.15em] hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] active:shadow-[0.05em_0.05em] active:translate-x-[0.05em] active:translate-y-[0.05em]"
  const variantClasses = {
    primary:
      "bg-blue-200 hover:bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 text-black dark:text-white border-black dark:border-gray-700",
    secondary:
      "bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 text-black dark:text-white border-black dark:border-gray-700",
    danger:
      "bg-red-300 hover:bg-red-400 dark:bg-red-500 dark:hover:bg-red-600 text-black dark:text-white border-black dark:border-gray-700",
  };

  const roundedClass =
    customRounded || (rounded ? "rounded-full px-2" : "rounded-[0.4em]");

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
