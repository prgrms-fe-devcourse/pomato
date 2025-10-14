import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const button = cva(
  [
    "inline-flex items-center justify-center text-wh cursor-pointer",
    "outline-none focus-visible:ring-2 focus-visible:ring-wh/12",
    "disabled:opacity-45 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      intent: {
        glass: [
          "bg-wh/20 border border-wh/15",
          "enabled:hover:bg-wh/30 enabled:hover:border-wh/25",
          "enabled:active:bg-wh/40 enabled:active:border-wh/35",
          "dark:bg-bl/30 dark:border-wh/12",
          "dark:enabled:hover:bg-bl/40 dark:enabled:hover:border-wh/18",
          "dark:enabled:active:bg-bl/50 dark:enabled:active:border-wh/25",
        ],
        ghost: ["bg-wh/15 enabled:hover:bg-wh/25", "dark:bg-bl/25 dark:enabled:hover:bg-bl/35"],
        reveal: [
          "bg-transparent",
          "enabled:hover:bg-wh/15 enabled:active:bg-wh/25",
          "dark:enabled:hover:bg-bl/25 dark:enabled:active:bg-bl/35",
        ],
        subtle: [
          "bg-transparent text-wh/65 enabled:hover:text-wh/90",
          "enabled:active:bg-wh/20 dark:enabled:active:bg-bl/30",
        ],
        primary: "bg-blue-500 enabled:hover:bg-blue-600 enabled:active:bg-blue-700",
      },
      size: {
        lg: "px-4 h-10 label-text-m [&_svg]:size-4.5",
        md: "px-3 h-8 label-text-s [&_svg]:size-3.5",
        sm: "px-2 h-6 label-text-xs [&_svg]:size-3",
      },
      shape: {
        default: "rounded-lg",
        circle: "rounded-full",
      },
      composition: {
        iconOnly: "px-0",
        iconText: "gap-1",
      },
    },
    compoundVariants: [
      { size: "lg", composition: "iconOnly", class: "w-10" },
      { size: "md", composition: "iconOnly", class: "w-8" },
      { size: "sm", composition: "iconOnly", class: "w-6" },
    ],
  },
);

interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof button> {}

export default function Button({
  type = "button",
  intent = "glass",
  size = "lg",
  shape = "default",
  composition = "iconText",
  className,
  children,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(button({ intent, size, shape, composition }), className)}
      {...rest}
    >
      {children}
    </button>
  );
}
