"use client";

import React from "react";
import Link from "next/link";
import { UI } from "@/models";
import { motion } from "framer-motion";
import { cn } from "@/lib";
import { usePathname } from "next/navigation";

const MotionLink = motion(Link);

const AnimatedLink: React.FC<UI.AnimatedLinkProps> = ({
  label,
  href,
  prefix,
  suffix,
  className,
}) => {
  const pathname = usePathname();

  return (
    <MotionLink
      passHref
      href={href}
      aria-label={label}
      data-label={label}
      className={cn("group/animated-link relative inline-flex items-center justify-center text-primary/90 text-pretty text-cta leading-6 font-medium font-dm-serif uppercase tracking-wide no-underline overflow-hidden before:content-[attr(data-label)] before:absolute before:!text-accent-600 before:font-dm-sans before:text-cta before:leading-6 before:uppercase before:tracking-wide before:font-medium before:top-0 before:left-0 before:translate-y-[140%] hover:before:translate-y-0 transform-gpu", pathname === href && "!text-accent-600", className)}
    >
      {prefix}
      <span className="text-inherit block group-hover/animated-link:-translate-y-[140%] transform-gpu">{label}</span>
      {suffix}
    </MotionLink>
  );
};

AnimatedLink.displayName = "AnimatedLink";
export { AnimatedLink };
