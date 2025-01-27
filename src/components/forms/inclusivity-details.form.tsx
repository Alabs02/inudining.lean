import { cn } from "@/lib";
import React from "react";
import { Label, Textarea } from "@/components/ui";
import debounce from "lodash/debounce";
import { ErrorMessage, Field } from "formik";
import { IconCheckbox } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { inclusivityOptions } from "@/constants/db";

const InclusivityDetails = (props: any) => {
  const { step, setFieldValue, setFieldTouched, values, errors, touched } =
    props;

  const getInclusivityLabels = (
    features: string[],
    options: typeof inclusivityOptions
  ) => {
    const matchingOptions = options.filter((option) =>
      features.includes(option.value)
    );

    return matchingOptions.map((option) => option.label).join(", ");
  };

  return (
    <AnimatePresence mode={"popLayout"}>
      {step === 5 || step === 6 ? (
        <motion.section
          initial={{ x: step === 5 || step === 6 ? "100%" : 0 }}
          animate={{ x: step === 5 || step === 6 ? 0 : "-100%" }}
          exit={{ x: "-100%" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className={cn(
            "grid grid-cols-1 gap-y-5 px-2.5 w-full transition-opacity will-change-auto transform-gpu",
            step === 5 || step === 6 ? "grid opacity-100" : "opacity-0 hidden"
          )}
        >
          <motion.div className="w-full px-5">
            <h6 className="font-dm-serif text-primary/85 text-lg">
              Celebrate Inclusivity
            </h6>

            <p className={cn("font-dm-sans text-sm", step === 6 && "hidden")}>
              Help us highlight what makes your restaurant welcoming and
              inclusive for all diners.
            </p>

            <div className="grid grid-cols-12 gap-5 w-full my-5">
              <div className="col-span-12 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="inclusivityDetails.features"
                  className="text-sm text-primary/90"
                >
                  What inclusivity features does your restaurant offer?
                </Label>

                <DropdownMenu>
                  <DropdownMenuTrigger className={cn("relative", step === 6 && "!pointer-events-none")} asChild>
                    <input
                      id={"inclusivityDetails.features"}
                      readOnly
                      defaultValue={getInclusivityLabels(
                        values.inclusivityDetails.features,
                        inclusivityOptions
                      )}
                      className={cn(
                        "w-full h-10 rounded-full px-3 font-dm-sans text-sm text-primary/80 text-left placeholder:inline-block placeholder:max-w-[90%] placeholder:text-ellipsis placeholder:text-sm placeholder:text-primary/90 placeholder:opacity-85 placeholder:whitespace-nowrap placeholder:truncate border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                        errors.inclusivityDetails?.features &&
                          touched.inclusivityDetails?.features &&
                          "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50",
                        step === 6 && "!pointer-events-none"
                      )}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[100%] bg-muted border-none shadow-[0_0_0_1px] shadow-primary/25 rounded-xl">
                    <motion.div className="w-full max-h-64 xl:max-h-72 overflow-y-auto flex flex-col pr-0.5">
                      <DropdownMenuLabel className="font-dm-serif tracking-wider">
                        Inclusivity Features
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {inclusivityOptions.map(({ id, value, label }) => (
                        <motion.button
                          key={`inclusivity-${id}`}
                          onClick={() => {
                            const currentFeatures =
                              values.inclusivityDetails.features || [];
                            const newFeatures = currentFeatures.includes(value)
                              ? currentFeatures.filter(
                                  (item: any) => item !== value
                                )
                              : [...currentFeatures, value];
                            setFieldValue(
                              "inclusivityDetails.features",
                              newFeatures
                            );
                          }}
                          className="flex items-center gap-x-2 text-[13.5px] text-primary/90 hover:bg-primary/15 rounded px-1.5 py-2 transition-all duration-300 will-change-auto"
                        >
                          <div className="size-6 grid grid-cols-1 place-items-center transition-all duration-300">
                            <IconCheckbox
                              className={cn(
                                "stroke-accent-600 transition-all duration-300 will-change-transform transform-gpu",
                                values.inclusivityDetails.features?.includes(
                                  value
                                )
                                  ? "inline-flex animate-in zoom-in-95"
                                  : "animate-out zoom-out-95 hidden"
                              )}
                              size={20}
                            />
                          </div>
                          <span className="text-left text-inherit">
                            {label}
                          </span>
                        </motion.button>
                      ))}
                    </motion.div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <ErrorMessage
                  name="inclusivityDetails.features"
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans transition-all duration-200 will-change-auto",
                    errors.inclusivityDetails?.features
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-12 flex flex-col items-start gap-y-0.5">
                <Label
                  htmlFor="inclusivityDetails.training"
                  className="text-sm text-primary/90"
                >
                  Has your staff received diversity and inclusion training?
                </Label>

                <Select
                  disabled={step === 6}
                  onValueChange={(value) => {
                    setFieldValue("inclusivityDetails.training", value);
                  }}
                  onOpenChange={() => {
                    debounce(() => {
                      setFieldTouched(
                        "inclusivityDetails.training",
                        true,
                        true
                      );
                    }, 1000)();
                  }}
                  defaultValue={values.inclusivityDetails.training}
                >
                  <SelectTrigger
                    className={cn(
                      "w-full h-10 rounded-full border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                      errors.inclusivityDetails?.training &&
                        touched.inclusivityDetails?.training &&
                        "!border-destructive/50 hover:border-destructive/50 focus:border-destructive/50",
                      step === 6 && "!pointer-events-none"
                    )}
                  >
                    <SelectValue
                      placeholder="Select an option"
                      className="font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-none ring-0 focus-visible:ring-0 focus:outline-none"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-muted border-none shadow-[0_0_0_1px] shadow-primary/25 rounded-xl max-h-56 overflow-y-auto flex flex-col">
                    <SelectGroup className="!px-0.5 w-full">
                      <SelectLabel className="font-dm-serif tracking-wider">
                        Staff Training
                      </SelectLabel>
                      <SelectItem
                        className="!text-primary/90 hover:!bg-primary/15 active:!bg-accent"
                        value="none"
                      >
                        No, our staff has not received training.
                      </SelectItem>
                      <SelectItem
                        className="!text-primary/90 hover:!bg-primary/15 active:!bg-accent"
                        value="basic"
                      >
                        Yes, our staff has completed basic training.
                      </SelectItem>
                      <SelectItem
                        className="!text-primary/90 hover:!bg-primary/15 active:!bg-accent"
                        value="advanced"
                      >
                        Yes, our staff has completed advanced training.
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <ErrorMessage
                  name={"inclusivityDetails.training"}
                  component={motion.div}
                  className={cn(
                    "text-destructive text-sm font-dm-sans !self-start !justify-self-start !place-self-start",
                    errors.inclusivityDetails?.training
                      ? "animate-in slide-in-from-top-2 zoom-in-95"
                      : "animate-out slide-out-to-top-2 zoom-out-95"
                  )}
                />
              </div>

              <div className="col-span-12 flex flex-col items-start gap-y-0.5 transition-all duration-300 will-change-auto">
                <Label
                  htmlFor="inclusivityDetails.communityInitiatives"
                  className="text-sm text-primary/90"
                >
                  Do you participate in any community initiatives? (Optional)
                </Label>

                <Field
                  rows={1}
                  as={Textarea}
                  minLength={20}
                  maxLength={200}
                  readOnly={step === 6}
                  id={"inclusivityDetails.communityInitiatives"}
                  name={"inclusivityDetails.communityInitiatives"}
                  className={cn(
                    "w-full rounded-full min-h-10 max-h-16 resize-none px-4 font-dm-sans text-cta text-primary/90 text-left placeholder:text-cta placeholder:text-primary/90 placeholder:opacity-85 border-2 border-transparent hover:border-accent-600/50 focus-within:border-accent-600/50 bg-accent-600/50 hover:bg-transparent focus-within:bg-transparent outline-none shadow-none ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 will-change-auto",
                    errors.inclusivityDetails?.communityInitiatives &&
                      touched.inclusivityDetails?.communityInitiatives &&
                      "border-destructive/50 hover:border-destructive/50 focus:border-destructive/50"
                  )}
                />

                <div
                  className={cn(
                    "flex flex-col-reverse gap-0.25 lg:!flex-row justify-start lg:justify-end w-full",
                    errors.inclusivityDetails?.communityInitiatives &&
                      touched.inclusivityDetails?.communityInitiatives &&
                      "lg:!justify-between"
                  )}
                >
                  <ErrorMessage
                    name={"inclusivityDetails.communityInitiatives"}
                    component={motion.div}
                    className={cn(
                      "text-destructive text-sm font-dm-sans !self-start !justify-self-start !place-self-start",
                      errors.inclusivityDetails?.communityInitiatives
                        ? "animate-in slide-in-from-top-2 zoom-in-95"
                        : "animate-out slide-out-to-top-2 zoom-out-95"
                    )}
                  />

                  <small className="text-xs text-primary/90 place-self-end self-end mt-0.5">
                    Max 200 Characters.
                  </small>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
};

InclusivityDetails.displayName = "InclusivityDetails";
export { InclusivityDetails };
