import React from "react";
import { motion } from "framer-motion";
import { Separator } from "./separator.component";

const ReviewPanel: React.FC<{ isLast: boolean }> = (props) => {
  const { isLast } = props;

  return (
    <>
      <motion.div className="flex flex-col gap-y-2.5 w-full">
        <div className="flex w-full justify-between">
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col">
              <h6 className="text-base xl:text-[17px] font-semibold">
                Vania Ray
              </h6>
              <p className="text-sm text-primary/85">3 days ago</p>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-sm xl:text-base text-right">Excellent (4.5)</p>

            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={star <= 4.5 ? "currentColor" : "none"}
                  stroke="currentColor"
                  className={`w-5 h-5 ${
                    star <= 4.5
                      ? "stroke-transparent fill-accent/90"
                      : "stroke-transparent fill-muted-50"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.286 7.03a1 1 0 00.95.69h7.392c.969 0 1.371 1.24.588 1.81l-5.973 4.34a1 1 0 00-.364 1.118l2.286 7.03c.3.921-.755 1.688-1.54 1.118l-5.973-4.34a1 1 0 00-1.176 0l-5.973 4.34c-.784.57-1.838-.197-1.54-1.118l2.286-7.03a1 1 0 00-.364-1.118L2.12 12.457c-.783-.57-.38-1.81.588-1.81h7.392a1 1 0 00.95-.69l2.286-7.03z"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>

        <p className="flex text-cta font-dm-sans font-normal text-pretty">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia doloribus hic voluptate voluptatem quos aperiam asperiores cum saepe aliquam. Omnis iste dolor alias perspiciatis tempore aspernatur quasi laboriosam distinctio eius.
        </p>
      </motion.div>

      {!isLast && (<Separator className="bg-primary/25" />)}
    </>
  );
};

ReviewPanel.displayName = "ReviewPanel";
export { ReviewPanel };
