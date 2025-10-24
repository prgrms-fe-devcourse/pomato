import { cva, type VariantProps } from "class-variance-authority";

export const button = cva(
  // Base styles
  [
    "text-wh inline-flex cursor-pointer items-center justify-center",
    "focus-visible:ring-wh/12 outline-none focus-visible:ring-2",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45",
    "transition-all duration-300",
  ],
  {
    variants: {
      intent: {
        glass: [
          "bg-wh/20 border-wh/15 border",
          "hover:bg-wh/30 hover:border-wh/25",
          "active:bg-wh/40 active:border-wh/35",
          "dark:bg-bl/30 dark:border-wh/12",
          "dark:hover:bg-bl/40 dark:hover:border-wh/18",
          "dark:active:bg-bl/50 dark:active:border-wh/25",
        ],
        ghost: ["bg-wh/15 hover:bg-wh/25", "dark:bg-bl/25 dark:hover:bg-bl/35"],
        reveal: [
          "bg-transparent",
          "hover:bg-wh/15 active:bg-wh/25",
          "dark:hover:bg-bl/25 dark:active:bg-bl/35",
        ],
        subtle: [
          "text-wh/65 hover:text-wh/90 bg-transparent",
          "active:bg-wh/20 dark:active:bg-bl/30",
        ],
        primary: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
      },
      size: {
        lg: "label-text-m h-10 px-4 [&_svg]:size-4",
        md: "label-text-s h-8 px-3 [&_svg]:size-3.5",
        sm: "label-text-xs h-6 px-2 [&_svg]:size-3",
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
    defaultVariants: {
      intent: "glass",
      size: "lg",
      shape: "default",
      composition: "iconText",
    },
  },
);

export type ButtonVariants = VariantProps<typeof button>;
