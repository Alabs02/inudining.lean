import React from "react";
import { motion } from "framer-motion";
import { UI } from "@/models";
import { cn } from "@/lib";
import Image from "next/image";
import {
  IconClockBolt,
  IconClockCancel,
  IconDoorOff,
  IconDropletStar,
  IconHeartShare,
  IconHeartSpark,
  IconMapPin,
  IconWorldWww,
  IconWritingSign,
} from "@tabler/icons-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import { whileTapOptions } from "@/constants";
import { Circle } from "rc-progress";

const LocationCard = React.forwardRef<HTMLDivElement, UI.LocationCardProps>(
  ({ className, fields, ...rest }, ref) => {
    const { picture, name, location, foodRating, serviceRating, websiteURL, Keywords } =
      fields;

    const openInNewTab = (url: string) => {
      if (!url) {
        console.error("No URL provided");
        return;
      }
      const newTab = window.open(url, "_blank");
      if (newTab) {
        newTab.focus();
      } else {
        console.error(
          "Unable to open a new tab. It may be blocked by the browser."
        );
      }
    };

    return (
      <>
        <motion.div ref={ref} {...rest} className={cn("w-full", className)}>
          <div className="w-full h-56 relative overflow-hidden rounded-xl shadow-[0px_0px_0px_1px] shadow-primary/10">
            <Image
              src={picture.src}
              alt={picture.alt}
              width={900}
              height={900}
              quality={100}
              priority
              draggable={false}
              className="size-full object-cover object-center rounded-xl"
            />

            <div className="absolute grid grid-cols-1 top-2 right-2 font-dm-sans text-sm bg-transparent shadow-none border-none">
              <div className="w-full h-full relative flex items-center">
                <div className="w-auto h-7 pl-1.5 pr-16 text-sm font-dm-sans translate-x-14 font-medium text-primary/90 flex items-center gap-x-1 bg-muted/75 shadow-inner p-1 backdrop-blur-sm backdrop-filter relative z-10 rounded-full overflow-hidden">
                  <IconHeartSpark
                    className="fill-accent stroke-accent-700/75"
                    size={18}
                  />
                  <span className="text-inherit">Inclusivity Score</span>
                </div>

                <div className="size-14 rounded-full bg-muted/65 shadow-inner p-1 backdrop-blur-sm backdrop-filter relative z-20">
                  <p className="absolute text-sm left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
                    4.5
                  </p>
                  <Circle
                    percent={50}
                    strokeWidth={15}
                    strokeColor="rgba(249,167,26, 1)"
                    trailColor="rgba(81,35,11,0.5)"
                  />
                </div>
              </div>
            </div>

            <div className="absolute bottom-2 left-2 font-dm-sans text-sm rounded-full px-2.5 py-1.5 bg-muted/85 shadow-inner backdrop-blur backdrop-filter">
              Rated {serviceRating}/5 for Service
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  type="button"
                  role="link"
                  aria-label="Visit Website"
                  onClick={() => openInNewTab(websiteURL)}
                  className="absolute bottom-2 right-2 size-8 flex items-center justify-center font-dm-sans text-sm rounded-full p-px bg-muted/85 hover:!bg-muted backdrop-blur hover:!backdrop-blur-0 backdrop-filter shadow-[0px_0px_0px_1px] shadow-primary/20 !scale-100 hover:!scale-110 active:!scale-95 will-change-transform transform-gpu transition-all duration-200 ease-in-out"
                >
                  <IconWorldWww aria-hidden={true} />
                </TooltipTrigger>
                <TooltipContent className="!bg-primary-900 !text-accent font-dm-sans relative overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-[0.515px] after:w-full after:h-px after:bg-gradient-to-r after:from-accent/0 after:via-accent after:to-accent/0">
                  <p className="text-inherit">Visit Website</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex flex-col gap-y-2 px-2 py-4">
            <div className="flex items-center justify-between">
              <h6 className="flex items-center font-dm-sans text-base x:text-[7px] 2xl:text-lg text-primary/90 font-medium capitalize whitespace-nowrap">
                <span className="mr-1">{name}</span>-
                <span className="ml-1">
                  <IconMapPin
                    aria-hidden={true}
                    className="stroke-accent-600 mr-0.5"
                    size={18}
                  />
                </span>
                {location}
              </h6>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex item-center font-dm-sans text-sm text-primary/90 gap-x-0.5">
                    <span>{foodRating}</span>
                    <IconDropletStar
                      className="fill-accent stroke-accent-700/75"
                      aria-hidden={true}
                      size={18}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="!bg-primary-900 !text-accent font-dm-sans relative overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-[0.515px] after:w-full after:h-px after:bg-gradient-to-r after:from-accent/0 after:via-accent after:to-accent/0">
                    <p className="text-inherit">
                      Rated {foodRating}/5 for Food
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-1 text-sm xl:text-base text-primary/90">
                <IconClockBolt className="stroke-accent-600" size={18} />

                <span className="text-inherit">18 - 28 mins</span>
              </div>

              <div className="flex items-center gap-x-1 text-sm xl:text-base text-destructive-600/90">
                <IconClockCancel className="stroke-destructive" size={18} />
                <span className="text-inherit">closed</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap w-full mb-4">
              {Keywords.map((keyword, index) => (
                  <div
                    key={`keyword-${index}`}
                    className="py-0.5 px-1.5 rounded-full text-xs uppercase tracking-wider font-dm-sans font-medium bg-muted-300"
                  >
                    {keyword}
                  </div>
                ))}
            </div>

            <div className="w-full">
              <motion.button
                {...whileTapOptions}
                type="button"
                aria-label={"Rate & Review"}
                className="flex items-center justify-center w-full gap-x-2 py-2.5 px-5 rounded-full uppercase text-cta font-medium tracking-wide shadow-[0px_0px_0px_1px] shadow-primary/10 hover:shadow-muted-200/25 bg-transparent hover:bg-muted-100 hover:text-primary-400 overflow-hidden transition-colors duration-200"
              >
                <IconWritingSign aria-hidden={true} size={22} />
                <span>Rate & Review</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </>
    );
  }
);

LocationCard.displayName = "LocationCard";
export { LocationCard };
