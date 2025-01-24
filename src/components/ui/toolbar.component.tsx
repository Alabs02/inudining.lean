"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AnimatedLink } from "./animated-link.component";
import { Input } from "./input.component";
import { IconMapPinPlus, IconMapSearch } from "@tabler/icons-react";

import Link from "next/link";
import Image from "next/image";

// CONSTANTS
import { ImgPaths, whileTapOptions } from "@/constants";
import debounce from "lodash/debounce";
import { cn } from "@/lib";
import { useRouter } from "next/router";

const Toolbar = () => {
  const router = useRouter();
  const { query } = router;
  
  const [searchQuery, setSearchQuery] = useState(query.query || "");

  const updateQuery = debounce((value) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...query,
          query: value || undefined,
        },
      },
      undefined,
      { shallow: true }
    );
  }, 500);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateQuery(value);
  }

  useEffect(() => {
    if (query.query !== searchQuery) {
      setSearchQuery(query.query || "");
    }
  }, [query.query]);

  return (
    <motion.nav className="w-full h-[92px] px-5 xl:px-0 py-5 grid place-items-center transition-all duration-300 will-change-auto sticky top-0 bg-muted/65 backdrop-blur-lg backdrop-filter">
      <div className="flex items-center justify-between w-full xl:w-[90%] 2xl:w-[70%] h-full overflow-hidden transition-all duration-300 will-change-auto px-0.5">
        <div className="flex items-center gap-x-2 flex-1">
          <Link
            href={"/"}
            aria-label={"Home"}
            className="h-full w-16 relative overflow-hidden"
            passHref
          >
            <Image
              src={ImgPaths.BRAND_LOGO}
              alt={"Inu Dining"}
              width={65}
              height={65}
              quality={100}
              priority
              draggable={false}
              className="size-full object-contain"
            />
          </Link>

          <div className="group/search w-full xl:w-[70%] h-12 relative rounded-full bg-accent-600/50 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 hover:bg-transparent focus-within:bg-transparent transition-all duration-300">
            <Input
              type="text"
              value={searchQuery}
              onChange={onSearch}
              placeholder="Search by cuisine, location, or name..."
              className={cn("w-full h-full rounded-full font-dm-sans px-4 pr-12 border-none shadow-none focus:border-none focus:shadow-none ring-0 focus-visible:ring-0 outline-none focus:outline-none text-cta placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85")}
            />

            <button type="button" role="search" aria-roledescription="Search for restaurants" className="size-9 p-px border-none outline-none grid place-items-center text-accent-50 rounded-full bg-primary/90 group-focus-within/search:bg-accent-600 group-hover/search:bg-accent-600 absolute top-1/2 -translate-y-1/2 right-1 transition-all duration-300 will-change-auto">
              <IconMapSearch className="stroke-muted group-focus-within/search:stroke-muted-100 group-hover/search:stroke-muted-100" size={22} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-x-5">
          <AnimatedLink label="Discover" href="/"></AnimatedLink>
          <AnimatedLink
            label="Community Stories"
            href="/community-stories"
          ></AnimatedLink>
          <motion.button
            {...whileTapOptions}
            type="button"
            aria-label="List Your Restaurant"
            role="button"
            className="border flex items-center gap-x-2 font-medium font-dm-sans uppercase py-2.5 px-5 rounded-full text-cta border-none outline-none focus:outline-none shadow-[0px_0px_0px_1px] shadow-primary/25 hover:shadow-muted-200/25 bg-transparent hover:bg-muted-100 hover:text-primary-400 transition-colors duration-200"
          >
            <IconMapPinPlus size={20} />
            <span>List Your Restaurant</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

Toolbar.displayName = "Toolbar";
export { Toolbar };
