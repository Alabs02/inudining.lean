"use client";

import React from "react";
import { motion } from "framer-motion";
import { whileTapOptions } from "@/constants";
import { UI } from "@/models";
import { cn } from "@/lib";

const FilterChip: React.FC<UI.FilterChipProps> = React.forwardRef<
  HTMLButtonElement,
  UI.FilterChipProps
>(({ label, className, onClick, ...rest }, ref) => {
  return (
    <motion.button
      ref={ref}
      {...rest}
      {...whileTapOptions}
      role="button"
      aria-label={label}
      onClick={onClick}
      aria-roledescription="Location Query Button"
      className={cn(
        "border border-accent-600 py-2 px-4 rounded-full font-dm-sans font-normal uppercase tracking-wide text-sm text-accent-600 hover:text-accent-50 bg-transparent hover:bg-accent-600 transition-colors duration-300 will-change-auto",
        className
      )}
    >
      <span className="text-inherit transition-all duration-0">{label}</span>
    </motion.button>
  );
});

FilterChip.displayName = "FilterChip";
export { FilterChip };
